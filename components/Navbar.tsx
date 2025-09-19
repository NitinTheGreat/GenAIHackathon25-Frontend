"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="mx-auto mt-3 mb-2 w-[min(96%,1200px)]">
      <div className="graphite-card rounded-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/25 to-white/10 flex items-center justify-center text-white font-bold">
            N
          </div>
          <span className="hidden sm:inline text-sm sm:text-base font-semibold">Law App</span>
        </Link>

        {/* Right side: Login link or Avatar */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-white/20 hover:border-white/30 bg-white/10 hover:bg-white/15 text-white text-sm font-medium px-4 py-2"
            >
              Log in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
