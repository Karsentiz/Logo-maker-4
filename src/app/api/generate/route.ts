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
  try {
    // Validate request body
    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error('Invalid request body:', e)
      return new NextResponse(
        JSON.stringify({ error: 'Invalid request body' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const { companyName, description } = body
    
    if (!companyName || !description) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Request data:', { companyName, description })
    console.log('API Key status:', process.env.HUGGINGFACE_API_KEY ? 'Present' : 'Missing')

    const prompt = formatPrompt(companyName, description)

    let retries = 0
    while (retries < MAX_RETRIES) {
      try {
        console.log(`Attempt ${retries + 1} - Sending request to Hugging Face API...`)
        
        const apiUrl = "https://api-inference.huggingface.co/models/prithivMLmods/Flux-Dalle-Mix-LoRA"
        console.log('API URL:', apiUrl)

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "image/*, application/json",
          },
          body: JSON.stringify({
            inputs: prompt
          }),
        })

        const contentType = response.headers.get("content-type") || ''
        console.log('Response details:', {
          status: response.status,
          statusText: response.statusText,
          contentType,
          headers: Object.fromEntries(response.headers.entries())
        })

        // Handle non-200 responses
        if (!response.ok) {
          const text = await response.text()
          console.log('Error response text:', text)
          console.log('Response headers:', response.headers)

          // Check if response is HTML
          if (text.trim().startsWith('<!DOCTYPE')) {
            console.error('Received HTML response instead of JSON/image')
            throw new Error('Invalid API response format')
          }

          let errorMessage
          try {
            const errorData = JSON.parse(text)
            errorMessage = errorData.error || text
          } catch {
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
          console.error('Unexpected content type:', contentType)
          throw new Error('Received non-image response from API')
        }

        const buffer = Buffer.from(await response.arrayBuffer())
        if (buffer.length === 0) {
          throw new Error('Received empty image data')
        }

        const base64 = buffer.toString('base64')
        const dataUrl = `data:${contentType};base64,${base64}`

        return new NextResponse(
          JSON.stringify({ logoUrl: dataUrl }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

      } catch (error) {
        console.error(`Attempt ${retries + 1} failed:`, error)
        if (retries === MAX_RETRIES - 1) {
          throw error
        }
        await sleep(RETRY_DELAY)
        retries++
      }
    }

    throw new Error('Maximum retries reached')
  } catch (error) {
    console.error('Error generating logo:', error)
    
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to generate logo'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
} 