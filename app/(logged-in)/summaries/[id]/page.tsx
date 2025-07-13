import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);
  if (!summary) {
    console.info("not found");
    notFound();
  }

  const { title, summary_text } = summary;

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto flex flex-col">
        <div className="px-4 sm:px-6 lg:py-24">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl text-gray-600">{title}</h1>
          </div>
          <br></br>
          <div className="shadow shadow-accent-foreground bg-gradient-to-r from-[#fdbb2d] to-[#22c1c3] text-white mx-15 p-10 rounded">
            <p className="text-2xl">{summary_text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
