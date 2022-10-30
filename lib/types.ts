export interface LinkProps {
  href: string
  children: React.ReactNode
}

export interface MenuLinks {
  name: string
  to: string
}

export interface Article {
  content: string
  frontMatter: FrontMatter
}

export interface FrontMatter {
  title: string
  publishedAt: Date
  tagline: string
  published: boolean
  imgUrl: string
  imgAlt: string
  categories: string[]
  readingTime: string
  slug?: string
}
