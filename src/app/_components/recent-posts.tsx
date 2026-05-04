import Link from "next/link"
import type { Post } from "@/interfaces/post"
import PostPreview from "./post-preview"

export default function RecentPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="writing-teaser">
      <div className="wt-head">
        <h2>
          <em>Recent</em> writing
        </h2>
        <Link href="/blog" className="all">
          VIEW ALL →
        </Link>
      </div>
      <div className="wt-list">
        {posts.map((p) => (
          <PostPreview key={p.slug} post={p} />
        ))}
      </div>
    </section>
  )
}
