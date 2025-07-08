"use server";

import { generatePdfSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePdfSummaryFromOpenAI } from "@/lib/openai";
import { ca } from "zod/v4/locales";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "No upload response provided",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "Invalid upload response format",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Extracted PDF text:", pdfText);

    let summary;
    try {
      summary = await generatePdfSummaryFromOpenAI(pdfText);
      console.log("Generated summary:", { summary });
    } catch (error) {
      if (error instanceof Error) {
        try {
          summary = await generatePdfSummaryFromGemini(pdfText);
        } catch (gemError) {
          throw new Error("Error generating summary with available models");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary from OpenAI",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary },
    };
  } catch (error) {
    console.error("Error generating PDF summary:", error);
    return {
      success: false,
      message: "Failed to generate PDF summary",
      data: null,
    };
  }
}
