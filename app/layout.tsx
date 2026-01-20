import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Connect-Pi Supreme",
  description: "The Supreme Web3 Ecosystem on Pi Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Nạp SDK của Pi Network trước khi ứng dụng chạy */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#000', 
        color: '#fff',
        fontFamily: 'sans-serif' 
      }}>
        {children}
      </body>
    </html>
  );
}
