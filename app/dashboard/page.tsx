import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-10">
      <SignedOut>
        <div className="max-w-2xl mx-auto text-center text-slate-300">
          <h1 className="text-2xl font-bold">Please sign in</h1>
          <p className="mt-2 text-sm">You must be signed in to access the dashboard.</p>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <p className="mt-3 text-slate-300">Welcome back! Your account is set up.</p>
        </div>
      </SignedIn>
    </main>
  );
}
