import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://rapidnews.com'),
  title: {
    default: 'RapidNews - Latest News and Updates',
    template: '%s | RapidNews'
  },
  description: 'Stay informed with the latest news and updates from around the world. RapidNews delivers breaking stories, analysis, and in-depth coverage of politics, business, technology, and global events.',
  keywords: ['news', 'updates', 'latest news', 'breaking news', 'current events', 'politics', 'business', 'technology', 'world news', 'global news'],
  authors: [{ name: 'RapidNews Team' }],
  creator: 'RapidNews',
  publisher: 'RapidNews',
  alternates: {
    canonical: 'https://rapidnews.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rapidnews.com',
    siteName: 'RapidNews',
    title: 'RapidNews - Latest News and Updates',
    description: 'Stay informed with the latest news and updates from around the world. RapidNews delivers breaking stories, analysis, and in-depth coverage of politics, business, technology, and global events.',
    images: [
      {
        url: 'https://rapidnews.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RapidNews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RapidNews - Latest News and Updates',
    description: 'Stay informed with the latest news and updates from around the world. RapidNews delivers breaking stories, analysis, and in-depth coverage of politics, business, technology, and global events.',
    creator: '@rapidnews',
    images: ['https://rapidnews.com/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
