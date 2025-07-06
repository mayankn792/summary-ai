import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex h-screen items-center justify-center">
      <SignUp />
    </section>
  );
}
