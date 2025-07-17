import { getAllPosts } from "@/lib/api";
import { Metadata } from 'next';
import { name } from '@/lib/const'
import PostList from "../_components/post-list";

export const metadata: Metadata = {
  title: `${name} | Blog`,
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <main>
      <p className="font-bold text-3xl tracking-tight my-4 text-zinc-800 dark:text-gray-100">Blog</p>
      <section>
        <PostList posts={posts} />
      </section>
    </main>
  );
}