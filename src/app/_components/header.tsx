import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky-nav w-full py-4">
            <nav>
                <Link href="/" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    Home
                </Link>
                <Link href="/blog" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    Blog
                </Link>
                <Link href="/feed.xml" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100">
                    RSS
                </Link>
                <a href="https://buymeacoffee.com/artemnovichkov" className="p-4 text-gray-900 hover:text-gray-600 dark:text-gray-100" target="_blank" rel="noopener noreferrer">
                    Buy me a coffee
                </a>
            </nav>
        </header>
    )
}