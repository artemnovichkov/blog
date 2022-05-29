import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'

export default function PostPreview({ post }) {
    return (
        <Link href={post.url}>
            <a>
                <div className="mb-10">
                    <h4 className="text-xl font-medium text-gray-900 dark:text-white"> 
                        {post.frontMatter.title}
                    </h4>
                    <h4 className="mb-2 text-base font-normal text-gray-600 dark:text-gray-400"> 
                        {post.frontMatter.description}
                    </h4>
                    <Image className="rounded"
                            priority
                            width={1200}
                            height={740}
                            src={post.frontMatter.cover}
                    />
                </div>
            </a>
        </Link>
    )
}