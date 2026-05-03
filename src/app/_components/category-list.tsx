import Link from "next/link"
import { categoryTitleMap } from "@/lib/const"

export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="tags">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/blog/category/${encodeURIComponent(category)}`}
          className="tag"
        >
          {categoryTitleMap[category] || category}
        </Link>
      ))}
    </div>
  )
}
