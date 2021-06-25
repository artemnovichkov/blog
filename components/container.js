import NextLink from 'next/link'
import Head from 'next/head'
import Footer from '../components/footer'
import { name, about, title} from '../lib/const'

export default function Container(props) {
    const { children, ...customMeta } = props
    const meta = {
        type: 'website',
        siteName: name,
        description: about,
        title: title,
        ...customMeta
    }
    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content={meta.siteName} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@iosartem" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
            </Head>
            <nav className="sticky-nav w-full p-8">
                <div>
                <NextLink href="/">
                    <a className="p-4 text-gray-900">Home</a>
                </NextLink>
                <NextLink href="/about">
                    <a className="p-4 text-gray-900">About</a>
                </NextLink>
                </div>
            </nav>
            <div className="flex flex-col justify-center max-w-2xl mx-auto px-8 mt-8">
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}