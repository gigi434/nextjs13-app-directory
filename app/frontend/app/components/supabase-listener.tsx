'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useStore from '../../store'
import supabase from '../../utils/supabase'

/**
 * supabaseのアクセストークンを受け取る関数オブジェクト
 * @param accessToken
 * @return none
 */
export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string
}) {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  // supabaseに存在するアカウント情報をグローバルステートを使用して状態管理する
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email!,
        })
      }
    }
    getUserInfo()
    // ログインやログアウト時に変更されるセッション情報を監視する
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email! })
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [accessToken])
  return null
}
