// Playground page for development/testing only

import { promises as fs } from "fs"
import path from "path"
import markdownToHtml from "@/lib/markdownToHtml"

export default async function Playground() {
  if (process.env.NODE_ENV === "production") return null

  const markdownPath = path.join(
    process.cwd(),
    "src/app/playground/markdown.mdx"
  )
  const markdown = await fs.readFile(markdownPath, "utf-8")
  const { content } = await markdownToHtml(markdown)

  return (
    <div className="shell">
      <div className="article">
        <section className="post-hero">
          <h1>
            <em>Playground</em>
          </h1>
        </section>
        <div className="reveal d2">{content}</div>
      </div>
    </div>
  )
}
