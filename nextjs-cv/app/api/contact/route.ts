import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Le corps de la requête contient un JSON invalide.",
        },
      },
      { status: 400 }
    );
  }

  const apiUrl = process.env.API_URL || "http://localhost:4000";

  try {
    const response = await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    const data: unknown = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "API_UNAVAILABLE",
          message: "Le service de contact est temporairement indisponible.",
        },
      },
      { status: 502 }
    );
  }
}
