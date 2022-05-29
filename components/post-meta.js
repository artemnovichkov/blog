import Date from './date'
import readingTime from 'reading-time'
import ViewCounter from './view-counter'

export default function PostMeta({ post }) {
    const authorFrontMatter = post.relationships.author[0].frontMatter
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Date dateString={post.frontMatter.date} />
            </div>
            <p>
                {readingTime(post.content).text}
                { ` • ` }
                <ViewCounter slug={post.slug} />
            </p>
        </div>
    )
}