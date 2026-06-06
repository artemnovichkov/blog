const BASE = "https://artemnovichkov.com"

const authorizationServer = {
  issuer: BASE,
  agent_auth: {
    skill: `${BASE}/auth.md`,
    register_uri: `${BASE}/auth.md`,
    identity_types_supported: ["anonymous"],
  },
}

export async function GET() {
  return new Response(JSON.stringify(authorizationServer), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  })
}
