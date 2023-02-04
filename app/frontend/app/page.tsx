import { Suspense } from 'react'
import NotesList from './components/notes-list'
import RefreshBtn from './components/refresh-btn'
import Spinner from './components/spinner'
import TimerCounter from './components/timer-counter'

export default function page() {
  return (
    <main>
      <div className='m-10 text-center'>
        <p>Hello World!</p>
        {/* ルートツリーにloading.tsxがあると、自動的にサスペンスされspinnerが表示される。 */}
        {/* しかし、レンダリングに時間がかかっている関数コンポーネントはNotesListだけである。
        レンダリングに時間がかかる関数コンポーネント以外をレンダリングしたい場合は、コンポーネントレベルでサスペンスするStreamingHTMLを使用する */}
        {/* Next.js v13は開発中であり、エラーが発生するが問題ないため抑制してこのまま使用する */}
        <Suspense fallback={<Spinner color='border-green-500' />}>
          {/* @ts-ignore */} {/* eslint-disable-line */}
          <NotesList />
        </Suspense>
        <TimerCounter />
        {/* ページを更新せずにボタンを押すことによってニュースの一覧を取得するボタン */}
        <RefreshBtn />
      </div>
    </main>
  )
}
