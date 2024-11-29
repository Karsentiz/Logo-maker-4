import { NextResponse } from 'next/server'

const MAX_RETRIES = 5
const RETRY_DELAY = 2000 // 2 seconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function formatPrompt(companyName: string, description: string): string {
  const cleanName = companyName.trim()
  const cleanDesc = description.trim()
    .replace(/dalle-mix,?/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const prompt = `${cleanName} logo: ${cleanDesc}, dalle-mix`
  console.log('Generated prompt:', prompt)
  return prompt
}

export async function POST(request: Request) {
  console.log('API Route - Starting request processing')
  try {
    // Log request details
    console.log('Request URL:', request.url)
    console.log('Request method:', request.method)
    console.log('Request headers:', Object.fromEntries(request.headers.entries()))

    // Validate request body
    let body
    try {
      const rawBody = await request.text()
      console.log('Raw request body:', rawBody)
      body = JSON.parse(rawBody)
      console.log('Parsed request body:', body)
    } catch (e) {
      console.error('Failed to parse request body:', e)
      console.error('Parse error details:', {
        name: e.name,
        message: e.message,
        stack: e.stack
      })
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request body' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'X-Error-Details': 'Failed to parse request body'
          }
        }
      )
    }

    const { companyName, description } = body
    
    if (!companyName || !description) {
      console.error('Missing required fields:', { companyName, description })
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'X-Error-Details': 'Missing companyName or description'
          }
        }
      )
    }

    console.log('Request data:', { companyName, description })
    console.log('Environment variables:', {
      hasApiKey: !!process.env.HUGGINGFACE_API_KEY,
      keyLength: process.env.HUGGINGFACE_API_KEY?.length
    })

    const prompt = formatPrompt(companyName, description)

    let retries = 0
    while (retries < MAX_RETRIES) {
      try {
        console.log(`Attempt ${retries + 1} - Starting API request`)
        
        const apiUrl = "https://api-inference.huggingface.co/models/prithivMLmods/Flux-Dalle-Mix-LoRA"
        console.log('API URL:', apiUrl)

        const requestHeaders = {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "image/*, application/json",
        }
        console.log('Request headers:', requestHeaders)

        const requestBody = JSON.stringify({ inputs: prompt })
        console.log('Request body:', requestBody)

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: requestHeaders,
          body: requestBody,
        })

        console.log('Response received:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        })

        const contentType = response.headers.get("content-type") || ''
        console.log('Response content type:', contentType)

        // Handle non-200 responses
        if (!response.ok) {
          const text = await response.text()
          console.log('Error response text:', text)
          console.log('Error response length:', text.length)
          console.log('First 500 characters:', text.substring(0, 500))

          // Check if response is HTML
          if (text.trim().startsWith('<!DOCTYPE')) {
            console.error('Received HTML response:', {
              length: text.length,
              preview: text.substring(0, 200),
              contentType
            })
            throw new Error('Invalid API response format (received HTML)')
          }

          let errorMessage
          try {
            const errorData = JSON.parse(text)
            errorMessage = errorData.error || text
            console.log('Parsed error data:', errorData)
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError)
            errorMessage = text
          }

          if (response.status === 503) {
            console.log(`Model loading, attempt ${retries + 1} of ${MAX_RETRIES}`)
            if (retries < MAX_RETRIES - 1) {
              await sleep(RETRY_DELAY)
              retries++
              continue
            }
          }

          throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorMessage}`)
        }

        // Handle successful response
        if (!contentType.includes('image')) {
          console.error('Unexpected content type:', {
            received: contentType,
            expected: 'image/*'
          })
          throw new Error('Received non-image response from API')
        }

        const buffer = Buffer.from(await response.arrayBuffer())
        console.log('Received image buffer:', {
          byteLength: buffer.length,
          isBuffer: Buffer.isBuffer(buffer)
        })

        if (buffer.length === 0) {
          throw new Error('Received empty image data')
        }

        const base64 = buffer.toString('base64')
        const dataUrl = `data:${contentType};base64,${base64}`
        console.log('Successfully created data URL:', {
          length: dataUrl.length,
          preview: dataUrl.substring(0, 50) + '...'
        })

        return new NextResponse(
          JSON.stringify({ logoUrl: dataUrl }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'X-Response-Type': 'success',
              'X-Image-Size': buffer.length.toString()
            },
          }
        )

      } catch (error) {
        console.error(`Attempt ${retries + 1} failed:`, {
          error: error.message,
          stack: error.stack,
          type: error.name
        })
        if (retries === MAX_RETRIES - 1) {
          throw error
        }
        await sleep(RETRY_DELAY)
        retries++
      }
    }

    throw new Error('Maximum retries reached')
  } catch (error) {
    console.error('Final error:', {
      message: error.message,
      stack: error.stack,
      type: error.name
    })
    
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to generate logo',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Error-Type': error.name || 'Unknown',
          'X-Error-Details': error.message || 'Unknown error'
        },
      }
    )
  }
} 