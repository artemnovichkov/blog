import Date from './date'
import readingTime from 'reading-time'
import ViewCounter from './view-counter'

export default function PostMeta({ post }) {
    const authorFrontMatter = post.relationships.author[0].frontMatter
    return (
        <div className="text-sm text-gray-700 flex justify-between">
            <p>
                {authorFrontMatter.name}
                { ` / ` }
                <Date dateString={post.frontMatter.date} />
            </p>
            <p>
                {readingTime(post.content).text}
                { ` • ` }
                <ViewCounter slug={post.slug} />
            </p>
        </div>
    )
}