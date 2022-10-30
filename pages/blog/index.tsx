import Layout from 'components/Layout'
import format from 'date-fns/format'
import {SITE_NAME} from 'lib/constants'
import {FrontMatter} from 'lib/types'
import {getAllArticles} from 'lib/utils/mdx'
import Link from 'next/link'
import {useState} from 'react'

export default function BlogPage({
  posts,
  blogCategories,
}: {
  posts: Array<FrontMatter>
  blogCategories: string[]
}) {
  const [filter, setFilter] = useState('')

  const handleFiltering = (category: string) => {
    if (category === filter) {
      setFilter('')
    } else {
      setFilter(category)
    }
  }
  return (
    <Layout title={`${SITE_NAME} | BLOG`}>
      <h1 className="mt-12 mb-8 text-6xl font-bold text-gray-800">
        Blog Posts
      </h1>
      <div className="mb-12 flex flex-wrap">
        {blogCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleFiltering(category)}
            className={`my-1 mr-2 flex-none rounded-3xl px-2 py-1 text-xs text-gray-50 ${
              category === filter ? 'bg-purple-500' : ' bg-purple-700'
            }
          `}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {posts.map((post) => {
          if (post.categories?.includes(filter) || filter === '') {
            let formattedDate
            if (post.publishedAt) {
              formattedDate = format(new Date(post.publishedAt), 'do MMM yyyy')
            }
            return (
              <div key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <div className="mb-4 text-sm text-gray-400">
                    {formattedDate ? (
                      <p>
                        {formattedDate} - {post.readingTime}
                      </p>
                    ) : (
                      <p>{post.readingTime}</p>
                    )}
                  </div>
                  <p>{post.tagline}</p>
                </Link>
              </div>
            )
          }
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getAllArticles()

  // next build fails without this
  const displayPosts = posts.filter((post) => post)

  displayPosts.sort((a, b) => (a.publishedAt > b?.publishedAt ? -1 : 1))

  const blogCategories = [
    ...new Set(
      displayPosts
        .flatMap((post) => {
          return post.categories
        })
        .filter((category) => category),
    ),
  ]

  return {
    props: {
      posts: displayPosts,
      blogCategories,
    },
  }
}
