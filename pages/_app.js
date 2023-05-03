import '../styles/prism.css'
import '../styles/global.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
    return (
        < ThemeProvider defaultTheme="system">
            <Component {...pageProps } />
            <Analytics />
        </ThemeProvider>
    )
}