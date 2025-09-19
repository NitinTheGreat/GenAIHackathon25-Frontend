import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Law App",
  description: "legal AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const afterSignInUrl = process.env.NEXT_PUBLIC_APP_AFTER_SIGN_IN_URL || "/dashboard";
  const afterSignUpUrl = process.env.NEXT_PUBLIC_APP_AFTER_SIGN_UP_URL || "/dashboard";
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark, // fallback
        signIn: { baseTheme: dark },
        signUp: { baseTheme: dark },
      }}
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl={afterSignInUrl}
      afterSignUpUrl={afterSignUpUrl}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Global graphite background + faint grid overlay */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="graphite-premium-bg" />
            <div aria-hidden className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="global-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.04)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#global-grid)" />
              </svg>
            </div>
          </div>
          <Navbar />
          <div className="relative z-10">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
