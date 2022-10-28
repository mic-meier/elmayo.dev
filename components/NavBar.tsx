import {MENU_LINKS, SITE_NAME} from 'lib/constants'
import Link from 'next/link'
import DesktopMenu from './DesktopMenu'
import MenuMobile from './MenuMobile'

export default function NavBar() {
  return (
    <header className="pt-6 pb-2">
      <nav className="mx-auto flex max-w-prose items-baseline justify-between px-4 lg:max-w-4xl">
        <div className="py-2 pr-2 text-2xl lg:text-4xl">
          <Link
            href="/"
            className="border-b-2 border-transparent font-bold text-purple-700 transition duration-300 hover:border-purple-700"
          >
            {SITE_NAME}
          </Link>
        </div>
        <DesktopMenu links={MENU_LINKS} />
        <div className="block lg:hidden">
          <MenuMobile links={MENU_LINKS} />
        </div>
      </nav>
    </header>
  )
}
