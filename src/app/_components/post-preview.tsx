import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/interfaces/post';
import PostDate from './post-date';
import readingTime from 'reading-time'
import CategoryList from './category-list';

export default function PostPreview({ post }: { post: Post }) {
    return (
        <div className="flex flex-col">
            <Link className="w-full flex flex-col gap-2 mb-2 no-underline" href={`/blog/${encodeURIComponent(post.slug)}`}> 
                <div className="w-full">
                  <Image
                    className="rounded w-full h-auto object-cover"
                    priority
                    src={post.cover}
                    alt={"cover"}
                    width={800}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <h4 className="text-xl font-medium text-zinc-800 dark:text-gray-100 mt-0">
                    {post.title}
                </h4>
                <h4 className="text-base font-normal text-zinc-500 dark:text-gray-400">
                    {post.description}
                </h4>
            </Link>
            {post.categories && <CategoryList categories={post.categories} />}
            <div className="text-sm font-normal font-xs text-zinc-500 dark:text-gray-400 mt-2">
                <PostDate dateString={post.date} />
                {` • `}
                {readingTime(post.content).text}
            </div>
        </div>
    )
}