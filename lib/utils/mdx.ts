import fs from 'fs'
import {sync} from 'glob'
import matter from 'gray-matter'
import {Article, FrontMatter} from 'lib/types'
import path from 'path'
import readingTime from 'reading-time'

const articlesPath = path.join(process.cwd(), '_posts')

export async function getSlugs() {
  const paths = sync(`${articlesPath}/*.mdx`)

  return paths.map((path) => {
    const pathContent = path.split('/')
    const fileName = pathContent[pathContent.length - 1]
    const [slug, _extension] = fileName.split('.')

    return slug
  })
}

export async function getArticleFromSlug(slug: string): Promise<Article> {
  const articleDir = path.join(articlesPath, `${slug}.mdx`)
  const source = fs.readFileSync(articleDir)
  const {content, data} = matter(source)

  return {
    content,
    frontMatter: {
      title: data.title,
      publishedAt: data.publishedAt,
      tagline: data.tagline,
      published: data.published,
      imgUrl: data.imgUrl,
      imgAlt: data.imgAlt,
      categories: data.categories,
      readingTime: readingTime(content).text,
    },
  }
}

export async function getAllArticles() {
  const paths = fs
    .readdirSync(path.join(process.cwd(), '_posts'))
    .filter((filePath) => /\.mdx?$/.test(filePath))

  const promises = paths.map(async (filePath) => {
    const source = fs.readFileSync(path.join(articlesPath, filePath))
    const {content, data} = matter(source)
    const pathContent = filePath.split('/')
    const fileName = pathContent[pathContent.length - 1]
    const [slug, _extension] = fileName.split('.')

    if (process.env.NODE_ENV === 'production') {
      if (data.pusblished) {
        const frontMatter: FrontMatter = {
          title: data.title,
          publishedAt: data.publishedAt,
          tagline: data.tagline,
          published: data.published,
          imgUrl: data.imgUrl,
          imgAlt: data.imgAlt,
          categories: data.categories,
          readingTime: readingTime(content).text,
          slug,
        }
        return frontMatter
      }
    } else if (process.env.NODE_ENV === 'development') {
      const frontMatter: FrontMatter = {
        title: data.title,
        publishedAt: data.publishedAt,
        tagline: data.tagline,
        published: data.published,
        imgUrl: data.imgUrl,
        imgAlt: data.imgAlt,
        categories: data.categories,
        readingTime: readingTime(content).text,
        slug,
      }
      return frontMatter
    }
    return null
  })

  const filteredPromises = promises.filter(
    (promise): promise is Promise<FrontMatter> => {
      return promise != null
    },
  )

  const allArticles = await Promise.all(filteredPromises)

  return allArticles
}
