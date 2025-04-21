import { getAllPosts } from "@/lib/api";
import PostPreview from "@/app/_components/post-preview";

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

export default function CategoryPage({ params }: { params: { name: string } }) {
  const decodedCategory = decodeURIComponent(params.name);
  const posts = getAllPosts().filter(post => 
    post.categories?.includes(decodedCategory)
  );

  return (
    <main>
      <div className="flex items-center mb-8">
        <p className="font-bold text-3xl tracking-tight text-zinc-800 dark:text-gray-100">
          Category: {decodedCategory}
        </p>
      </div>
      <section>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostPreview post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-500 dark:text-gray-400">No posts found in this category.</p>
        )}
      </section>
    </main>
  );
} 