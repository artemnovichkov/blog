const BASE = "https://artemnovichkov.com"

const catalog = {
  linkset: [
    {
      anchor: `${BASE}/api/views`,
      "service-desc": [
        {
          href: `${BASE}/.well-known/openapi.json`,
          type: "application/openapi+json",
        },
      ],
      "service-doc": [
        {
          href: `${BASE}/blog`,
        },
      ],
    },
  ],
}

export async function GET() {
  return new Response(JSON.stringify(catalog), {
    headers: {
      "Content-Type": "application/linkset+json",
    },
  })
}
