export default function PostActions({ post }) {
    return (
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
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
    )
}

const twitterShareUrl = (post) => {
    const authorFrontMatter = post.relationships.author[0].frontMatter
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `https://artemnovichkov.com${post.url} by @${authorFrontMatter.twitter}`
      )}`;
  }
  
  const editUrl = (filepath) =>
    `https://github.com/artemnovichkov/nextjs-blog/edit/main/${filepath}`;