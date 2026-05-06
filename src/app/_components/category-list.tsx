import Link from "next/link"
import { categoryTitleMap } from "@/lib/const"

export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/blog/category/${encodeURIComponent(category)}`}
          className="rounded-full border border-accent/20 bg-zinc-200/70 px-3 py-1 text-sm text-zinc-700 transition-colors hover:bg-accent/10 hover:text-accent dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-accent/20 dark:hover:text-accent"
        >
          {categoryTitleMap[category] || category}
        </Link>
      ))}
    </div>
  )
}
