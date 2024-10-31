import { getAllPosts } from "@/lib/api";
import PostPreview from "../_components/post-preview";

export default function Blog() {
  const posts = getAllPosts();
  return (
    <main>
      <p className="font-bold text-3xl tracking-tight mb-8 text-zinc-800 dark:text-gray-100">Blog</p>
      <section>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostPreview post={post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}