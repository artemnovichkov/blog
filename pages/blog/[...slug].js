import Post from '../../components/post'
import Date from '../../components/date'
import Image from 'next/image'
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'

export default function Article({ post }) {
  const content = useHydrate(post, {
    components: {
      Image,
    }
  })
  return (
    <Post>
      <article>
        <h1>{post.frontMatter.title}</h1>
        <div>
          <Date dateString={post.frontMatter.date} />
          <p>{ readingTime(post.content).text }</p>
        </div>
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