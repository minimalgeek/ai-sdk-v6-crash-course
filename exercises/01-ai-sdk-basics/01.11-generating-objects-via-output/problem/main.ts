import { google } from '@ai-sdk/google';
import { Output, streamText } from 'ai';
import z from 'zod';

const model = google('gemini-2.5-flash');

const stream = streamText({
  model,
  prompt:
    'Give me the first paragraph of a story about an imaginary planet.',
  output: Output.object({
    schema: z.object({
      facts: z
        .array(z.string())
        .describe(
          'The facts about the imaginary planet. Write as if you are a scientist.',
        ),
    }),
    description:
      'The facts about the imaginary planet. Write as if you are a scientist.',
  }),
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}


const factsResult = stream.output;

// TODO: Log the output of the result
console.log(await factsResult);
