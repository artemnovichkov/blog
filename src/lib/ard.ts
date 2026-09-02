import { getAllPosts, getPostModifiedDate } from "@/lib/api"
import { siteUrl } from "@/lib/const"

/**
 * Agentic Resource Discovery catalog.
 *
 * Every entry points at something that actually answers: the MCP server card
 * (whose endpoint is now served), the OpenAPI spec, and the agent skill. ARD is
 * a catalog of pointers, so it is only worth publishing while the things it
 * points at work — which is why no A2A agent card is listed here. The site is
 * not an agent that accepts tasks, and advertising one would repeat the mistake
 * the MCP card made when it named an endpoint that returned 404.
 *
 * `representativeQueries` is what agentic search engines index, so these are
 * phrased as the questions a developer would actually type, not as topic labels.
 */

const PUBLISHER = "artemnovichkov.com"

type ArdEntry = {
  identifier: string
  displayName: string
  type: string
  url: string
  description: string
  capabilities: string[]
  representativeQueries: string[]
  updatedAt?: string
}

export function getArdCatalog(): { entries: ArdEntry[] } {
  // The archive's newest revision: the catalog is only as fresh as the content
  // behind it, and a build timestamp would churn the file on every deploy.
  const updatedAt = getAllPosts().map(getPostModifiedDate).sort().at(-1)

  const entries: ArdEntry[] = [
    {
      identifier: `urn:air:${PUBLISHER}:server:blog`,
      displayName: "Artem Novichkov Blog MCP Server",
      type: "application/mcp-server-card+json",
      url: `${siteUrl}/.well-known/mcp/server-card.json`,
      description:
        "MCP server over the blog archive. Lists posts and returns any post as Markdown. Read-only, no authentication.",
      capabilities: ["list_posts", "get_post"],
      representativeQueries: [
        "how do I preview multiple SwiftUI states with #Preview(arguments:)",
        "how do I track token usage in Apple Foundation Models",
        "how do I name tasks in Swift Concurrency for debugging",
        "build an iOS app with Xcode's headless MCP server",
      ],
      updatedAt,
    },
    {
      identifier: `urn:air:${PUBLISHER}:tool:blog-api`,
      displayName: "Artem Novichkov Blog API",
      type: "application/openapi+json",
      url: `${siteUrl}/.well-known/openapi.json`,
      description:
        "HTTP API for the blog. Lists posts as JSON and returns any post as Markdown via Accept negotiation.",
      capabilities: ["ListPosts", "GetPostMarkdown"],
      representativeQueries: [
        "list every post on artemnovichkov.com",
        "fetch a post from artemnovichkov.com as markdown",
      ],
      updatedAt,
    },
    {
      identifier: `urn:air:${PUBLISHER}:skill:read-blog`,
      displayName: "read-blog",
      // No media type is registered for Agent Skills, so the index is described
      // by what it actually is rather than by an invented type.
      type: "application/json",
      url: `${siteUrl}/.well-known/agent-skills/index.json`,
      description:
        "Agent Skills index describing how to list and read posts from the blog.",
      capabilities: ["read-blog"],
      representativeQueries: [
        "what does Artem Novichkov write about",
        "find iOS and Swift articles by Artem Novichkov",
      ],
      updatedAt,
    },
  ]

  return { entries }
}
