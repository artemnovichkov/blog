import Head from 'next/head'
import PostMeta from '../../components/post-meta'
import Image from 'next/image'
import PostActions from '../../components/post-actions'
import Footer from '../../components/footer'
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
    <div className="flex flex-col justify-center max-w-2xl mx-auto px-8 mt-8 w-full">
      <div>
      <Head>
        <title>{post.frontMatter.title}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontMatter.title} />
        <meta property="og:description" content={post.frontMatter.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontMatter.title} />
        <meta name="twitter:description" content={post.frontMatter.description} />
        <meta name="twitter:image" content={`https://blog-artemnovichkov.vercel.app${post.frontMatter.cover}`} />
      </Head>
      <article className="prose">
        <h1 className="text-3xl text-black mb-4">{post.frontMatter.title}</h1>
        <PostMeta post={post}/>
        <Image 
              priority
              alt={post.frontMatter.title}
              src={post.frontMatter.cover}
              width={1200}
              height={740}
        />
        <div>
          {content}
        </div>
      </article>
      </div>
      <PostActions post={post} />
      <Footer />
    </div>
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