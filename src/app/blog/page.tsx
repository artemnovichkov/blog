import type { Metadata } from "next"
import { getAllPosts } from "@/lib/api"
import { about, name } from "@/lib/const"
import PostList from "../_components/post-list"

const title = `${name} | Blog`

export const metadata: Metadata = {
  title,
  openGraph: {
    title: title,
    description: about,
    url: "https://artemnovichkov.com/",
    siteName: title,
    images: ["https://artemnovichkov.com/images/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: about,
    siteId: "3081906297",
    creator: "@iosartem",
    creatorId: "3081906297",
    images: ["https://artemnovichkov.com/images/banner.png"],
  },
}

export default function Blog() {
  const posts = getAllPosts()
  return (
    <main>
      <p className="my-4 font-bold text-4xl text-zinc-800 tracking-tight dark:text-gray-100">
        Blog
      </p>
      <section>
        <PostList posts={posts} />
      </section>
    </main>
  )
}
