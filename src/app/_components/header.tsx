import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky-nav w-full py-4">
            <nav>
                <Link href="/" className="p-4 text-gray-900 hover:text-gray-600 dark:text-white">
                    Home
                </Link>
                <Link href="/blog" className="p-4 text-gray-900 hover:text-gray-600 dark:text-white">
                    Blog
                </Link>
                <Link href="/feed.xml" className="p-4 text-gray-900 hover:text-gray-600 dark:text-white">
                    RSS
                </Link>
            </nav>
        </header>
    )
}