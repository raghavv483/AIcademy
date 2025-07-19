import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


 export const GenerateCourseLayout = await getGroqChatCompletion();
  // Print the completion returned by the LLM.


export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" }
  })}
