import type { Post } from "@/interfaces/post"

const twitterShareUrl = (post: Post): string => {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(
    `https://artemnovichkov.com/blog/${post.slug} by @iosartem`
  )}`
}

const editUrl = (slug: string): string =>
  `https://github.com/artemnovichkov/blog/edit/main/content/posts/${slug}.mdx`

export default function PostActions({ post }: { post: Post }) {
  return (
    <div className="post-actions">
      <a href={twitterShareUrl(post)} target="_blank" rel="noopener noreferrer">
        Share on X
      </a>
      <a href={editUrl(post.slug)} target="_blank" rel="noopener noreferrer">
        Found a typo? Edit on GitHub
      </a>
    </div>
  )
}
