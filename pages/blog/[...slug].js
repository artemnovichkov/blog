import Post from '../../components/post'
import PostMeta from '../../components/post-meta'
import Image from 'next/image'
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import mdxPrism from 'mdx-prism'

export default function Article({ post }) {
  const content = useHydrate(post, {
    components: {
      Image,
    }
  })
  return (
    <Post post={ post }>
      <article className="prose">
        <h1 className="text-3xl text-black dark:text-white mb-4">{post.frontMatter.title}</h1>
        <PostMeta post={post}/>
        <div>
        <Image 
            priority
            alt={post.frontMatter.title}
            src={post.frontMatter.cover}
            width={1200}
            height={740}
        />
        </div>
        {content}
      </article>
    </Post>
  )
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context, {
    components: {
      Image,
    },
    mdxOptions: {
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