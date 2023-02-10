import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import type { Database } from '../../database.types'
import TodoItem from './todo-item'

/**
 * 登録しているTodoを全て取得して表示する関数コンポーネント
 * @param none
 * @return FC
 */
export default async function TodoList() {
  const supabase = createServerComponentSupabaseClient<Database>({
    // サーバーコンポーネント側でクライアントからのheaderとcookieを操作するためのもの
    headers,
    cookies,
  })
  const { data: todos } = await supabase
    .from('todos')
    .select()
    .order('created_at', { ascending: true })
  return (
    <ul className='my-6 mx-3'>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}
