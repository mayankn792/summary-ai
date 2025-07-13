import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in  lg:px-12 max-w-7xl">
      <div className="">
        <div className="relative p-[1px] overflow-hidden flex rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-center text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">Welcome to Summary AI</h1>
      <h2 className="text-center text-lg sm:text-xl lg:text-2xl px-4 lg:px-0 lg:max-w-2xl text-gray-600">
        Your AI-powered solution for summarizing content effortlessly.
      </h2>
      <Button
        variant={"link"}
        className="text-white text-base px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 rounded-full bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline shadow-lg transition-all duration-300"
      >
        <Link href="/sign-in" className="flex gap-2 items-center">
          <span>Try it Now</span>
          <ArrowRight className="animate-pulse"></ArrowRight>
        </Link>
      </Button>
    </section>
  );
}
