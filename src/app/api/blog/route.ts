import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/api"
import { siteUrl } from "@/lib/const"

export async function GET() {
  const posts = getAllPosts().map(
    ({ slug, title, description, date, categories }) => ({
      slug,
      title,
      description,
      date,
      categories,
      // Without these an agent holding a slug has to guess how the site builds
      // post URLs. One tried /posts/{slug} and /{slug}, got 404 twice, and only
      // recovered the /blog/{slug} pattern by spotting another post in search
      // results. The Markdown route is undiscoverable from here otherwise.
      url: `${siteUrl}/blog/${slug}`,
      markdown_url: `${siteUrl}/api/blog/${slug}/markdown`,
    })
  )
  return NextResponse.json(posts)
}
