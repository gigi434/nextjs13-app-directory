'use client'

// useRouterは同名のnext/routerとしてuseRouterがある。こちらはReactv18以前のクライアントコンポーネントという概念が作られる前のものであるため、置き換える
import { useRouter } from 'next/navigation'

export default function RefreshBtn() {
  const router = useRouter()
  return (
    <button
      className='rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700'
      onClick={() => {
        router.refresh()
      }}
    >
      Refresh current route
    </button>
  )
}
