import Image from 'next/image'
import PostPreview from '../components/post-preview'
import { getAllNodes } from "next-mdx/server"

const name = 'Artem Novichkov'
const about = 'Bearded Swift developer from Siberia 👨🏻‍💻'

export default function Main({ posts }) {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl mx-auto my-16">
      <header className="flex flex-col mb-16 w-full items-center">
        <Image className="rounded-full"
          priority
          src="/images/avatar.jpg"
          height={144}
          width={144}
          alt={name}
        />
        <h1 className="font-bold text-3xl text-black">{name}</h1>
        <p>{about}</p>
      </header>
      <main>
      <section>
          <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostPreview post={post}/>
            </li>
          ))}
          </ul>
      </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}