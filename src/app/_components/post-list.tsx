import PostPreview from "@/app/_components/post-preview";
import { Post } from "@/interfaces/post";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostPreview post={post} />
        </li>
      ))}
    </ul>
  );
} 