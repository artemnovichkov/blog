import RSS from 'rss';
import { getAllPosts } from '@/lib/api';
import { name, about } from '@/lib/const';
import { Post } from '@/interfaces/post';

export async function GET(): Promise<Response> {
    const feed = new RSS({
        title: name,
        description: about,
        site_url: 'https://artemnovichkov.com',
        feed_url: 'https://artemnovichkov.com/feed.xml',
    });

    const posts: Post[] = await getAllPosts();

    posts.forEach((post: Post) => {
        feed.item({
            title: post.title,
            url: `https://artemnovichkov.com/blog/${post.slug}`,
            date: post.date,
            description: post.description,
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    });
}
