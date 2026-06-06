const BASE = "https://artemnovichkov.com"

const protectedResource = {
  resource: BASE,
  resource_name: "Artem Novichkov's Blog",
  authorization_servers: [BASE],
  scopes_supported: [],
  bearer_methods_supported: ["header"],
}

export async function GET() {
  return new Response(JSON.stringify(protectedResource), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  })
}
