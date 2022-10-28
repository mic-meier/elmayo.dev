import Meta from './Meta'
import NavBar from './NavBar'

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <>
      <Meta title={title} />
      <div className="mx-auto max-w-full">
        <NavBar />
        <main className="mx-auto max-w-prose px-4 pt-4 pb-12">{children}</main>
      </div>
    </>
  )
}
