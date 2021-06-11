import Head from 'next/head'
import Home, { siteTitle } from '../components/home'
import PostPreview from '../components/post-preview'
import utilStyles from '../styles/utils.module.css'
import { getAllNodes } from "next-mdx/server"

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}

export default function Main({ posts }) {
  return (
    <Home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Bearded Swift developer from Siberia 👨🏻‍💻</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <ul className={utilStyles.list}>
          {posts.map((post) => (
            <li className={utilStyles.listItem} key={post.slug}>
              <PostPreview post={post}/>
            </li>
          ))}
          </ul>
      </section>
    </Home>
  )
}