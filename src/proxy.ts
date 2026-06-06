import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) return

  const { pathname } = request.nextUrl

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
