import { getAllNewsPosts, getNewsPostsByTag } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, Bell, TrendingUp, Clock, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: 'RapidNews - Latest News and Updates',
  description: 'Stay informed with the latest news and updates from around the world.',
  openGraph: {
    title: 'RapidNews - Latest News and Updates',
    description: 'Stay informed with the latest news and updates from around the world.',
    type: 'website',
  },
}

export default async function Home() {
  const [allPosts, politicsPosts, businessPosts, techPosts, worldPosts] = await Promise.all([
    getAllNewsPosts(),
    getNewsPostsByTag('politics'),
    getNewsPostsByTag('business'),
    getNewsPostsByTag('tech'),
    getNewsPostsByTag('world')
  ])

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null
  const secondaryPosts = allPosts.slice(1, 3)

  return (
    <div className="flex min-h-screen flex-col">
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
        {/* Breaking News Banner */}
        <div className="bg-red-600 text-white py-2">
          <div className="container flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-red-600 border-white">
              BREAKING
            </Badge>
            <p className="text-sm font-medium">
              {featuredPost?.title || "Latest news updates"}
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPost && (
              <Card className="col-span-1 lg:col-span-2 overflow-hidden">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={featuredPost.image || "/placeholder.svg?height=400&width=800"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {featuredPost.title}
                    </h1>
                    <p className="text-white/80 text-sm md:text-base">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Clock className="h-4 w-4 text-white/60" />
                      <span className="text-white/60 text-sm">
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex flex-col gap-4">
              {secondaryPosts.map((post) => (
                <Card key={post.slug}>
                  <div className="relative h-[180px]">
                    <Image
                      src={post.image || "/placeholder.svg?height=180&width=400"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h2 className="text-lg font-bold text-white">{post.title}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-white/60" />
                        <span className="text-white/60 text-xs">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News Categories Tabs */}
        <section className="container py-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="world">World</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {post.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        <Link href={`/news/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.author}</span>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <div className="mt-4 flex gap-2">
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
                  </article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="politics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {politicsPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {post.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        <Link href={`/news/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.author}</span>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <div className="mt-4 flex gap-2">
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
                  </article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {post.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        <Link href={`/news/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.author}</span>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <div className="mt-4 flex gap-2">
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
                  </article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {post.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        <Link href={`/news/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.author}</span>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <div className="mt-4 flex gap-2">
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
                  </article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="world">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worldPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {post.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        <Link href={`/news/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.author}</span>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      <div className="mt-4 flex gap-2">
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
                  </article>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
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
