import React from 'react';
import { Post } from '@/interfaces/post';


interface PostActionsProps {
  post: Post;
}

const twitterShareUrl = (post: Post): string => {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(
    `https://artemnovichkov.com/blog/${post.slug} by @iosartem`
  )}`;
};

const editUrl = (slug: string): string =>
  `https://github.com/artemnovichkov/blog/edit/main/content/posts/${slug}.mdx`;

export default function PostActions({ post }: PostActionsProps) {
  return (
    <div className="mb-8 mt-4 text-sm text-gray-500 dark:text-gray-400">
      <a
        href={twitterShareUrl(post)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {'Share on X'}
      </a>
      {` • `}
      <a
        href={editUrl(post.slug)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {'Found a typo? Edit this post on GitHub'}
      </a>
    </div>
  );
};