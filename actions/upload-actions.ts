"use server";

import { getDbConnection } from "@/lib/db";
import { generatePdfSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePdfSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summaryText: string;
  title: string;
  fileName: string;
}
export async function generatePdfSummary({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "No upload response provided",
      data: null,
    };
  }

  if (!fileUrl) {
    return {
      success: false,
      message: "Invalid upload response format",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
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
    const formattedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "Summary generated successfully",
      data: { summary, title: formattedFileName },
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

async function savePdfSummary({
  userId,
  fileUrl,
  summaryText,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    const [result] =
      await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summaryText}, ${title}, ${fileName}) RETURNING id, summary_text`;

    return result;
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw new Error("Failed to save PDF summary");
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summaryText,
  title,
  fileName,
}: PdfSummaryType) {
  let savedPdfSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
        data: null,
      };
    }

    savedPdfSummary = await savePdfSummary({
      userId,
      fileUrl,
      summaryText,
      title,
      fileName,
    });

    if (!savedPdfSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error storing PDF summary:", error);
    return {
      success: false,
      message: "Failed to store PDF summary",
      data: null,
    };
  }

  revalidatePath(`/summaries/${savedPdfSummary.id}`);

  return {
    success: true,
    message: "PDF summary stored successfully",
    data: {
      id: savedPdfSummary.id,
    },
  };
}
