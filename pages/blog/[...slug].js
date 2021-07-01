import Container from '../../components/container'
import PostMeta from '../../components/post-meta'
import Image from 'next/image'
import PostActions from '../../components/post-actions'
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import mdxPrism from 'mdx-prism'
const slug = require('remark-slug')
const titles = require('remark-code-titles')
const headings = require('remark-autolink-headings')

export default function Post({ post }) {
  const content = useHydrate(post, {
    components: {
      Image,
    }
  })
  return (
    <Container
        title={post.frontMatter.title}
        description={post.frontMatter.description}
        image={`https://blog-artemnovichkov.vercel.app${post.frontMatter.cover}`}
        type="article"
    >
        <div>
          <article>
            <h1 className="font-bold text-3xl tracking-tight text-black mb-4">
              {post.frontMatter.title}
            </h1>
            <PostMeta post={post}/>
              <Image 
                    priority
                    alt={post.frontMatter.title}
                    src={post.frontMatter.cover}
                    width={1200}
                    height={740}
              />
            <div className="prose">
              {content}
            </div>
          </article>
            <PostActions post={post} />
        </div>
      </Container>
  )
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context, {
    components: {
      Image,
    },
    mdxOptions: {
      remarkPlugins: [
        slug,
        titles,
        headings
      ],
      rehypePlugins: [mdxPrism]
    }
  })

  return {
    props: {
      post
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  }
}