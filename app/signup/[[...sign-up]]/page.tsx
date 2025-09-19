import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* ... your background + card styling ... */}
      <div className="relative z-10 max-w-md w-full">
        <SignUp />
      </div>
    </div>
  );
}
