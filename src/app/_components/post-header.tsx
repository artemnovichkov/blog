import PostDate from './post-date'
import readingTime from 'reading-time'
import ViewCounter from './view-counter'
import CategoryList from './category-list'
import Image from 'next/image'
import { Post } from "@/interfaces/post";

export default function PostHeader({ post }: { post: Post }) {
    return (
        <div className="flex flex-col w-full items-center text-center gap-4">
            <p className="flex items-center font-bold text-3xl tracking-tight ext-zinc-800 dark:text-gray-100">{post.title}</p>
            <div className="flex flex-col w-full text-sm text-gray-500 dark:text-gray-400 items-center">
                <span className="flex flex-row gap-2 items-center justify-center whitespace-nowrap">
                    <PostDate dateString={post.date} />
                    <span>•</span>
                    <span>{readingTime(post.content).text}</span>
                    <span>•</span>
                    <ViewCounter slug={post.slug} />
                </span>
            </div>
            <Image className="rounded"
                priority
                alt={post.title}
                src={post.cover}
                width={1200}
                height={740}
            />
            {post.categories && (
                <div className="w-full flex justify-start">
                    <CategoryList categories={post.categories} />
                </div>
            )}
        </div>
    )
}