import RSS from "rss"
import type { Post } from "@/interfaces/post"
import { getAllPosts } from "@/lib/api"
import { about, name } from "@/lib/const"

export async function GET(): Promise<Response> {
  const feed = new RSS({
    title: name,
    description: about,
    site_url: "https://artemnovichkov.com",
    feed_url: "https://artemnovichkov.com/feed.xml",
  })

  const posts: Post[] = await getAllPosts()

  posts.forEach((post: Post) => {
    feed.item({
      title: post.title,
      url: `https://artemnovichkov.com/blog/${post.slug}`,
      date: post.date,
      description: post.description,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  })
}
