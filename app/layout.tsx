export const metadata = {
  title: 'CONNECT PI',
  description: 'Supreme Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body style={{ backgroundColor: 'black', color: 'white', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
