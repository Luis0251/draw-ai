import { NextResponse } from 'next/server'
import { generateResponse } from '@/app/actions/ai/instructions'

export async function POST(req: Request) {
  const data = await req.json()
  const result = await generateResponse(data)
  return NextResponse.json(result)
}