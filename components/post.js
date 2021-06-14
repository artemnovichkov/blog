import Link from 'next/link'
import styles from '../styles/layout.module.css'

const name = 'Artem Novichkov'
export const siteTitle = 'Artem Novichkov Blog'

export default function Post({ children }) {
  return (
    <div className={styles.container}>
      <main>{children}</main>
      <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
    </div>
  )
}