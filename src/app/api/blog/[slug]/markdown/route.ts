import { NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/api"
import { markdownResponse } from "@/lib/markdown-response"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
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

  return markdownResponse(request, frontmatter + post.content)
}
