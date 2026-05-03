import type { Metadata } from "next"
import CategoryList from "@/app/_components/category-list"
import PostList from "@/app/_components/post-list"
import { getAllCategories, getAllPosts } from "@/lib/api"
import { categoryTitleMap, name as siteName } from "@/lib/const"

export default async function CategoryPage(props: Params) {
  const params = await props.params
  const name = params.name.toLowerCase()
  const posts = getAllPosts().filter((post) => post.categories?.includes(name))
  const categories = getAllCategories()

  return (
    <div className="shell">
      <section className="idx-hero">
        <h1>
          Category: <em>{categoryTitleMap[name] || name}</em>
        </h1>
        <div className="meta">
          <div className="count">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </div>
        </div>
      </section>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div style={{ marginTop: 32 }}>
          <p
            style={{
              color: "var(--ink-3)",
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            No posts found in this category. Browse other categories:
          </p>
          <CategoryList categories={categories} />
        </div>
      )}
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
      post.categories.forEach((category) => categories.add(category))
    }
  })

  return Array.from(categories).map((category) => ({
    name: category,
  }))
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const { name } = params
  const title = `${siteName} | Category: ${categoryTitleMap[name] || name}`
  const description = `Posts in "${categoryTitleMap[name] || name}" category`
  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
      url: `https://artemnovichkov.com/blog/category/${name}`,
      siteName: siteName,
      images: ["https://artemnovichkov.com/images/banner.png"],
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
      siteId: "3081906297",
      creator: "@iosartem",
      creatorId: "3081906297",
      images: ["https://artemnovichkov.com/images/banner.png"],
    },
  }
}
