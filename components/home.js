import Image from 'next/image'

const name = 'Artem Novichkov'

export default function Home({ children }) {
  return (
    <div>
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