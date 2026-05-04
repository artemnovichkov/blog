import type { Metadata } from "next"
import BlogIndex from "@/app/_components/blog-index"
import { getAllCategories, getAllPosts } from "@/lib/api"
import { categoryTitleMap, name as siteName } from "@/lib/const"

export default async function CategoryPage(props: Params) {
  const params = await props.params
  const name = params.name.toLowerCase()
  const posts = getAllPosts().filter((post) => post.categories?.includes(name))
  const categories = getAllCategories()

  return (
    <BlogIndex
      posts={posts}
      tags={categories}
      showFilter={false}
      showPostTags={false}
      title={
        <>
          Category: <em>{categoryTitleMap[name] || name}</em>
        </>
      }
    />
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
