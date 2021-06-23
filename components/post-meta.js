import Image from 'next/image'
import Date from './date'
import readingTime from 'reading-time'
import ViewCounter from './view-counter'

export default function PostMeta({ post }) {
    const authorFrontMatter = post.relationships.author[0].frontMatter
    return (
        <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
            <Image
              alt={authorFrontMatter.name}
              height={24}
              width={24}
              src={authorFrontMatter.avatar}
              className="rounded-full"
            />
            <p className="ml-2">
                {authorFrontMatter.name}
                { ` / ` }
                <Date dateString={post.frontMatter.date} />
            </p>
            </div>
            <p>
                {readingTime(post.content).text}
                { ` • ` }
                <ViewCounter slug={post.slug} />
            </p>
        </div>
    )
}