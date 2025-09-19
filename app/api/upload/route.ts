import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.FASTAPI_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Forward the request to FastAPI backend
    const response = await fetch(`${API_BASE_URL}/api/v1/upload`, {
      method: "POST",
      body: formData,
      headers: {
        // Forward cookies for session management
        Cookie: request.headers.get("cookie") || "",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Upload failed" }, { status: response.status })
    }

    // Forward the response and any set-cookie headers
    const nextResponse = NextResponse.json(data)

    // Forward session cookies from FastAPI
    const setCookieHeader = response.headers.get("set-cookie")
    if (setCookieHeader) {
      nextResponse.headers.set("set-cookie", setCookieHeader)
    }

    return nextResponse
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
