// /appディレクトリ直下のコンポーネントはルートレイアウトとみなされ、
// 従来の_app.tsxのようなアプリケーション全体に適用される設定を記述することができる
import React from 'react'
import NavBar from './components/nav-bar'
import '../styles/globals.css'

/* ルートレイアウトにページコンポーネントを展開する */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // ルートレイアウトは必ずhtml, bodyタグで囲う必要がある
    <html>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
