'use client'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import useStore from '../../store'
import supabase from '../../utils/supabase'

/**
 *
 */
export default function EditTask() {
  const router = useRouter()
  const { editedTask } = useStore()
  const { loginUser } = useStore()
  const updateTask = useStore((state) => state.updateEditedTask)
  const resetTask = useStore((state) => state.resetEditedTask)

  function signOut() {
    supabase.auth.signOut()
    router.push('/auth')
  }
  //   Submitボタン実行後に呼ばれるコールバック関数
  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // もしタスクがなければタスクを新規作成する
    if (editedTask.id === '') {
      const { error } = await supabase
        .from('todos')
        .insert({ title: editedTask.title, user_id: loginUser.id })
      router.refresh()
      resetTask()
      // タスクが作成されていればタスク名を更新する
    } else {
      const { error } = await supabase
        .from('todos')
        .update({ title: editedTask.title })
        .eq('id', editedTask.id)
      router.refresh()
      resetTask()
    }
  }

  return (
    <div className='m-5 text-center'>
      <p className='my-3'>{loginUser.email}</p>
      <div className='flex justify-center'>
        {/* ログアウト用のアイコン */}
        <ArrowRightOnRectangleIcon
          className='my-3 h-6 w-6 cursor-pointer text-blue-500'
          onClick={signOut}
        />
      </div>
      <form onSubmit={submitHandler}>
        {/* タスク名のテキストインプット */}
        <input
          type='text'
          className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none'
          value={editedTask.title || ''}
          onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
        />
        {/* 完了ボタン */}
        <button
          type='submit'
          className='ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:gb-indigo-700'
        >
          {editedTask.id === '' ? 'Create' : 'Updata'}
        </button>
      </form>
    </div>
  )
}
