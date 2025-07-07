"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const schema = z.object({
  file: z
    .instanceof(File, {
      message: "Invalid File",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5 MB limit
      message: "File size must be less than 5 MB",
    }),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    console.log("File selected:", file);
    const result = schema.safeParse({ file });
    if (!result.success) {
      console.error("Validation errors:", result.error.format());
      toast.error("Upload failed");
      return;
    }

    console.log("File is valid:", result.data);
    toast.info("Starting upload...");
    const response = await startUpload([file]);

    if (!response) {
      console.error("Upload failed");
      return;
    }

    toast.success("Upload successful!");
  };

  return (
    <form
      className="relative flex flex-col items-center justify-center w-full max-w-2xl p-6 mx-auto border border-gray-300 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        id="file"
        name="file"
        accept="application/pdf"
        className="mb-4"
        required
      />
      <button
        type="submit"
        className="text-white text-base px-5 py-2 rounded-full bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline shadow-lg transition-all duration-300"
      >
        Upload
      </button>
      <Toaster></Toaster>
    </form>
  );
}
