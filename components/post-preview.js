import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'

export default function PostPreview({ post }) {
    return (
        <Link href={post.url}>
            <a className="w-full">
                <div className="w-full mb-8">
                <h4 className="text-lg md:text-xl font-medium w-full text-gray-900"> 
                    {post.frontMatter.title}
                    </h4>
                    <div className="text-gray-500">
                        <Date className="text-sm mb-2" dateString={post.frontMatter.date} />
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