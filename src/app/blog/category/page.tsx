import CategoryList from "@/app/_components/category-list"
import { getAllCategories } from "@/lib/api"

export default function Categories() {
  const categories = getAllCategories()

  return (
    <div className="shell">
      <section className="idx-hero">
        <h1>
          <em>Categories</em>
        </h1>
        <div className="meta">
          <div className="count">{categories.length} topics</div>
        </div>
      </section>
      {categories.length > 0 ? (
        <div style={{ marginTop: 24 }}>
          <CategoryList categories={categories} />
        </div>
      ) : (
        <p style={{ color: "var(--ink-3)", marginTop: 24 }}>
          No categories found.
        </p>
      )}
    </div>
  )
}
