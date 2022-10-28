import Layout from 'components/Layout'
import {SITE_NAME} from 'lib/constants'
import Link from 'next/link'

export default function IndexPage() {
  return (
    <div>
      <Layout title={`${SITE_NAME} | HOME`}>
        <p>Under construction. Stay tuned...</p>
        <p>
          But while you&apos;re here, why not check out the{' '}
          <Link href="/blog" className="text-purple-700 hover:underline">
            Blog
          </Link>
        </p>
      </Layout>
    </div>
  )
}
