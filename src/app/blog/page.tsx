import type { Metadata } from "next"
import { getAllCategories, getAllPosts } from "@/lib/api"
import { about, name } from "@/lib/const"
import BlogIndex from "../_components/blog-index"

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
  const tags = getAllCategories()
  return <BlogIndex posts={posts} tags={tags} />
}
