import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePdfSummaryFromOpenAI(pdfText: string) {
  if (!pdfText) {
    return {
      success: false,
      message: "No PDF text provided",
      data: null,
    };
  }
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "Please summarize the following text in a concise manner. Focus on the main points and key details, and avoid unnecessary information.",
        },
        {
          role: "user",
          content:
            "Transform the following document into a summary:\n\n" + pdfText,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    const summary = response.choices[0]?.message?.content;
    console.log(summary);
    return summary;
  } catch (error: any) {
    console.error("Error generating summary:", error);
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    throw error;
  }
}
