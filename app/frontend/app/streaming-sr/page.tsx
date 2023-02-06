export const revalidate = 0

import { Suspense } from 'react'
import BlogList from '../components/blog-list'
import NewsList from '../components/news-list'
import Spinner from '../components/spinner'

/**
 * レンダリング時間が異なるサーバーコンポーネント2つをレンダリングできるコンポーネントからレンダリングする関数コンポーネント
 */
export default function StreamingServerRenderingPage() {
  return (
    <section className='flex'>
      <aside className='w-1/4'>
        <section className='fixed m-1 h-full w-1/4 border border-blue-500 bg-gray-200 p-1'>
          <Suspense fallback={<Spinner color='border-green-500' />}>
            {/*@ts-ignore */} {/* eslint-disable-line */}
            <BlogList />
          </Suspense>
        </section>
      </aside>
      <main>
        <section className='fixed w-3/4'>
          <Suspense fallback={<Spinner />}>
            {/*@ts-ignore */} {/* eslint-disable-line */}
            <NewsList />
          </Suspense>
        </section>
      </main>
    </section>
  )
}
