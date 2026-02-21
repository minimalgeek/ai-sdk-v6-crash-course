import { google } from '@ai-sdk/google';
import {
  createUIMessageStreamResponse,
  convertToModelMessages,
  streamText,
  type ModelMessage,
  type UIMessage,
  createUIMessageStream,
} from 'ai';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] =
    await convertToModelMessages(messages);

  const streamTextResult = streamText({
    model: google('gemini-2.5-flash'),
    messages: modelMessages,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
