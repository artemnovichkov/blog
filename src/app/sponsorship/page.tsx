import { readFileSync } from "fs"
import type { Metadata } from "next"
import { join } from "path"
import { about, name } from "@/lib/const"
import markdownToHtml from "@/lib/markdownToHtml"

const title = `${name} | Sponsorship`

export const metadata: Metadata = {
  title,
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

export default async function SponsorshipPage() {
  const mdxPath = join(process.cwd(), "content", "sponsorship.mdx")
  const mdxContent = readFileSync(mdxPath, "utf8")
  const content = await markdownToHtml(mdxContent)

  return (
    <div className="shell">
      <section className="post-hero">
        <h1 className="reveal">
          <em>Sponsorship</em>
        </h1>
      </section>
      <article className="article-wrap reveal d2">
        <div className="article">{content}</div>
      </article>
    </div>
  )
}
