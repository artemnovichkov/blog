import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky-nav w-full py-2">
            <nav className="flex items-center">
                <Link href="/" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    Home
                </Link>
                <Link href="/blog" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    Blog
                </Link>
                <Link href="/sponsorship" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    Sponsorship
                </Link>
                <Link href="/feed.xml" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    RSS
                </Link>
            </nav>
        </header>
    )
}