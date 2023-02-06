import Link from 'next/link'

export default function NavBar() {
  return (
    <header className='bg-gray-800 p-4'>
      <nav className='space-x-4'>
        {/* ランディングページに移動する */}
        <Link
          href='/'
          className='rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500'
        >
          Home
        </Link>
        {/* 匿名アカウントでも閲覧できるブログに移動する */}
        <Link
          href='/blogs'
          className='rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500'
        >
          Nested Layout with Blogs
        </Link>
        {/* streamingHTMLの学習用ページに移動する */}
        <Link
          href='/streaming-sr'
          className='rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500'
        >
          Streaming SR
        </Link>
        {/* Supabaseの認証後にCRUD操作を学習するページに移動する */}
        <Link
          href='/auth'
          className='rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-500'
        >
          Auth with CRUD
        </Link>
      </nav>
    </header>
  )
}
