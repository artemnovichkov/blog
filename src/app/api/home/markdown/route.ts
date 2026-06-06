import { NextResponse } from "next/server"

const body = `# Artem Novichkov

I'm an iOS developer at Salmon Group Ltd, building the [Salmon app](https://salmon.ph) — a fintech super app bringing accessible financial services to millions of Filipinos.

From time to time, I do mentoring and consulting for developers and companies navigating iOS development challenges.

I'm passionate about Swift and open-source. You can find my projects on [GitHub](https://github.com/artemnovichkov). Lately I've been exploring ways to integrate AI into my development workflows.

I write blog posts mostly about SwiftUI and occasionally share knowledge through public speaking. Check out my talks on [YouTube](https://www.youtube.com/playlist?list=PLRSU1SC70qRudLaYKSjM14tJmA-J-dRvU).

In my free time, I enjoy flying FPV drones and editing the videos I capture. I also like playing video games on my Nintendo Switch 2 and PS 5.

## Current Projects

- 🎨 [asset-catalog-viewer](https://github.com/artemnovichkov/asset-catalog-viewer) — VS Code extension for .xcassets preview
- 🏠 [atmoshome](https://atmoshome.vercel.app) — Home environment monitoring dashboard
- 🔌 [claude-code-plugins](https://github.com/artemnovichkov/claude-code-plugins) — Claude Code plugins collection
- 🔮 [horoscope](https://github.com/artemnovichkov/horoscope) — Dev horoscope powered by Foundation Models
- 🆕 [iOS-26-by-Examples](https://github.com/artemnovichkov/iOS-26-by-Examples) — Hands-on iOS 26 feature examples
- ⌨️ [shortcuts-mcp-server](https://github.com/artemnovichkov/shortcuts-mcp-server) — Shortcuts + MCP
- 🐛 [TranscriptDebugMenu](https://github.com/artemnovichkov/TranscriptDebugMenu) — Debug menu for LanguageModelSession transcripts
`

export async function GET(request: Request) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  const tokens = Math.ceil(body.length / 4)
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
    },
  })
}
