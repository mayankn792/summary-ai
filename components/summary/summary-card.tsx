import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import { FileText } from "lucide-react";

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="flex justify-between px-5">
          <div className="flex-2 flex items-center gap-2">
            <FileText className="w-8 h-8 text-rose-700"></FileText>
            <div>
              <h3 className="text-base font-semibold truncate w-3/4">
                {summary.title}
              </h3>
              <p className="text-sm text-gray-900">
                {`created on ` +
                  new Date(summary.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex-0">
            <DeleteButton summaryId={summary.id}></DeleteButton>
          </div>
        </div>

        <Link href={`summaries/${summary.id}`} className="block px-4 sm:px-6">
          <p className="text-gray-500 line-clamp-2 my-1">
            {summary.summary_text}
          </p>
        </Link>
      </Card>
    </div>
  );
}
