import { readFileSync } from "fs"
import type { Metadata } from "next"
import { join } from "path"
import { about, name } from "@/lib/const"
import markdownToHtml from "@/lib/markdownToHtml"

const title = `${name} | Page Not Found`

export const metadata: Metadata = {
  title,
  description:
    "Oops! This page seems to have wandered off into the digital void.",
  openGraph: {
    title: title,
    description: about,
    url: "https://artemnovichkov.com/",
    siteName: title,
    images: ["https://artemnovichkov.com/images/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: about,
    siteId: "3081906297",
    creator: "@iosartem",
    creatorId: "3081906297",
    images: ["https://artemnovichkov.com/images/banner.png"],
  },
}

export default async function NotFound() {
  const mdxPath = join(process.cwd(), "content", "404.mdx")
  const mdxContent = readFileSync(mdxPath, "utf8")
  const { content } = await markdownToHtml(mdxContent)

  return (
    <div className="shell">
      <div className="article">
        <section className="post-hero">
          <h1>
            <em>404</em> — Page Not Found
          </h1>
        </section>
        <div className="reveal d2">{content}</div>
      </div>
    </div>
  )
}
