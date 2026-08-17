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
    <div className="mt-4 text-gray-500 text-sm dark:text-gray-400">
      <a
        href={twitterShareUrl(post)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
        data-analytics-event="share_click"
        data-analytics-prop-slug={post.slug}
        data-analytics-prop-target="x"
      >
        {"Share on X"}
      </a>
      {` • `}
      <a
        href={editUrl(post.slug)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
        data-analytics-event="github_edit_click"
        data-analytics-prop-slug={post.slug}
      >
        {"Found a typo? Edit this post on GitHub"}
      </a>
    </div>
  )
}
