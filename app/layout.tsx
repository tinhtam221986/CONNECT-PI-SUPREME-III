import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
        {/* Nạp SDK Pi Network chuẩn nhất cho Next.js 14 */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
