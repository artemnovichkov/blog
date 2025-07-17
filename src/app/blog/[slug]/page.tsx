import { getPostBySlug, getAllPosts } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import PostHeader from '@/app/_components/post-header'
import PostActions from '@/app/_components/post-actions'
import type { Metadata } from 'next'
import { name } from '@/lib/const'

export default async function BlogPost(props: Params) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);
    const content = await markdownToHtml(post.content || "");
    return (
        <main>
            <article>
                <div className="flex flex-col justify-center items-start">
                    <div className="y-4">
                        <PostHeader post={post} />
                    </div>
                    <div className="prose dark:prose-dark">
                        {content}
                    </div>
                </div>
            </article>
            <PostActions post={post} />
        </main>
    );
}

type Params = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
    const params = await props.params;
    const post = getPostBySlug(params.slug);
    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `https://artemnovichkov.com/blog/${post.slug}`,
            siteName: name,
            images: [post.cover],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            siteId: '3081906297',
            creator: '@iosartem',
            creatorId: '3081906297',
            images: [post.cover],
        }
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}
