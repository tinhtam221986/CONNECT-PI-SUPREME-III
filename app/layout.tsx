export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body style={{ backgroundColor: '#000', color: '#fff', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
