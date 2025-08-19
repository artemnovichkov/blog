import { getAllPosts } from "@/lib/api";
import { Metadata } from 'next';
import { about, name } from '@/lib/const'
import PostList from "../_components/post-list";

const title = `${name} | Blog`;

export const metadata: Metadata = {
  title,
  openGraph: {
    title: title,
    description: about,
    url: 'https://www.artemnovichkov.com/',
    siteName: title,
    images: ['https://www.artemnovichkov.com/images/banner.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: about,
    siteId: '3081906297',
    creator: '@iosartem',
    creatorId: '3081906297',
    images: ['https://www.artemnovichkov.com/images/banner.png'],
  },
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <main>
      <p className="font-bold text-4xl tracking-tight my-4 text-zinc-800 dark:text-gray-100">Blog</p>
      <section>
        <PostList posts={posts} />
      </section>
    </main>
  );
}