import { getPostBySlug, getAllPosts } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import Container from '@/app/_components/container'
import PostHeader from '@/app/_components/post-header'
import PostActions from '@/app/_components/post-actions'
import Image from 'next/image'
import type { Metadata } from 'next'
import { name } from '@/lib/const'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getPostBySlug(params.slug);
    return {
        title: post.title,
        description: post.description,
        robots: {
            index: true,
            follow: true,
        },
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
        },
        other: {
            'yandex-verification': '0dbe1f786dcb070d',
        },
    };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = getAllPosts();
   
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    const content = await markdownToHtml(post.content || "");
    return (
        <Container>
            <div>
                <article>
                    <h1 className="mb-4 font-bold text-3xl tracking-tight text-black dark:text-white">
                        {post.title}
                    </h1>
                    <PostHeader post={post} />
                    <Image
                        priority
                        alt={post.title}
                        src={post.cover}
                        width={1200}
                        height={740}
                        className="mb-4"
                    />
                    <div
                        className="prose dark:prose-dark"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </article>
                <PostActions post={post} />
            </div>
        </Container>
    );
}

