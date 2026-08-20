import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PostList from "@/app/_components/post-list"
import {
  getAllPosts,
  getCategoryPostCount,
  minIndexableCategoryPosts,
} from "@/lib/api"
import { categoryTitleMap, name as siteName } from "@/lib/const"
import { buildMetadata } from "@/lib/metadata"

export default async function CategoryPage(props: Params) {
  const params = await props.params
  const name = params.name.toLowerCase()
  const posts = getAllPosts().filter((post) => post.categories?.includes(name))

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div>
      <h1 className="my-4 flex items-center font-bold text-3xl text-zinc-800 tracking-tight dark:text-gray-100">
        Category: {categoryTitleMap[name] || name}
      </h1>
      <section>
        <div>
          <p className="mb-4 text-zinc-500 dark:text-gray-400">
            {posts.length} post{posts.length === 1 ? "" : "s"} found in this
            category:
          </p>
          <PostList posts={posts} surface="category" />
        </div>
      </section>
    </div>
  )
}

type Params = {
  params: Promise<{
    name: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = new Set<string>()

  posts.forEach((post) => {
    if (post.categories) {
      for (const category of post.categories) {
        categories.add(category)
      }
    }
  })

  return Array.from(categories).map((category) => ({
    name: category,
  }))
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  // Lowercased like the page itself, so the canonical and the count lookup
  // both match the category the page actually renders.
  const name = params.name.toLowerCase()
  const title = `${siteName} | Category: ${categoryTitleMap[name] || name}`
  const description = `Posts in "${categoryTitleMap[name] || name}" category`
  const metadata = buildMetadata({
    title,
    description,
    path: `/blog/category/${name}`,
    siteName,
    twitterCard: "summary",
  })

  // A one-post category adds nothing a search result for the post itself would
  // not already say. Still followed, so the post keeps the internal link.
  if (getCategoryPostCount(name) < minIndexableCategoryPosts) {
    return { ...metadata, robots: { index: false, follow: true } }
  }

  return metadata
}
