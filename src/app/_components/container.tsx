import Link from 'next/link'
import Head from 'next/head'
import Footer from './footer'
import { name, about, title } from '@/lib/const'
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    hideFooter?: boolean;
    [key: string]: any;
}

export default function Container(props: ContainerProps) {
    const { children, hideFooter, ...customMeta } = props
    const meta = {
        type: 'website',
        siteName: name,
        description: about,
        title: title,
        image: 'https://www.artemnovichkov.com/images/banner.png',
        ...customMeta
    }
    return (
        <div className="bg-white dark:bg-black">
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={meta.description} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content={meta.siteName} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@iosartem" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                <meta name="yandex-verification" content="0dbe1f786dcb070d" />
            </Head>
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
                    {children}
                </main>
                {!hideFooter && <Footer />}
            </div>
        </div>
    )
}
