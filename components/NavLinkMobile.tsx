import {LinkProps} from 'lib/types'
import Link from 'next/link'
import {forwardRef} from 'react'

const NavLinkMobile = forwardRef((props: LinkProps, ref) => {
  const {href, children, ...rest} = props

  return (
    <Link
      href={href}
      data-test-id={`${href}-mobile`}
      className="underlined px-5vw block list-none whitespace-nowrap border-b border-purple-200 bg-white py-9 text-center text-lg font-medium"
      //TODO fix this
      // @ts-ignore
      ref={ref}
      {...rest}
    >
      {children}
    </Link>
  )
})

NavLinkMobile.displayName = 'NavLinkMobile'

export default NavLinkMobile
