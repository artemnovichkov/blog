import { readFileSync } from "node:fs"
import { join } from "node:path"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const mdxPath = join(process.cwd(), "content", "sponsorship.mdx")
  const raw = readFileSync(mdxPath, "utf8")
  const body = raw.replace(/<[A-Z][^>]*\/>/gs, "").trim()
  const tokens = Math.ceil(body.length / 4)

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
    },
  })
}
