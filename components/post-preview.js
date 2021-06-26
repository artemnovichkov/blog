import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'

export default function PostPreview({ post }) {
    return (
        <Link href={post.url}>
            <a>
                <div className="mb-4">
                    <h4 className="text-lg font-medium text-gray-900"> 
                        {post.frontMatter.title}
                    </h4>
                    <div className="text-xs mb-2 text-gray-500">
                        <Date dateString={post.frontMatter.date} />
                    </div>
                    <Image className="rounded"
                            priority
                            width={ 1200 }
                            height={ 740 }
                            src={post.frontMatter.cover}
                    />
                </div>
            </a>
        </Link>
    )
}