const BASE = "https://artemnovichkov.com"

const serverCard = {
  serverInfo: {
    name: "artemnovichkov.com",
    version: "2.0",
  },
  endpoint: `${BASE}/mcp`,
  capabilities: ["tools", "resources", "prompts"],
}

export async function GET() {
  return new Response(JSON.stringify(serverCard), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  })
}
