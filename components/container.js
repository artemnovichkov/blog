import NextLink from 'next/link'
import ExternalLink from './external-link'
import Head from 'next/head'
import Footer from '../components/footer'
import { name, about, title} from '../lib/const'

export default function Container(props) {
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
        <div>
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
            </Head>
            <nav className="sticky-nav w-full py-4">
                <div>
                <NextLink href="/">
                    <a className="p-4 text-gray-900">Home</a>
                </NextLink>
                <NextLink href="/about">
                    <a className="p-4 text-gray-900">About</a>
                </NextLink>
                <ExternalLink className="p-4" href="https://artemnovichkov.com/feed.xml">RSS</ExternalLink>
                </div>
            </nav>
            <div className="flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-0">
                <main>
                    {children}
                </main>
                { !hideFooter && <Footer />}
            </div>
        </div>
    )
}