import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date'

export default function PostPreview({ post }) {
    return (
        <Link href={post.url}>
            <a className="w-full">
                <h4 className="text-lg md:text-xl font-medium w-full text-gray-900"> 
                    {post.frontMatter.title}
                </h4>
                <Date className="text-sm mb-2 text-gray-100" dateString={post.frontMatter.date} />
                <Image className="rounded"
                        priority
                        width={ 1200 }
                        height={ 740 }
                        src={post.frontMatter.cover}
                />
            </a>
        </Link>
    )
}