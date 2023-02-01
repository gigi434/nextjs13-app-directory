import NotesList from './components/notes-list'

export default function page() {
  return (
    <main>
      <div className='m-10 text-center'>
        <p>Hello World!</p>
        {/* Next.js v13は開発中であり、エラーが発生するが問題ないため抑制してこのまま使用する */}
        {/* @ts-ignore */} {/* eslint-disable-line */}
        <NotesList />
      </div>
    </main>
  )
}
