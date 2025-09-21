"use client";

import { useEffect } from "react";

// Use sessionStorage key to ensure we only ping once per tab session
const SESSION_KEY = "backend-warmed";

export default function WarmBackend() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyWarmed = sessionStorage.getItem(SESSION_KEY);
    if (alreadyWarmed) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7s client timeout

    fetch("/api/health", {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(() => {
        // Mark warmed regardless of success to avoid spamming on flaky networks
        sessionStorage.setItem(SESSION_KEY, "1");
      })
      .catch(() => {
        // Still set the flag to avoid repeated retries on a bad connection
        sessionStorage.setItem(SESSION_KEY, "1");
      })
      .finally(() => clearTimeout(timeout));

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
