import { name, title, about } from '@/lib/const'
import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: name,
  description: about,
  robots: {
      index: true,
      follow: true,
  },
  openGraph: {
      title: name,
      description: about,
      url: 'https://www.artemnovichkov.com/',
      siteName: title,
      images: ['https://www.artemnovichkov.com/images/banner.png'],
  },
  twitter: {
      card: 'summary_large_image',
      title: name,
      description: about,
      siteId: '3081906297',
      creator: '@iosartem',
      creatorId: '3081906297',
      images: ['https://www.artemnovichkov.com/images/banner.png'],
  },
  other: {
      'yandex-verification': '0dbe1f786dcb070d',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
