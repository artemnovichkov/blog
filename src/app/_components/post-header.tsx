import PostDate from './post-date'
import readingTime from 'reading-time'
import ViewCounter from './view-counter'

interface PostMetaProps {
    post: {
        date: string;
        content: string;
        slug: string;
    };
}

export default function PostMeta({ post }: PostMetaProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <PostDate dateString={post.date} />
            </div>
            <p>
                {readingTime(post.content).text}
                { ` • ` }
                <ViewCounter slug={post.slug} />
            </p>
        </div>
    )
}