import Head from 'next/head'
import Image from 'next/image'

const name = 'Artem Novichkov'
export const siteTitle = 'Artem Novichkov Blog'

export default function Home({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
      <Image
              priority
              src="/images/avatar.jpg"
              height={144}
              width={144}
              alt={name}
            />
            <h1>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}