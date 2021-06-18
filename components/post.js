import Link from 'next/link'

const name = 'Artem Novichkov'
export const siteTitle = 'Artem Novichkov Blog'

const twitterShareUrl = (post) => {
  const authorFrontMatter = post.relationships.author[0].frontMatter
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `https://artemnovichkov.com${post.url} by @${authorFrontMatter.twitter}`
    )}`;
}

const editUrl = (filepath) =>
  `https://github.com/artemnovichkov/nextjs-blog/edit/main/${filepath}`;

export default function Post({ children, post }) {
  return (
    <article className="flex flex-col justify-center max-w-2xl mx-auto mb-16 mt-16 w-full">
      <div>{children}</div>
      <div className="text-sm text-gray-700">
          <a
            href={twitterShareUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Share on Twitter'}
          </a>
          {` • `}
          <a
            href={editUrl(post.filepath)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Edit on GitHub'}
          </a>
        </div>
      <Link href="/">
          <a>← Back to home</a>
      </Link>
    </article>
  )
}