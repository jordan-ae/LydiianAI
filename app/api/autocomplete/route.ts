// import { streamText } from 'ai'
// import { openai } from '@ai-sdk/openai'

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const model = openai('gpt-4')

//   const result = await streamText({
//     model,
//     messages: [{
//       role: 'system',
//       content: 'You are an AI writing assistant. Complete the text provided by the user in a coherent and meaningful way.'
//     }, ...messages],
//     temperature: 0.5,
//     maxTokens: 50
//   })

//   return result.toDataStreamResponse()
// }

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { text }: { text: string } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [{
      role: 'system',
      content: 'You are an AI writing assistant. Complete the text provided by the user in a coherent and meaningful way.'
    }, {
      role: 'user',
      content: text
    }],
    temperature: 0.5,
    maxTokens: 50
  });

  return result.toDataStreamResponse();
}