import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content')

export interface NewsPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: any // MDXRemoteSerializeResult
  author: string
  image?: string
  tags: string[]
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(contentDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const mdxSource = await serialize(content)

        return {
          slug,
          content: mdxSource,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          author: data.author,
          image: data.image,
          tags: data.tags || [],
        }
      })
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const mdxSource = await serialize(content)

    return {
      slug,
      content: mdxSource,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      image: data.image,
      tags: data.tags || [],
    }
  } catch (error) {
    return null
  }
}

export async function getNewsPostsByTag(tag: string): Promise<NewsPost[]> {
  const posts = await getAllNewsPosts()
  return posts.filter(post => post.tags.includes(tag))
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllNewsPosts()
  const tags = new Set<string>()
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
} 