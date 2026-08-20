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
// call (a single post page goes through it via getRelatedPosts too).
export const getAllPosts = cache((): Post[] => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => Date.parse(post2.date) - Date.parse(post1.date))
  return posts
})

// Cached alongside getAllPosts so the archive is only counted once per request,
// however many posts ask how rare their categories are.
const getCategoryCounts = cache((): Map<string, number> => {
  const counts = new Map<string, number>()

  for (const post of getAllPosts()) {
    for (const category of post.categories ?? []) {
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
  }

  return counts
})

export function getAllCategories(): string[] {
  return Array.from(getCategoryCounts().keys()).sort()
}

export type RelatedPost = {
  post: Post
  /** False for the recency backfill, so analytics can tell the two apart. */
  isRelated: boolean
}

/**
 * Posts sharing categories with the given one, most relevant first. Each shared
 * category is weighted by how rare it is: `swiftui` sits on two thirds of the
 * archive and says almost nothing, while `mcp` or `result-builders` mark a real
 * cluster. Seven posts have no same-category partner at all, so short lists are
 * topped up with the newest posts rather than leaving the block half empty.
 */
export function getRelatedPosts(currentSlug: string, limit = 3): RelatedPost[] {
  const posts = getAllPosts()
  const current = posts.find((post) => post.slug === currentSlug)
  if (!current) return []

  const counts = getCategoryCounts()
  const currentCategories = new Set(current.categories ?? [])

  const related: RelatedPost[] = posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: (post.categories ?? []).reduce(
        (total, category) =>
          currentCategories.has(category)
            ? total + 1 / (counts.get(category) ?? 1)
            : total,
        0
      ),
    }))
    .filter((candidate) => candidate.score > 0)
    // sort is stable, so equally relevant posts keep the newest-first order
    // getAllPosts already put them in.
    .sort((first, second) => second.score - first.score)
    .slice(0, limit)
    .map(({ post }) => ({ post, isRelated: true }))

  if (related.length === limit) return related

  const taken = new Set(related.map(({ post }) => post.slug))
  for (const post of posts) {
    if (related.length === limit) break
    if (post.slug === currentSlug || taken.has(post.slug)) continue

    related.push({ post, isRelated: false })
  }

  return related
}
