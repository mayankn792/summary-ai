import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className=""></div>
      <div className="flex flex-col items-center justify-center">
        <Pizza className="w-8 h-8 text-rose-800" />
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-center mt-4">
            Watch how Summary AI transforms a PDF into a concise summary
          </h3>
        </div>

        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6">
          {/* Replace with your video or demo content */}
        </div>
      </div>
    </section>
  );
}
