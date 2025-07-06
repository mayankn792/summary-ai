import Link from "next/link";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "$10/month",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    paymentLink: "https://example.com/payment-link-basic",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "$20/month",
    features: ["Feature A", "Feature B", "Feature C"],
    paymentLink: "https://example.com/payment-link-pro",
  },
];

type PriceType = {
  id: string;
  name: string;
  price: string;
  description?: string;
  features: string[];
  paymentLink?: string;
};

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-16">
          <h2 className="uppercase font-bold text-2xl">Pricing</h2>
          <h3 className="text-3xl">Choose the plan that suits you best</h3>
        </div>
        <div className="relative flex justify-center items-center gap-4 mt-8 lg:flow-row lg:items-stretch">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PricingCard = ({
  id,
  name,
  price,
  description,
  features,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-rose-400 border-1 hover:scale-101 hover:transition-all duration-500">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold">{price}</p>
      </div>
      <ul className="mb-4">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">
            {feature}
          </li>
        ))}
      </ul>
      {paymentLink && (
        <Link
          href={paymentLink}
          className="inline-block px-2 py-2 bg-gradient-to-r from-rose-700 to-rose-500 text-white rounded-full hover:from-rose-500 hover:to-rose-700 transition-colors duration-800"
        >
          Subscribe
        </Link>
      )}
    </div>
  );
};
