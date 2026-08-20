const BASE = "https://artemnovichkov.com"

// There is no HTTP MCP endpoint yet, so the card advertises only what actually
// resolves: the in-page WebMCP tools and the plain HTTP surface agents can use.
const serverCard = {
  serverInfo: {
    name: "artemnovichkov.com",
    version: "2.0",
  },
  documentation: `${BASE}/auth.md`,
  serviceDesc: `${BASE}/.well-known/openapi.json`,
  llmsTxt: `${BASE}/llms.txt`,
}

export async function GET() {
  return new Response(JSON.stringify(serverCard), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  })
}
