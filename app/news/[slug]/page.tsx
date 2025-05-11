import { getNewsPostBySlug } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Search, Menu, Bell, TrendingUp, Clock } from "lucide-react"
import { MDXRemote } from 'next-mdx-remote/rsc'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getNewsPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested news post could not be found.',
    }
  }

  return {
    title: `${post.title} - RapidNews`,
    description: post.excerpt,
    alternates: {
      canonical: `https://rapidnews.com/news/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
      url: `https://rapidnews.com/news/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function NewsPost({ params }: Props) {
  const { slug } = await params
  const post = await getNewsPostBySlug(slug)

  if (!post) {
    notFound()
  }
  
  // Create structured data for news article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RapidNews',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rapidnews.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rapidnews.com/news/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">RapidNews</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/tag/politics" className="text-sm font-medium hover:text-red-600 transition-colors">
              Politics
            </Link>
            <Link href="/tag/business" className="text-sm font-medium hover:text-red-600 transition-colors">
              Business
            </Link>
            <Link href="/tag/tech" className="text-sm font-medium hover:text-red-600 transition-colors">
              Technology
            </Link>
            <Link href="/tag/world" className="text-sm font-medium hover:text-red-600 transition-colors">
              World
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <article className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            {post.tags[0] && (
              <>
                <Link href={`/tag/${post.tags[0]}`} className="text-gray-500 hover:text-gray-700 capitalize">
                  {post.tags[0]}
                </Link>
                <span className="text-gray-500">/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{post.title}</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-500 mb-8">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {post.image && (
              <div className="relative h-[400px] w-full mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">RapidNews</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Your trusted source for the latest news and updates from around the world.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tag/politics" className="text-gray-400 hover:text-white text-sm">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="/tag/business" className="text-gray-400 hover:text-white text-sm">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/tag/tech" className="text-gray-400 hover:text-white text-sm">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/tag/world" className="text-gray-400 hover:text-white text-sm">
                    World
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 text-sm mb-4">Get the latest news delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 rounded text-sm flex-1"
                />
                <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} RapidNews. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 