import type { Post } from "@/interfaces/post"
import PostPreview from "./post-preview"

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="idx-list">
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </div>
  )
}
