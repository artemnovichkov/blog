import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/api"

export async function GET() {
  const posts = getAllPosts().map(
    ({ slug, title, description, date, categories }) => ({
      slug,
      title,
      description,
      date,
      categories,
    })
  )
  return NextResponse.json(posts)
}
