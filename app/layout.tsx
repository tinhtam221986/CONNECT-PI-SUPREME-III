import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CONNECT-PI-SUPREME",
  description: "Supreme Ecosystem for Pi Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Nạp SDK Pi Network chính thức */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
