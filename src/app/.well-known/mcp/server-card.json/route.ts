import { siteUrl } from "@/lib/const"

const serverCard = {
  serverInfo: {
    name: "artemnovichkov.com",
    version: "2.0",
  },
  endpoint: `${siteUrl}/mcp`,
  transport: "streamable-http",
  // Only what /mcp actually implements. The card previously also claimed
  // resources and prompts, against an endpoint that returned 404.
  capabilities: ["tools"],
  tools: ["list_posts", "get_post"],
  authentication: "none",
}

export async function GET() {
  return new Response(JSON.stringify(serverCard), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  })
}
