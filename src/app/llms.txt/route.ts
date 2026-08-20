import { getAllPosts } from "@/lib/api"
import { about, name, siteUrl } from "@/lib/const"

export const dynamic = "force-static"

export async function GET(): Promise<Response> {
  const posts = getAllPosts()

  const body = [
    `# ${name}`,
    ``,
    `> ${about}. Blog posts about Swift, SwiftUI, and iOS development.`,
    ``,
    `Every post is available as markdown by appending \`.md\` to its URL, or by`,
    `sending \`Accept: text/markdown\` to the post URL. The full text of every`,
    `post is at ${siteUrl}/llms-full.txt.`,
    ``,
    `## Posts`,
    ``,
    ...posts.map(
      (post) =>
        `- [${post.title}](${siteUrl}/blog/${post.slug}.md): ${post.description}`
    ),
    ``,
    `## Optional`,
    ``,
    `- [About](${siteUrl}/): bio and current projects`,
    `- [Sponsorship](${siteUrl}/sponsorship): sponsorship options`,
    `- [OpenAPI spec](${siteUrl}/.well-known/openapi.json): programmatic access`,
    ``,
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
