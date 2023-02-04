// エラー文をクライアントに表示する必要があるため、サーバーコンポーネントではなくクライアントコンポーネントにする必要がある
// サーバーコンポーネントからクライアントコンポーネントに切り替える場合は’use client’という文字列を上部に記載する
'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <p className='mt-6 text-center text-red-500'>
        Data fetching in server failed.
      </p>
    </div>
  )
}
