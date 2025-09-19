import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.FASTAPI_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/api/v1/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Failed to get answers" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
