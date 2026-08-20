import { getAllPosts } from "@/lib/api"
import { about, name, siteUrl } from "@/lib/const"

export const dynamic = "force-static"

export async function GET(): Promise<Response> {
  const posts = getAllPosts()

  const header = [
    `# ${name}`,
    ``,
    `> ${about}. Full text of every blog post, newest first.`,
    ``,
    `Source: ${siteUrl}/blog`,
    ``,
  ].join("\n")

  const body = posts
    .map((post) =>
      [
        `# ${post.title}`,
        ``,
        post.description,
        ``,
        `_${post.date}_ · ${siteUrl}/blog/${post.slug}`,
        ``,
        post.content.trim(),
        ``,
      ].join("\n")
    )
    .join("\n---\n\n")

  return new Response(`${header}---\n\n${body}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
