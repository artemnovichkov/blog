import Image from "next/image"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"
import CategoryList from "./category-list"
import PostDate from "./post-date"
import ViewCounter from "./view-counter"

export default function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <h1 className="flex items-center font-bold text-3xl text-zinc-800 tracking-tight dark:text-gray-100">
        {post.title}
      </h1>
      <div className="flex w-full flex-col items-center text-gray-500 text-sm dark:text-gray-400">
        <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
          <PostDate dateString={post.date} />
          <span>•</span>
          <span>{readingTime(post.content).text}</span>
          <span>•</span>
          <ViewCounter slug={post.slug} />
        </span>
      </div>
      <Image
        className="rounded"
        priority
        alt={post.title}
        src={post.cover}
        width={1200}
        height={740}
      />
      {post.categories && (
        <div className="flex w-full justify-start">
          <CategoryList categories={post.categories} />
        </div>
      )}
    </div>
  )
}
