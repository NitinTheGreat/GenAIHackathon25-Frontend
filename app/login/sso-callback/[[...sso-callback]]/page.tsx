"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function LoginSsoCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}