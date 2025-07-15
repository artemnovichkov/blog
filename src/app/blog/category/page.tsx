import { getAllCategories } from "@/lib/api";
import Link from "next/link";
import { categoryTitleMap } from "@/lib/const";

export default function Categories() {
  const categories = getAllCategories();
  
  return (
    <main>
      <p className="font-bold text-3xl tracking-tight my-4 text-zinc-800 dark:text-gray-100">Categories</p>
      
      {categories.length > 0 ? (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link 
                key={category} 
                href={`/blog/category/${encodeURIComponent(category)}`}
                className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {categoryTitleMap[category] || category}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-zinc-500 dark:text-gray-400">No categories found.</p>
      )}
    </main>
  );
} 