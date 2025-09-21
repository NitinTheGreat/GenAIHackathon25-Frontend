import { NextResponse } from "next/server";

const API_BASE_URL = process.env.FASTAPI_URL || "http://localhost:8000";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    }).catch((err) => {
      // Swallow network errors but return a friendly payload
      return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 503 });
    });

    clearTimeout(timeout);

    if (!res) {
      return NextResponse.json({ ok: false, error: "No response" }, { status: 503 });
    }

    // Try to parse JSON; if not JSON, just return status
    try {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ ok: res.ok }, { status: res.status });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Health check failed" }, { status: 500 });
  }
}
