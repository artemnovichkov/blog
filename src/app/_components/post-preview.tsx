import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/interfaces/post';

interface PostPreviewProps {
    post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <div className="mb-10">
                    <h4 className="text-xl font-medium text-gray-900 dark:text-white"> 
                        {post.title}
                    </h4>
                    <h4 className="mb-2 text-base font-normal text-gray-600 dark:text-gray-400"> 
                        {post.description}
                    </h4>
                    <Image className="rounded"
                            priority
                            width={1200}
                            height={740}
                            src={post.cover}
                            alt={`cover`}
                    />
                </div>
        </Link>
    )
}