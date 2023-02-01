import { format } from 'date-fns'
import type { Database } from '../../database.types'

// ノートの型エイリアスとして定義する
type Note = Database['public']['Tables']['notes']['Row']

/**
 * SupabaseのNotesテーブルからノートの一覧を取得するフェッチ関数
 * @params None
 * @returns
 */
async function fetchNotes() {
  // フェッチしていることを視覚的にわかるように遅延を入れる
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // SupabaseのNotesテーブルに対してRESTApiでノート一覧を取得する
  // 従来のNext.jsではuseEffect、データフェッチライブラリとしてreact-queryやSWRを使用してページ表示時に一度だけフェッチしていたが、
  // fetch関数を使用すると自動で静的レンダリング（SSG）として扱われる。キャッシュオプションを利用することで動的レンダリング（SSR）に切り替えることができる。
  const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
    headers: new Headers({
      apikey: process.env.apikey as string,
    }),
    cache: 'no-store',
  })
  // もしレスポンスが正常に取得できない場合はエラーを返す
  if (!res.ok) {
    throw new Error('Failed to fetch data in server.')
  }
  const notes: Note[] = await res.json()
  return notes
}

export default async function NotesList() {
  const notes = await fetchNotes()
  return (
    <div>
      <p className='my-4 pb-3 text-xl font-medium underline underline-offset-4'>
        Notes
      </p>
      <ul className='m-3'>
        {notes?.map((note) => (
          <li key={note.id}>
            <p>{note.title}</p>
            <p>
              <strong className='mr-3'>Created at:</strong>
              {note && format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
