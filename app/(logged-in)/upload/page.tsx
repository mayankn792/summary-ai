import UploadForm from "@/components/common/upload/upload-form";
import UploadHeader from "@/components/common/upload/upload-header";
import { Upload } from "lucide-react";

export default function UploadPage() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in  lg:px-12 max-w-7xl">
      <UploadHeader />
      <UploadForm />
    </section>
  );
}
