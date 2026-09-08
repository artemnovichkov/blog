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

type Context = { params: Promise<{ slug: string }> }

/**
 * The slug comes from the route params, never from parsing request.url: a
 * query string of any kind — a utm tag, a Vercel protection-bypass token —
 * would otherwise land in the Redis key and turn every read into a silent 0.
 */
async function viewsKey(context: Context): Promise<string | null> {
  const { slug } = await context.params
  return slug ? `views:${slug}` : null
}

const unconfigured = () =>
  NextResponse.json(
    { error: "Views backend is not configured" },
    { status: 503 }
  )

const missingSlug = () =>
  NextResponse.json({ error: "Slug is required" }, { status: 400 })

export async function GET(
  _request: Request,
  context: Context
): Promise<Response> {
  if (!redis) return unconfigured()

  const key = await viewsKey(context)
  if (!key) return missingSlug()

  const total = (await redis.get<number>(key)) ?? 0
  return NextResponse.json({ total })
}

export async function POST(
  _request: Request,
  context: Context
): Promise<Response> {
  if (!redis) return unconfigured()

  const key = await viewsKey(context)
  if (!key) return missingSlug()

  const total = await redis.incr(key)
  return NextResponse.json({ total })
}
