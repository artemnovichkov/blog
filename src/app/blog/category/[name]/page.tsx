import { getAllPosts } from "@/lib/api";
import PostPreview from "@/app/_components/post-preview";
import { categoryTitleMap } from "@/lib/const";
import CategoryList from "@/app/_components/category-list";
import { getAllCategories } from "@/lib/api";
import { Metadata } from 'next';
import { name as siteName } from '@/lib/const';
import PostList from "@/app/_components/post-list";

export default async function CategoryPage(props: Params) {
  const params = await props.params;
  const name = params.name.toLowerCase();
  const posts = getAllPosts().filter(post =>
    post.categories?.includes(name)
  );
  const categories = getAllCategories();

  return (
    <main>
      <p className="flex items-center font-bold text-3xl tracking-tight my-4 text-zinc-800 dark:text-gray-100">Category: {categoryTitleMap[name] || name}</p>
      <section>
        {posts.length > 0 ? (
          <div>
            <p className="mb-4 text-zinc-500 dark:text-gray-400">
              {posts.length} post{posts.length === 1 ? '' : 's'} found in this category:
            </p>
            <PostList posts={posts} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-zinc-500 dark:text-gray-400">No posts found in this category. You can browse other categories:</p>
            <CategoryList categories={categories} />
          </div>
        )}
      </section>
    </main>
  );
}

type Params = {
  params: Promise<{
    name: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = new Set<string>();

  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(category => categories.add(category));
    }
  });

  return Array.from(categories).map((category) => ({
    name: category,
  }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const { name } = params;
  return {
    title: `${siteName} | Category: ${categoryTitleMap[name] || name}`,
    description: `Posts in "${categoryTitleMap[name] || name}" category`,
  };
}
