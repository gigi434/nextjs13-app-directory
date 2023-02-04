export default function FirstLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>layout 3</p>
      {children}
    </main>
  )
}
