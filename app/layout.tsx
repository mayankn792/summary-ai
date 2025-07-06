import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import BgGradient from "@/components/common/bg-gradient";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Summary AI",
  description: "An application that provides AI-powered summaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //https://innate-noodle-e82.notion.site/AI-SaaS-app-Sommaire-Cheatsheet-188b184c73a880ada002db700139e4b1
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${fontSans.variable} antialiased`}>
          <div className="flex min-h-screen flex-col">
            <BgGradient />
            <Header />
            <main className="flex-1"> {children} </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
