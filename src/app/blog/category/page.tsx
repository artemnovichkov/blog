import CategoryList from "@/app/_components/category-list"
import { getAllCategories } from "@/lib/api"

export default function Categories() {
  const categories = getAllCategories()

  return (
    <main>
      <p className="font-bold text-3xl tracking-tight my-4 text-zinc-800 dark:text-gray-100">
        Categories
      </p>
      {categories.length > 0 ? (
        <CategoryList categories={categories} />
      ) : (
        <p className="text-zinc-500 dark:text-gray-400">No categories found.</p>
      )}
    </main>
  )
}
