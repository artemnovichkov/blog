import Link from 'next/link';
import { categoryTitleMap } from "@/lib/const";

export default function CategoryList({ categories }: { categories: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <Link key={category} href={`/blog/category/${encodeURIComponent(category)}`}
                    className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                    {categoryTitleMap[category] || category}
                </Link>
            ))}
        </div>
    );
} 