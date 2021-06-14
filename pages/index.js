import Head from 'next/head'
import Home, { siteTitle } from '../components/home'
import PostPreview from '../components/post-preview'
import { getAllNodes } from "next-mdx/server"

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}

export default function Main({ posts }) {
  console.log(posts)
  return (
    <Home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Bearded Swift developer from Siberia 👨🏻‍💻</p>
      </section>
      <section>
          <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostPreview post={post}/>
            </li>
          ))}
          </ul>
      </section>
    </Home>
  )
}