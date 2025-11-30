// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const CRYSTALPOINT_API = "https://onezerocorp.com/auth/register";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(CRYSTALPOINT_API, body, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 12000,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    // Narrow error safely using axios helper when possible
    if (axios.isAxiosError(error)) {
      console.error("[Register Proxy] Error:", error.message);

      if (error.response) {
        // Forward exact error from CrystalPoint API
        return NextResponse.json(
          error.response.data || { message: "Registration failed" },
          { status: error.response.status ?? 502 }
        );
      }

      if (error.code === "ECONNABORTED") {
        return NextResponse.json(
          { message: "Request timeout. Please try again." },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { message: "Service temporarily unavailable. Please try again later." },
      { status: 502 }
    );
  }
}
