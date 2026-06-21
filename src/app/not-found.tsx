import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import { about, name } from "@/lib/const"
import markdownToHtml from "@/lib/markdownToHtml"
import { buildMetadata } from "@/lib/metadata"

const title = `${name} | Page Not Found`

export const metadata: Metadata = {
  ...buildMetadata({
    title,
    description: about,
    // No real canonical path for a 404 page; root is the closest sensible url.
    path: "/",
  }),
  description:
    "Oops! This page seems to have wandered off into the digital void.",
}

export default async function NotFound() {
  const mdxPath = join(process.cwd(), "content", "404.mdx")
  const mdxContent = readFileSync(mdxPath, "utf8")
  const highlightedContent = await markdownToHtml(mdxContent)

  return (
    <div className="mt-8 flex flex-col items-start justify-center">
      <h1 className="mb-4 font-bold text-4xl text-zinc-800 tracking-tight dark:text-gray-100">
        404 - Page Not Found
      </h1>

      <div className="prose dark:prose-dark mb-8 w-full max-w-none">
        {highlightedContent}
      </div>
    </div>
  )
}
