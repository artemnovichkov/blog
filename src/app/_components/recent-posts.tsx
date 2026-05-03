import Image from "next/image"
import Link from "next/link"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"
import PostDate from "./post-date"

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
          <Link
            key={p.slug}
            href={`/blog/${encodeURIComponent(p.slug)}`}
            className="wt-item"
          >
            <div className="wt-cover">
              <Image
                src={p.cover}
                alt=""
                width={800}
                height={500}
                sizes="(max-width: 600px) 100vw, 50vw"
              />
            </div>
            <div className="meta">
              <PostDate dateString={p.date} />
              <span className="dot">·</span>
              <span>{readingTime(p.content).text}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.categories && (
              <div className="tags">
                {p.categories.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
