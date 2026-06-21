import { NextResponse } from "next/server"

const notFound = () =>
  NextResponse.json({ error: "Not found" }, { status: 404 })

/**
 * Builds a text/markdown Response for the markdown API routes, guarded by
 * the Accept header. Returns 404 JSON when markdown wasn't requested.
 */
export function markdownResponse(request: Request, body: string) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) {
    return notFound()
  }

  const tokens = Math.ceil(body.length / 4)

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
    },
  })
}
