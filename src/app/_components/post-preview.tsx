import Image from "next/image"
import Link from "next/link"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"
import CategoryList from "./category-list"
import PostDate from "./post-date"

export default function PostPreview({ post }: { post: Post }) {
  return (
    <div className="flex flex-col">
      <Link
        className="group mb-2 flex w-full flex-col gap-2 no-underline"
        href={`/blog/${encodeURIComponent(post.slug)}`}
      >
        <div className="w-full overflow-hidden rounded">
          <Image
            className="h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            priority
            src={post.cover}
            alt={`Cover image for ${post.title}`}
            width={800}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <h4 className="mt-0 font-medium text-xl text-zinc-800 transition-colors group-hover:text-accent dark:text-gray-100 dark:group-hover:text-accent">
          {post.title}
        </h4>
        <h4 className="font-normal text-base text-zinc-500 dark:text-gray-400">
          {post.description}
        </h4>
      </Link>
      {post.categories && <CategoryList categories={post.categories} />}
      <div className="mt-2 font-normal font-xs text-sm text-zinc-500 dark:text-gray-400">
        <PostDate dateString={post.date} />
        {` • `}
        {readingTime(post.content).text}
      </div>
    </div>
  )
}
