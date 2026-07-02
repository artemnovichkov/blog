import type { Metadata } from "next"
import { getAllPosts } from "@/lib/api"
import { about, name } from "@/lib/const"
import { buildMetadata } from "@/lib/metadata"
import PostList from "../_components/post-list"

const title = `${name} | Blog`

export const metadata: Metadata = buildMetadata({
  title,
  description: about,
  path: "/blog",
})

export default function Blog() {
  const posts = getAllPosts()
  return (
    <div>
      <h1 className="my-4 font-bold text-4xl text-zinc-800 tracking-tight dark:text-gray-100">
        Blog
      </h1>
      <section>
        <PostList posts={posts} />
      </section>
    </div>
  )
}
