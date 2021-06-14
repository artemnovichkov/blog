import Image from 'next/image'
import styles from '../styles/layout.module.css'

const name = 'Artem Novichkov'

export default function Home({ children }) {
  return (
    <div className={styles.container}>
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