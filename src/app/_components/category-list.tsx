import Link from "next/link"
import { categoryTitleMap } from "@/lib/const"

export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="meta-tags">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/blog/category/${encodeURIComponent(category)}`}
          className="meta-tag"
        >
          #{categoryTitleMap[category] || category}
        </Link>
      ))}
    </div>
  )
}
