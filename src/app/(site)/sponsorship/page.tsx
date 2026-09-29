import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import { about, name } from "@/lib/const"
import markdownToHtml from "@/lib/markdownToHtml"
import { buildMetadata } from "@/lib/metadata"

const title = `${name} | Sponsorship`

export const metadata: Metadata = buildMetadata({
  title,
  description: about,
  path: "/sponsorship",
})

export default async function SponsorshipPage() {
  const mdxPath = join(process.cwd(), "content", "sponsorship.mdx")
  const mdxContent = readFileSync(mdxPath, "utf8")
  const content = await markdownToHtml(mdxContent)

  return (
    <div>
      <article>
        <div className="mx-auto mt-4 w-full max-w-2xl">
          <div className="prose dark:prose-dark w-full max-w-none">
            {content}
          </div>
        </div>
      </article>
    </div>
  )
}
