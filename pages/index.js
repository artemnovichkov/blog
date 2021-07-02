import Container from '../components/container'
import Image from 'next/image'
import PostPreview from '../components/post-preview'
import { getAllNodes } from "next-mdx/server"
import { name, about } from '../lib/const'

export default function Main({ posts }) {
  return (
    <Container>
      <header className="flex flex-col mb-16 w-full items-center">
        <Image
          className="rounded-full"
          priority
          src="/images/avatar.jpg"
          height={144}
          width={144}
          alt={name}
        />
        <h1 className="font-bold text-3xl text-black dark:text-white">{name}</h1>
        <p className="text-black dark:text-white">{about}</p>
      </header>
      <div>
        <section>
        <h1 className="mb-4 font-bold text-3xl text-black dark:text-white">{`Recent posts`}</h1>
          <ul>
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostPreview post={post}/>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </Container>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  }
}