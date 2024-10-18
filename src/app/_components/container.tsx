import Link from 'next/link'
import Footer from './footer'
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

export default function Container(props: ContainerProps) {
    return (
        <div className="bg-white dark:bg-black">
            <nav className="sticky-nav w-full py-4">
                <div>
                    <Link href="/" className="p-4 text-gray-900 hover:text-gray-600 dark:text-white">
                        Home
                    </Link>
                    <Link href="/blog" className="p-4 text-gray-900 hover:text-gray-600 dark:text-white">
                        Blog
                    </Link>
                    <Link href="/feed.xml" className="p-4 text-gray-900 hover:text-gray-600 dark:text-white">
                        RSS
                    </Link>
                </div>
            </nav>
            <div className="flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-0">
                <main>
                    {props.children}
                </main>
                <Footer />
            </div>
        </div>
    )
}
