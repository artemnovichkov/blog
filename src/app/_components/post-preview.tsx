import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/interfaces/post';
import PostDate from './post-date';
import readingTime from 'reading-time'
import CategoryList from './category-list';

interface PostPreviewProps {
    post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
    return (
        <div className="mb-4 flex items-center dark:bg-gray-800 p-4 rounded-lg border border-zinc-300 dark:border-gray-600">
            <Link className="mr-4 flex-shrink-0" href={`/blog/${encodeURIComponent(post.slug)}`}>
                    <Image className="rounded"
                        priority
                        width={200}
                        height={124}
                        src={post.cover}
                        alt={`cover`}
                    />
                </Link>
            <div className="flex flex-col justify-between min-h-32">
                <div>
                    <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                        <h4 className="text-xl font-medium text-zinc-800 dark:text-gray-100">
                            {post.title}
                        </h4>
                    </Link>
                    <h4 className="mb-4 text-base font-normal text-zinc-500 dark:text-gray-400">
                        {post.description}
                    </h4>
                    {post.categories && <CategoryList categories={post.categories} />}
                </div>
                <div className="text-sm font-normal font-xs text-zinc-500 dark:text-gray-400">
                    <PostDate dateString={post.date} />
                    {` • `}
                    {readingTime(post.content).text}
                </div>
            </div>
        </div>
    )
}