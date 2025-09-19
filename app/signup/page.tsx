import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
  {/* Subtle premium accents */}
  <div className="absolute -left-24 top-12 w-80 h-80 rounded-xl rotate-12 bg-gradient-to-tr from-white/5 to-white/0 opacity-30 blur-3xl" />
  <div className="absolute right-0 bottom-0 w-[28rem] h-[28rem] rounded-lg -rotate-6 bg-gradient-to-bl from-white/6 to-white/0 opacity-20 blur-2xl" />


  <div className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-stretch md:min-h-[calc(100vh-4rem)] gap-6 sm:gap-8 md:gap-12">
        {/* Left: benefits text (hidden on phones) */}
  <aside className="hidden md:flex w-full md:w-1/2 text-left md:h-full md:flex-col md:justify-center">
          <div className="max-w-lg pr-0 md:pr-6 lg:pr-12">
            <h3 className="text-2xl font-extrabold">Why sign up?</h3>
            <p className="mt-4 text-slate-300">
              Save your settings, access advanced features, and keep your data
              secure. Designed with usability in mind and powered by Clerk.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              <li>• Instant onboarding with social providers</li>
              <li>• Modern security & sessions</li>
              <li>• Easy integration with your account settings</li>
            </ul>

    
          </div>
        </aside>

        {/* Right: Clerk signup (constrained, no overflow) */}
        <section className="w-full md:w-1/2 md:min-w-0 flex items-center justify-center">
          <div className="w-full max-w-[420px] md:max-w-[480px] min-w-0">
            <div className="relative rounded-2xl graphite-card p-4 sm:p-6 md:p-8">
              {/* Clerk SignUp component */}
              <div className="mt-0 w-full min-w-0 max-w-full">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: { width: "100%", maxWidth: "100%" },
                      card: { width: "100%", maxWidth: "100%" },
                      form: { width: "100%" },
                      formFieldInput: { width: "100%" },
                    },
                  }}
                  path="/signup"
                  routing="path"
                  afterSignUpUrl="/dashboard"
                  afterSignInUrl="/dashboard"
                />
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
