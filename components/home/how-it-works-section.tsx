import { BrainCircuit, FileOutput, Pizza, Upload } from "lucide-react";
type Step = {
  icon: React.ReactNode; // Icon component, e.g., from Lucide or FontAwesome
  label: string;
  description: string;
};

export default function HowItWorksSection() {
  const steps: Step[] = [
    {
      icon: <Upload></Upload>,
      label: "Upload PDF",
      description: "Easily upload your PDF documents to our platform.",
    },
    {
      icon: <BrainCircuit></BrainCircuit>,
      label: "Analyze Content",
      description:
        "Our AI analyzes the content of your PDF to extract key information.",
    },
    {
      icon: <FileOutput></FileOutput>,
      label: "Get Summary",
      description:
        "Receive a concise summary of your PDF, highlighting the most important points.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-16">
          <h2 className="uppercase font-bold text-2xl">How it Works</h2>
          <h3 className="text-3xl">Transforming PDFs into Summaries</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <StepIcon key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepIcon({ icon, label, description }: Step) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl text-rose-600 mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{label}</h4>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}
