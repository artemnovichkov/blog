import Link from "next/link"
import type { Post } from "@/interfaces/post"

export default function ReadNext({ post }: { post: Post }) {
  return (
    <div className="post-nav">
      <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="pn prev">
        <span className="k">← Previous</span>
        <span className="t">{post.title}</span>
      </Link>
    </div>
  )
}
