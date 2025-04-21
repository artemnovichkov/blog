"use client";

import Link from 'next/link';

interface PostCategoriesProps {
    categories: string[];
}

export default function PostCategories({ categories }: PostCategoriesProps) {
    return (
        <div>
            {categories.map((category) => (
                <Link key={category} href={`/blog/category/${encodeURIComponent(category)}`}>
                    {category}
                </Link>
            ))}
        </div>
    );
} 