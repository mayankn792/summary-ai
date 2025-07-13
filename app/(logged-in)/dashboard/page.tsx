import SummaryCard from "@/components/summary/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const uploadLimit = 5;
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <div className="container flex flex-col mx-auto gap-4">
        <div className="px-2 py-12">
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-800 text-transparent bg-clip-text">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Here you can find all your saved summaries.
              </p>
            </div>

            <Button variant={"link"}>
              <Link
                href="/upload"
                className="flex items-center gap-2 text-white group hover:no-underline"
              >
                <Plus className="w-4 h-4" />
                Upload
              </Link>
            </Button>
          </div>
          <div className="mb-8 mt-8">
            {/* <div className="bg-rose-50 text-rose-800 border p-4 rounded-md">
              <p>You have reached the limit of 5 upload on the basic plan</p>
            </div> */}
            <br></br>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
