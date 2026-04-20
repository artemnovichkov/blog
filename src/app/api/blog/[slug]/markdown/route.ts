import { getPostBySlug } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const frontmatter = [
    `# ${post.title}`,
    ``,
    post.description,
    ``,
    `_${post.date}_`,
    ``,
  ].join("\n")

  const body = frontmatter + post.content
  const tokens = Math.ceil(body.length / 4)

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
    },
  })
}
