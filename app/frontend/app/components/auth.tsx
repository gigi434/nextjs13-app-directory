// supabaseのログインAPIやクライアントコンポーネントの関数を実行するためクライアントコンポーネントにする
'use client'

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import useStore from '../../store'
import supabase from '../../utils/supabase'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // ログインんボタンが押された時のコールバック関数
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // ログインしていたらサインインする
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      // 入力欄を初期値に戻す
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/')
      }
      // サインインしていないならサインアップをする
    } else {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      // 入力欄を初期値に戻す
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      }
    }
  }
  function signOut() {
    supabase.auth.signOut()
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <p>{loginUser.email}</p>
      {/* サインアウト */}
      <ArrowRightOnRectangleIcon
        className='my-6 h-6 w-6 cursor-pointer text-blue-600'
        onClick={signOut}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='Email'
            className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-glay-500 focus:outline-none'
            placeholder='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type='password'
            className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className='my-6 flex justify-center text-sm'>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700'
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
      {/* ログインんとサインアップを切り替える文字列 */}
      <p
        onClick={() => setIsLogin(!isLogin)}
        className='cursor-pointer font-medium hover:text-blue-500'
      >
        change mode?
      </p>
    </div>
  )
}
