import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import type { Database } from '../../database.types'
import SupabaseListener from '../components/supabase-listener'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ブラウザが保有しているアクセストークンをサーバーコンポーネントに渡す
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  // サーバーが保有しているアクセストークンを取得する
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <>
      <SupabaseListener accessToken={session?.access_token} />
      {children}
    </>
  )
}
