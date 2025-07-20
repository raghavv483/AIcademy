import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

// Example usage (remove or update as needed):
// export const GenerateCourseLayout = await getGroqChatCompletion("Your prompt here");
// Print the completion returned by the LLM.

export async function getGroqChatCompletion(prompt: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.3
    });
}
export async function GenerateChapterContent_AI(prompt: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.3
    });
}
