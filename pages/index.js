import Home from '../components/home'
import PostPreview from '../components/post-preview'
import { getAllNodes } from "next-mdx/server"

export default function Main({ posts }) {
  return (
    <Home>
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}