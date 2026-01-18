import React from 'react';
export const metadata = {
  title: 'CONNECT PI - SUPREME',
  description: 'Hệ sinh thái Web3 tối thượng trên Pi Network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0, backgroundColor: 'black', color: 'white' }}>
        {/* Đây là nơi chứa toàn bộ nội dung của các trang page.tsx */}
        {children}
      </body>
    </html>
  );
}
