// Import the GoogleGenerativeAI class from the SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generatePdfSummaryFromGemini(pdfText: string) {
  if (!pdfText) {
    return {
      success: false,
      message: "No PDF text provided",
      data: null,
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
    });

    // const prompt = {
    //     contents: [
    //         {
    //             role: 'system',
    //             text: `You are a helpful assistant that summarizes documents. Your task is to provide a concise summary of the provided text, focusing on the main points and key details while avoiding unnecessary information.`
    //         },
    //         {
    //             role: 'user',
    //             text: `Please summarize the following text in a concise manner. Focus on the main points and key details, and avoid unnecessary information.
    // Transform the following document into a summary:\n\n${pdfText}`
    //         }
    //     ]
    // };
    // Generate content using the model
    const result =
      await model.generateContent(`Please summarize the following text in a concise manner. Focus on the main points and key details, and avoid unnecessary information.
    // Transform the following document into a summary:\n\n${pdfText}`);
    const response = await result.response;
    if (!response || !response.text) {
      throw new Error("No response text found in Gemini SDK response");
    }

    const summary = response.text();

    console.log(summary);
    return summary;
  } catch (error) {
    console.error("Error generating summary from Gemini SDK:", error);
    throw new Error(`Error generating summary: ${error || "Unknown error"}`);
  }
}
