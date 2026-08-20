import { type NextRequest, NextResponse } from "next/server"

const markdownSuffix = ".md"
const blogPrefix = "/blog/"

/**
 * Serves the markdown of a post at a URL a browser can navigate to, since a
 * plain link can't set the Accept header the negotiation below relies on.
 */
function markdownUrlRewrite(request: NextRequest, pathname: string) {
  const slug = pathname.slice(blogPrefix.length, -markdownSuffix.length)
  if (!slug) return

  // Satisfies the Accept gate in markdownResponse without changing it.
  const headers = new Headers(request.headers)
  headers.set("accept", "text/markdown")

  const response = NextResponse.rewrite(
    new URL(`/api/blog/${slug}/markdown`, request.url),
    { request: { headers } }
  )
  // Keeps the .md copy out of search results so it isn't a duplicate of the
  // canonical post. Only set here, never on the negotiated /blog/<slug>.
  response.headers.set("x-robots-tag", "noindex")
  // Without this some browsers download the file instead of displaying it.
  response.headers.set("content-disposition", "inline")
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith(blogPrefix) && pathname.endsWith(markdownSuffix)) {
    return markdownUrlRewrite(request, pathname)
  }

  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) return

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/api/home/markdown", request.url))
  }
  if (pathname === "/sponsorship") {
    return NextResponse.rewrite(
      new URL("/api/sponsorship/markdown", request.url)
    )
  }
  const slug = pathname.split("/").pop()
  return NextResponse.rewrite(
    new URL(`/api/blog/${slug}/markdown`, request.url)
  )
}

export const config = {
  matcher: ["/", "/sponsorship", "/blog/:slug"],
}
