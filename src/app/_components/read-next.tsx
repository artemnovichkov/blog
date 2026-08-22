import type { RelatedPost } from "@/lib/api"
import PostPreview from "./post-preview"

// Three cards inside the article's max-w-2xl column, so each one is roughly a
// third of 672px once the grid reaches its widest breakpoint.
const imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 224px"

export default function ReadNext({ posts }: { posts: RelatedPost[] }) {
  return (
    <div className="mt-8 border-gray-200 border-t pt-8 dark:border-gray-800">
      <h2 className="mb-4 font-bold text-2xl text-zinc-800 tracking-tight dark:text-gray-100">
        {"Read next"}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ post, isRelated }, index) => (
          <PostPreview
            key={post.slug}
            post={post}
            variant="compact"
            showCategories={false}
            priority={false}
            imageSizes={imageSizes}
            // Split so the topical picks and the recency backfill can be
            // compared against each other in PostHog.
            surface={isRelated ? "read_next" : "read_next_recent"}
            position={index}
            // Only three cards and the reader has finished the article, so the
            // prefetch is likely to be used.
            prefetch
          />
        ))}
      </div>
    </div>
  )
}
