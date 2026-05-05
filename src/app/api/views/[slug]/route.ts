import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redisUrl = process.env.KV_REST_API_URL
const redisToken = process.env.KV_REST_API_TOKEN

const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null

export async function GET(request: Request): Promise<Response> {
  if (!redis) {
    return NextResponse.json(
      { error: "Views backend is not configured" },
      { status: 503 }
    )
  }

  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const total = (await redis.get<number>(`views:${slug}`)) ?? 0
  return NextResponse.json({ total })
}

export async function POST(request: Request): Promise<Response> {
  if (!redis) {
    return NextResponse.json(
      { error: "Views backend is not configured" },
      { status: 503 }
    )
  }

  const slug = request.url.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const total = await redis.incr(`views:${slug}`)
  return NextResponse.json({ total })
}
