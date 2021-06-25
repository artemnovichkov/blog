import RSS from 'rss'
import { getAllNodes } from "next-mdx/server"
const { promises: fs } = require('fs')

async function generate() {
    const feed = new RSS({
        title: 'Artem Novichkov',
        site_url: 'https://artemnovichkov.com',
        feed_url: 'https://artemnovichkov.com/feed.xml'
      });
    const posts = await getAllNodes("post")
    posts.forEach(post => {
        feed.item({
            title: post.frontMatter.title,
            url: `https://artemnovichkov.com${post.url}`,
            date: post.frontMatter.date,
            description: post.frontMatter.title,
        })
    })
    await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate()