import Post from '../../components/post'
import Date from '../../components/date'
import Head from 'next/head'
import Image from 'next/image'
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'

export default function Article({ post }) {
  const content = useHydrate(post, {
    components: {
      Image,
    },
  })
    return (
        <Post>
            <article>
                <h1>{post.frontMatter.title}</h1>
                <div>
                    <Date dateString={post.frontMatter.date} />
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
  })

  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  }
}