import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(pdfUrl: string) {
  const response = await fetch(pdfUrl);
  const arrayBuffer = await response.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();

  return docs.map((doc) => doc.pageContent).join("\n");
}
