import type { Metadata } from "next"
import CategoryList from "@/app/_components/category-list"
import { getAllCategories } from "@/lib/api"
import { name as siteName } from "@/lib/const"
import { buildMetadata } from "@/lib/metadata"

const title = `${siteName} | Categories`

// Without its own metadata this page inherited the root layout's, which
// canonicalises to the site root — telling Google the category index is a
// duplicate of the home page.
export const metadata: Metadata = buildMetadata({
  title,
  description: "Every topic covered on the blog, from SwiftUI to Xcode.",
  path: "/blog/category",
  siteName,
  twitterCard: "summary",
})

export default function Categories() {
  const categories = getAllCategories()

  return (
    <div>
      <h1 className="my-4 font-bold text-3xl text-zinc-800 tracking-tight dark:text-gray-100">
        {"Categories"}
      </h1>
      {categories.length > 0 ? (
        <CategoryList categories={categories} surface="category_index" />
      ) : (
        <p className="text-zinc-500 dark:text-gray-400">No categories found.</p>
      )}
    </div>
  )
}
