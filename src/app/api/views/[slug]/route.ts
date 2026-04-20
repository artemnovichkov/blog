import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function GET(request: Request): Promise<Response> {
  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const total = (await redis.get<number>(`views:${slug}`)) ?? 0
  return NextResponse.json({ total })
}

export async function POST(request: Request): Promise<Response> {
  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const total = await redis.incr(`views:${slug}`)
  return NextResponse.json({ total })
}
