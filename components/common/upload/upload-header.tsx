import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div>
      <div className="relative mx-auto flex flex-col z-0 items-center justify-center transition-all animate-in">
        <div className="relative p-[1px] overflow-hidden flex rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-center text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">
              AI powered content summarization
            </p>
          </Badge>
        </div>
      </div>
      <div>
        <h2 className="font-bold py-6 text-center">Start Uploading Your PDF</h2>
        <h3 className="text-center text-lg sm:text-xl lg:text-2xl px-4 lg:px-0 lg:max-w-2xl text-gray-600">
          Upload your PDF files to get concise summaries and insights with
          Summary AI.
        </h3>
      </div>
    </div>
  );
}
