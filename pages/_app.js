import '../styles/prism.css'
import '../styles/global.css'
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps}) {
    return (
        < ThemeProvider defaultTheme="system">
            <Component {...pageProps } />
        </ThemeProvider>
    )
}