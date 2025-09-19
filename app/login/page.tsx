import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle premium accents (match signup) */}
      <div className="absolute -left-24 top-12 w-80 h-80 rounded-xl rotate-12 bg-gradient-to-tr from-white/5 to-white/0 opacity-30 blur-3xl" />
      <div className="absolute right-0 bottom-0 w-[28rem] h-[28rem] rounded-lg -rotate-6 bg-gradient-to-bl from-white/6 to-white/0 opacity-20 blur-2xl" />

      {/* Content: text left (hidden on phones), SignIn right */}
      <div className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-12">
        {/* Left: info copy (hidden on phones) */}
        <aside className="hidden md:block w-full md:w-1/2 text-left">
          <div className="max-w-lg pr-0 md:pr-6 lg:pr-12">
            <h1 className="text-3xl font-extrabold leading-tight">Welcome back</h1>
            <p className="mt-4 text-slate-300">
              Sign in to continue to your dashboard. Secure access with modern
              auth powered by Clerk. Fast, simple, and developer-friendly.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              <li>• Single sign-on & social providers</li>
              <li>• Strong session management</li>
              <li>• Audit-ready user profiles</li>
            </ul>

            <div className="mt-8">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-white/20 to-white/10 text-white font-semibold border border-white/20 hover:border-white/30"
              >
                Create account
              </a>
            </div>
          </div>
        </aside>

        {/* Right: Clerk sign-in (constrained, no overflow) */}
        <section className="w-full md:w-1/2 md:min-w-0 flex items-center justify-center">
          <div className="w-full max-w-[420px] md:max-w-[480px] min-w-0">
            <div className="relative rounded-2xl graphite-card p-4 sm:p-6 md:p-8">
              {/* Clerk SignIn component */}
              <div className="mt-0 w-full min-w-0 max-w-full">
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: { width: "100%", maxWidth: "100%" },
                      card: { width: "100%", maxWidth: "100%" },
                      form: { width: "100%" },
                      formFieldInput: { width: "100%" },
                    },
                  }}
                  path="/login"
                  routing="path"
                  afterSignInUrl="/dashboard"
                  afterSignUpUrl="/dashboard"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
