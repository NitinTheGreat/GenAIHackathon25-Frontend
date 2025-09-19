import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_50%)]" />

      {/* SignUp box with dark mode */}
      <div className="relative z-10 p-6 rounded-2xl shadow-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 max-w-md w-full">
        <SignUp
          appearance={{
            baseTheme: "dark",
            elements: {
              card: "bg-slate-900 text-white shadow-lg",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-300",
              socialButtonsBlockButton: "bg-slate-800 hover:bg-slate-700 text-white",
              formButtonPrimary: "bg-slate-700 hover:bg-slate-600 text-white",
              footerActionText: "text-slate-400",
              footerActionLink: "text-indigo-400 hover:text-indigo-300",
            },
          }}
        />
      </div>
    </div>
  );
}
