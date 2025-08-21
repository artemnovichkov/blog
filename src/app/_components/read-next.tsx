import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/interfaces/post';
import PostDate from './post-date';

export default function ReadNext({ post }: { post: Post }) {
    return (
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Read Next
            </h3>
            <Link 
                href={`/blog/${encodeURIComponent(post.slug)}`}
                className="flex flex-col sm:flex-row gap-4 no-underline"
            >
                <div className="flex-shrink-0 sm:w-48">
                    <Image
                        className="rounded w-full h-auto object-cover"
                        src={post.cover}
                        alt={`Cover image for ${post.title}`}
                        width={800}
                        height={400}
                        sizes="(max-width: 640px) 100vw, 192px"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {post.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                        <PostDate dateString={post.date} />
                    </div>
                </div>
            </Link>
        </div>
    );
}