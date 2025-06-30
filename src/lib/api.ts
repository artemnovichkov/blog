import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Post } from "@/interfaces/post";

const postsDirectory = join(process.cwd(), "content/posts");

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    // Process categories if they exist
    const processedData = { ...data };
    if (typeof data.categories === 'string') {
        // Split the string by commas and trim whitespace
        processedData.categories = data.categories.split(',').map((category: string) => category.trim());
    }

    return { ...processedData, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categoriesSet = new Set<string>();
    
    posts.forEach(post => {
        if (post.categories) {
            post.categories.forEach(category => categoriesSet.add(category));
        }
    });
    
    return Array.from(categoriesSet).sort();
}