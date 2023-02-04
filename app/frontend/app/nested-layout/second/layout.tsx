export default function FirstLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>layout 2</p>
      {children}
    </main>
  )
}
