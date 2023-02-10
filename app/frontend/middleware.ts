/* middlewareとはレスポンスを返された時にページを表示する前にコードを実行できる機能のこと */
/* 公式から引用ミドルウェアを使用すると、リクエストが完了する前にコードを実行できます。その後、受信したリクエストに基づいて、リクエストまたはレスポンス ヘッダーを書き換え、リダイレクト、変更するか、直接応答することで、レスポンスを変更できます。 */

import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

/**
 * 認証をしていないのにも関わらず認証が必要なページにアクセスする際に認証ページへリダイレクトするミドルウェア
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })
  // 現在ログインしているユーザーのセッション情報を取得する
  const {
    data: { session },
  } = await supabase.auth.getSession()
  // ログインをしていないかつ/auth/todo-crudにアクセスするのであれば、/authにリダイレクトする
  if (!session && req.nextUrl.pathname.startsWith('/auth/todo-crud')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth'
    return NextResponse.redirect(redirectUrl)
  }
  return res
}
