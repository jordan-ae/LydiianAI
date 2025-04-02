import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = openai('o3-mini')

  const result = streamText({
    model,
    messages,
  })

  return result.toDataStreamResponse()
}
