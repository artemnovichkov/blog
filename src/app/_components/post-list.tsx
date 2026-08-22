import PostPreview from "@/app/_components/post-preview"
import type { Post } from "@/interfaces/post"

export default function PostList({
  posts,
  surface = "blog_list",
}: {
  posts: Post[]
  surface?: string
}) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
      {posts.map((post, index) => (
        <li key={post.slug}>
          {/*
            Only the first row is eager: PostPreview defaults to priority, so
            the whole list used to preload every cover on /blog — 38 images and
            38 preload hints per visit, competing with the real LCP element.
          */}
          <PostPreview
            post={post}
            surface={surface}
            position={index}
            priority={index < 2}
          />
        </li>
      ))}
    </ul>
  )
}
