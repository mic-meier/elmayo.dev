import type {LinkProps} from 'lib/types'
import Link from 'next/link'

export default function NavLink({href, children}: LinkProps) {
  return (
    <div className="px-5 py-2">
      <Link
        href={href}
        data-test-id={`${href}-desktop`}
        className="hover:text-purple-700"
      >
        {children}
      </Link>
    </div>
  )
}
