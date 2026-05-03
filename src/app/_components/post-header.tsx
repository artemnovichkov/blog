import Image from "next/image"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"
import { categoryTitleMap } from "@/lib/const"
import CategoryList from "./category-list"
import PostDate from "./post-date"
import ViewCounter from "./view-counter"

const primaryCategory = (post: Post): string | null => {
  if (!post.categories || post.categories.length === 0) return null
  const c = post.categories[0]
  return categoryTitleMap[c] || c
}

export default function PostHeader({ post }: { post: Post }) {
  const primary = primaryCategory(post)
  return (
    <section className="post-hero">
      <div className="crumbs">
        <a href="/">Home</a>
        <span className="sep">/</span>
        <a href="/blog">Blog</a>
        {primary && (
          <>
            <span className="sep">/</span>
            <span className="accent">{primary.toUpperCase()}</span>
          </>
        )}
      </div>
      <h1 className="reveal">{post.title}</h1>
      <p className="dek reveal d2">{post.description}</p>

      <figure className="post-cover reveal d2">
        <Image
          src={post.cover}
          alt={post.title}
          priority
          width={1600}
          height={900}
          sizes="(max-width: 1320px) 100vw, 1320px"
        />
      </figure>

      <div className="post-meta reveal d3">
        <div className="item">
          <span className="k">Published</span>
          <span className="v">
            <PostDate dateString={post.date} />
          </span>
        </div>
        <div className="item">
          <span className="k">Reading time</span>
          <span className="v">{readingTime(post.content).text}</span>
        </div>
        <div className="item">
          <span className="k">Views</span>
          <span className="v">
            <ViewCounter slug={post.slug} />
          </span>
        </div>
        {post.categories && post.categories.length > 0 && (
          <div className="item item--tags">
            <span className="k">Categories</span>
            <span className="v">
              <CategoryList categories={post.categories} />
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
