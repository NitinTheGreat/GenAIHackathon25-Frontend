import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.FASTAPI_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/summarize`, {
      method: "POST",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Failed to get summary" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Summarize API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
