import { getAllPosts } from "@/lib/api"
import { siteUrl } from "@/lib/const"

/**
 * The entry point agents actually probe. Every other discovery surface on the
 * site (agent-skills, OpenAPI, the API catalog, the MCP card) is only reachable
 * by knowing its URL: nothing links to them from HTML, and the `Link` response
 * header that announces them is invisible to the fetch tools agents use. A
 * cold agent therefore concluded the site had no machine interface at all.
 * This file is the one path it does guess, so it lists the rest.
 */
export async function GET() {
  const posts = getAllPosts()

  const body = [
    `# Artem Novichkov`,
    ``,
    `> Personal blog of an iOS developer. Posts cover SwiftUI, Swift,`,
    `> Xcode, Foundation Models, and AI-assisted iOS development.`,
    ``,
    `Every page is available as Markdown. Send \`Accept: text/markdown\` to any`,
    `post URL, or call the Markdown endpoint below directly. Responses carry an`,
    `\`x-markdown-tokens\` header with an estimated token count.`,
    ``,
    `## Agent interfaces`,
    ``,
    `- [Post index](${siteUrl}/api/blog): JSON array of all ${posts.length} posts, newest first. Each entry has \`slug\`, \`title\`, \`description\`, \`date\`, \`categories\`, \`url\`, and \`markdown_url\`.`,
    `- [Post as Markdown](${siteUrl}/api/blog/{slug}/markdown): full post body. Requires \`Accept: text/markdown\`.`,
    `- [MCP server](${siteUrl}/mcp): Streamable HTTP endpoint exposing \`list_posts\` and \`get_post\`. No authentication.`,
    `- [Agent skill](${siteUrl}/.well-known/agent-skills/index.json): \`read-blog\` skill describing the same API.`,
    `- [OpenAPI spec](${siteUrl}/.well-known/openapi.json)`,
    `- [ARD catalog](${siteUrl}/.well-known/ard.json): machine-readable index of the capabilities above. Also served at /.well-known/ai-catalog.json.`,
    `- [API catalog](${siteUrl}/.well-known/api-catalog)`,
    `- [Access policy](${siteUrl}/auth.md): public, anonymous, no credentials issued.`,
    `- [RSS feed](${siteUrl}/feed.xml)`,
    ``,
    `## Posts`,
    ``,
    ...posts.map(
      (post) =>
        `- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.description} (${post.date})`
    ),
    ``,
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
