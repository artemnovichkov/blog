import { projects } from "@/lib/const"
import { markdownResponse } from "@/lib/markdown-response"

const bio = `# Artem Novichkov

I'm an iOS developer at Salmon Group Ltd, building the [Salmon app](https://salmon.ph) — a fintech super app bringing accessible financial services to millions of Filipinos.

From time to time, I do mentoring and consulting for developers and companies navigating iOS development challenges.

I'm passionate about Swift and open-source. You can find my projects on [GitHub](https://github.com/artemnovichkov). Lately I've been exploring ways to integrate AI into my development workflows.

I write blog posts mostly about SwiftUI and occasionally share knowledge through public speaking. Check out my talks on [YouTube](https://www.youtube.com/playlist?list=PLRSU1SC70qRudLaYKSjM14tJmA-J-dRvU).

In my free time, I enjoy flying FPV drones and editing the videos I capture. I also like playing video games on my Nintendo Switch 2 and PS 5.`

function projectsMarkdown() {
  const items = projects
    .map(
      (project) =>
        `- ${project.emoji ? `${project.emoji} ` : ""}[${project.name}](${project.url}) — ${project.description}`
    )
    .join("\n")
  return `## Current Projects\n\n${items}\n`
}

const body = `${bio}\n\n${projectsMarkdown()}`

export async function GET(request: Request) {
  return markdownResponse(request, body)
}
