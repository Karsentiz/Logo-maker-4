import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    huggingface_key_present: !!process.env.HUGGINGFACE_API_KEY,
    key_length: process.env.HUGGINGFACE_API_KEY?.length || 0,
  })
} 