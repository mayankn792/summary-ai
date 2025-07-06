import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <nav className="container flex justify-between items-center py-4 px-2 lg:px-4 mx-auto">
        <div className="">
          <NavLink
            href="/"
            className="flex items-center gap-1 lg:gap-2 shrink-0"
          >
            <FileText className="w-4 h-4 lg:w-8 lg:h-8 text-gray-800 hover:rotate-12 transform transition duration-300 ease-in-out"></FileText>
            <span className="font-extrabold lg:text-xl text-gray-800">
              Summary
            </span>
          </NavLink>
        </div>

        <div className="flex gap-4 lg:justify-center lg:items-center">
          <NavLink href="/#pricing">Pricing</NavLink>
          <SignedIn>
            <NavLink href="/#dashboard">Dashboard</NavLink>
          </SignedIn>
        </div>

        <div className="flex lg:justify-center lg:items-center">
          <SignedIn>
            <div className="flex gap-2 items-center">
              <NavLink href="/upload">Upload a PDF</NavLink>
              <div>Pro</div>
              <SignedIn>
                <UserButton></UserButton>
              </SignedIn>
            </div>
          </SignedIn>
          <SignedOut>
            <NavLink href="/sign-in">Sign In</NavLink>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
