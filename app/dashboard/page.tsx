"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-10">
      <SignedOut>
        <div className="max-w-xl mx-auto">
          <Card className="graphite-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Please sign in</CardTitle>
              <CardDescription>
                You must be signed in to access the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full">Sign in</Button>
              </SignInButton>
            </CardContent>
          </Card>
        </div>
      </SignedOut>

      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </main>
  );
}

function DashboardContent() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="h-8 w-64 bg-input/50 rounded mb-3 animate-pulse" />
        <div className="h-4 w-80 bg-input/40 rounded animate-pulse" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 rounded-xl border bg-card/40 border-border animate-pulse" />
          <div className="h-40 rounded-xl border bg-card/40 border-border animate-pulse" />
          <div className="h-40 rounded-xl border bg-card/40 border-border animate-pulse" />
        </div>
      </div>
    );
  }

  const name =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.fullName || user?.username || "there";

  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "";

  const lastSignIn = user?.lastSignInAt ? formatDateTime(user.lastSignInAt) : "—";
  const joined = user?.createdAt ? formatDateTime(user.createdAt) : "—";
  const emailVerified =
    user?.primaryEmailAddress?.verification?.status === "verified";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome, <span className="text-primary">{name}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your account is ready. Continue where you left off.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: { userButtonAvatarBox: "ring-2 ring-primary/60" },
              }}
            />
            <Button asChild>
              <Link href="/analyze">Go to Analysis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile */}
        <Card className="graphite-card">
          <CardHeader className="flex-row items-center gap-4">
            <Image
              src={user?.imageUrl || "/avatar.png"}
              alt="Avatar"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full ring-2 ring-border object-cover"
            />
            <div className="min-w-0">
              <CardTitle className="truncate">{name}</CardTitle>
              <CardDescription className="truncate flex items-center gap-2">
                {email}
                {email && (
                  <span
                    className={
                      "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] " +
                      (emailVerified
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-amber-500/30 text-amber-400 bg-amber-500/10")
                    }
                  >
                    {emailVerified ? "Verified" : "Unverified"}
                  </span>
                )}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-secondary/50 p-3 border border-border/60">
                <dt className="text-muted-foreground">Joined</dt>
                <dd className="mt-1 font-medium">{joined}</dd>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3 border border-border/60">
                <dt className="text-muted-foreground">Last sign-in</dt>
                <dd className="mt-1 font-medium">{lastSignIn}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card className="graphite-card">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription>Jump back into your workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/analyze">Start new analysis</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">View homepage</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Manage sessions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Session overview */}
        <Card className="graphite-card">
          <CardHeader>
            <CardTitle className="text-base">Session</CardTitle>
            <CardDescription>Current signed-in context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="text-muted-foreground">User ID</div>
              <div className="font-mono break-all">{user?.id}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Username</div>
              <div className="font-medium">{user?.username || "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Two-factor enabled</div>
              <div className="font-medium">
                {user?.twoFactorEnabled ? "Yes" : "No"}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA band */}
      <section className="mt-10">
        <Card className="graphite-card">
          <CardHeader className="gap-1">
            <CardTitle>Analyze your data</CardTitle>
            <CardDescription>
              Run insights, track performance, and visualize results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/analyze">Continue to Analysis</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function formatDateTime(value: Date | string) {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}