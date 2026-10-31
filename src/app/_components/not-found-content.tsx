import { readFileSync } from "node:fs"
import { join } from "node:path"
import markdownToHtml from "@/lib/markdownToHtml"

/**
 * The 404 body without any chrome. Nested `not-found` files render inside
 * their segment's layout, which already draws a header and footer, so only
 * the root one wraps this in `SiteShell`.
 */
export default async function NotFoundContent() {
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
