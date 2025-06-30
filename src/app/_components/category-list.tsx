"use client";

import Link from 'next/link';

interface CategoryListProps {
    categories: string[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-medium mb-2 text-zinc-800 dark:text-gray-100">Categories</h2>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Link key={category} href={`/blog/category/${encodeURIComponent(category)}`}
                        className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    );
} 