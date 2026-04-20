import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""
  if (accept.includes("text/markdown")) {
    const slug = request.nextUrl.pathname.split("/").pop()
    return NextResponse.rewrite(
      new URL(`/api/blog/${slug}/markdown`, request.url)
    )
  }
}

export const config = {
  matcher: "/blog/:slug*",
}
