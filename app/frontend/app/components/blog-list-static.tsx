import Link from 'next/link'
// これはisolatedModulesオプションがTrueの際にここのファイルを独立したモジュールとして扱うため、types.tsに型情報を集約しインポートしようとすると
// 型情報はトランスパイル時に削除されるがコンパイラは知らないため、削除されたファイルからインポートしようとしていると認識しエラーを吐く。
// Databaseに対してtypeを記載するType-Only imports and exportを行うことでこのエラーを回避する
import type { Database } from '../../database.types'

type Blog = Database['public']['Tables']['blogs']['Row']

/**
 * ブログのデータ一覧を取得する関数オプジェクト
 * @params none
 * @returns Blog[] ブログデータを要素にした配列オブジェクト
 */
async function fetchBlogs() {
  const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data in server.')
  }
  const blogs: Blog[] = await res.json()

  return blogs
}

/**
 * ブログの一覧を表示する関数コンポーネント
 * @params none
 * @returns FC ブログの一覧
 */
export default async function BlogListStatic() {
  const blogs = await fetchBlogs()
  return (
    <div className='p-4'>
      <p className='mb-4 pb-3 text-xl font-medium underline underline-offset-4'>
        Blogs
      </p>
      <ul>
        {blogs?.map((blog) => (
          <li key={blog.id} className='my-1 text-base'>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
