// Requires a GOOGLE_GENERATIVE_AI_API_KEY environment variable in .env
import { google } from '@ai-sdk/google';

const model = google('gemini-2.5-flash-lite');

console.dir(model, { depth: null });
