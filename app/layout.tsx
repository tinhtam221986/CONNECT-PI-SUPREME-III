import Script from 'next/script' // Thêm dòng này

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        {/* Nạp SDK của Pi Network tại đây */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body style={{ backgroundColor: '#000', color: '#fff', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
