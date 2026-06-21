import fs from "node:fs"
import { join } from "node:path"
import matter from "gray-matter"
import { cache } from "react"
import type { Post } from "@/interfaces/post"

const postsDirectory = join(process.cwd(), "content/posts")

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, "")
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content } as Post
}

// Cached per-request: avoids re-reading and re-parsing every post on each
// call (a single post page calls this via getPreviousPost/getNextPost too).
export const getAllPosts = cache((): Post[] => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date))
  return posts
})

export function getPreviousPost(currentSlug: string): Post | null {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex === -1 || currentIndex === posts.length - 1) {
    return null
  }

  return posts[currentIndex + 1]
}

export function getNextPost(currentSlug: string): Post | null {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex <= 0) {
    return null
  }

  return posts[currentIndex - 1]
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categoriesSet = new Set<string>()

  posts.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((category) => {
        categoriesSet.add(category)
      })
    }
  })

  return Array.from(categoriesSet).sort()
}
