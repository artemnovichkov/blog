import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/interfaces/post';
import PostDate from './post-date';
import readingTime from 'reading-time'

interface PostPreviewProps {
    post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <div className="mb-4 flex items-center bg-slate-200 dark:bg-gray-800 p-4 rounded-lg border border-zinc-300 dark:border-gray-600">
                <Image className="rounded mr-4 w-1/4 sm:w-52"
                    priority
                    width={200}
                    height={124}
                    src={post.cover}
                    alt={`cover`}
                />
                <div className="flex flex-col justify-between min-h-32">
                    <div>
                        <h4 className="text-xl font-medium text-zinc-800 dark:text-gray-100">
                            {post.title}
                        </h4>
                        <h4 className="mb-4 text-base font-normal text-zinc-500 dark:text-gray-400">
                            {post.description}
                        </h4>
                    </div>
                    <div className="text-sm font-normal font-xs text-zinc-500 dark:text-gray-400">
                        <PostDate dateString={post.date} />
                        {` • `}
                        {readingTime(post.content).text}
                    </div>
                </div>
            </div>
        </Link>
    )
}