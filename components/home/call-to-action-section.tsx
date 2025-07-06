export default function CallToActionSection() {
  return (
    <section className="relative bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Experience the power of Summary AI today. Transform your documents
            into concise summaries effortlessly.
          </p>
          <a
            href="/get-started"
            className="inline-block px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors duration-300 animate-pulse hover:animate-none"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
}
