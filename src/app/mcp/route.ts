import { getAllPosts, getPostBySlug, getPostMarkdown } from "@/lib/api"
import { siteUrl } from "@/lib/const"

/**
 * Streamable HTTP MCP server. `/.well-known/mcp/server-card.json` has advertised
 * this endpoint all along while nothing served it, so every client that read the
 * card and followed it got a 404. Only tools are implemented; the card lists the
 * same.
 *
 * Written against the JSON-RPC layer directly rather than an SDK: the surface is
 * two read-only tools over data the site already exposes, and the blog carries
 * no other runtime dependency of that weight.
 */

const SERVER_INFO = { name: "artemnovichkov.com", version: "2.0" }

/** Newest first. An unknown version is answered with the newest we speak. */
const SUPPORTED_PROTOCOL_VERSIONS = [
  "2025-06-18",
  "2025-03-26",
  "2024-11-05",
] as const

const TOOLS = [
  {
    name: "list_posts",
    title: "List Blog Posts",
    description:
      "Lists every blog post on artemnovichkov.com, newest first. Returns slug, title, description, date, categories, and both the page and Markdown URLs. Topics are iOS and Swift development.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_post",
    title: "Get Blog Post",
    description:
      "Returns the full Markdown body of one blog post. Take the slug from list_posts.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description:
            "Post slug, e.g. previewing-swiftui-states-with-preview-arguments",
        },
      },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
] as const

type JsonRpcId = string | number | null

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, MCP-Protocol-Version",
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  })

const result = (id: JsonRpcId, value: unknown) =>
  json({ jsonrpc: "2.0", id, result: value })

const failure = (id: JsonRpcId, code: number, message: string) =>
  json({ jsonrpc: "2.0", id, error: { code, message } })

/** A tool that failed is reported in-band so the model can see why. */
const toolText = (text: string, isError = false) => ({
  content: [{ type: "text", text }],
  isError,
})

function listPosts() {
  return getAllPosts().map(
    ({ slug, title, description, date, categories }) => ({
      slug,
      title,
      description,
      date,
      categories,
      url: `${siteUrl}/blog/${slug}`,
      markdown_url: `${siteUrl}/api/blog/${slug}/markdown`,
    })
  )
}

function callTool(name: string, args: Record<string, unknown>) {
  if (name === "list_posts") {
    return toolText(JSON.stringify(listPosts(), null, 2))
  }

  if (name === "get_post") {
    const { slug } = args
    if (typeof slug !== "string" || slug.length === 0) {
      return toolText("get_post requires a non-empty string `slug`.", true)
    }
    // getPostBySlug joins the slug onto a path, so a traversal attempt has to
    // be refused here rather than left to resolve outside content/posts.
    if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
      return toolText(`Invalid slug: ${slug}`, true)
    }

    const post = getPostBySlug(slug)
    if (!post) {
      return toolText(
        `No post with slug "${slug}". Call list_posts for valid slugs.`,
        true
      )
    }
    return toolText(getPostMarkdown(post))
  }

  return null
}

export async function POST(request: Request) {
  let message: {
    jsonrpc?: string
    id?: JsonRpcId
    method?: string
    params?: Record<string, unknown>
  }

  try {
    message = await request.json()
  } catch {
    return failure(null, -32700, "Parse error")
  }

  if (Array.isArray(message)) {
    return failure(null, -32600, "Batch requests are not supported")
  }

  const { id = null, method, params = {} } = message ?? {}

  if (typeof method !== "string") {
    return failure(id, -32600, "Invalid Request: missing method")
  }

  // Notifications carry no id and must not be answered with a result body.
  if (method.startsWith("notifications/")) {
    return new Response(null, { status: 202, headers: CORS_HEADERS })
  }

  switch (method) {
    case "initialize": {
      const requested = params.protocolVersion
      const protocolVersion =
        typeof requested === "string" &&
        (SUPPORTED_PROTOCOL_VERSIONS as readonly string[]).includes(requested)
          ? requested
          : SUPPORTED_PROTOCOL_VERSIONS[0]

      return result(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions:
          "Blog content from artemnovichkov.com, covering iOS and Swift development. Call list_posts to browse, then get_post for the full Markdown of a post.",
      })
    }

    case "ping":
      return result(id, {})

    case "tools/list":
      return result(id, { tools: TOOLS })

    case "tools/call": {
      const name = params.name
      if (typeof name !== "string") {
        return failure(id, -32602, "Invalid params: `name` must be a string")
      }

      const args =
        params.arguments && typeof params.arguments === "object"
          ? (params.arguments as Record<string, unknown>)
          : {}

      const called = callTool(name, args)
      if (!called) return failure(id, -32602, `Unknown tool: ${name}`)

      return result(id, called)
    }

    default:
      return failure(id, -32601, `Method not found: ${method}`)
  }
}

/** No server-initiated stream is offered, so the spec's SSE channel is absent. */
export async function GET() {
  return new Response(null, {
    status: 405,
    headers: { Allow: "POST, OPTIONS", ...CORS_HEADERS },
  })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}
