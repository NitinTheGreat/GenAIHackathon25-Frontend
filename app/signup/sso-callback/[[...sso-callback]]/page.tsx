"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SignupSsoCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}