// src/app/api/vehicle/route.ts
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type    = searchParams.get("type");
  const country = searchParams.get("country");
  const id      = searchParams.get("id");

  if (!type || !country || !id) {
    return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
  }

  try {
    const apiRes = await axios.get(
      `https://api.car.info/v2/app/demo/${type}/${country}/${id}`,
      {
        headers: {
          Accept: "application/json",
          "x-auth-identifier": process.env.NEXT_PUBLIC_IDENTIFIER!,
          "x-auth-key":       process.env.NEXT_PUBLIC_KEY!,
        },
      }
    );
    return NextResponse.json(apiRes.data);
  } catch (err: any) {
    if (err.response?.status === 404) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    console.error("Car.info error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 