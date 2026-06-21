import { readFileSync } from "node:fs"
import { join } from "node:path"
import { markdownResponse } from "@/lib/markdown-response"

export async function GET(request: Request) {
  const mdxPath = join(process.cwd(), "content", "sponsorship.mdx")
  const raw = readFileSync(mdxPath, "utf8")
  const body = raw.replace(/<[A-Z][^>]*\/>/gs, "").trim()

  return markdownResponse(request, body)
}
