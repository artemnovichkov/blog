import Head from 'next/head'
import Home, { siteTitle } from '../components/home'
import PostPreview from '../components/post-preview'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Main({ allPostsData }) {
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
          {allPostsData.map((postData) => (
            <li className={utilStyles.listItem} key={postData.id}>
              <PostPreview postData={postData}/>
            </li>
          ))}
          </ul>
      </section>
    </Home>
  )
}