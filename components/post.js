import Link from 'next/link'

const name = 'Artem Novichkov'
export const siteTitle = 'Artem Novichkov Blog'

export default function Post({ children }) {
  return (
    <div className="flex flex-col justify-center max-w-2xl mx-auto mb-16 mt-16 w-full">
      <main>{children}</main>
      <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
    </div>
  )
}