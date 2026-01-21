"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. CẢM BIẾN TỰ ĐỘNG: Kiểm tra ID liên tục mỗi giây nếu đang treo
  useEffect(() => {
    const checkID = setInterval(() => {
      const saved = localStorage.getItem('pi_final_v6_3');
      if (saved && !user) {
        setUser(JSON.parse(saved));
        setLoading(false);
        clearInterval(checkID);
      }
    }, 1000);
    return () => clearInterval(checkID);
  }, [user]);

  const handleAuth = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      setLoading(true);
      const Pi = (window as any).Pi;
      
      try {
        Pi.init({ version: "2.0", sandbox: false });

        Pi.authenticate(['username'], (auth: any) => {
          const userData = { 
            username: auth.user.username, 
            uid: auth.user.uid 
          };
          // GHI ĐÈ DỮ LIỆU VÀO BỘ NHỚ CỨNG CỦA TRÌNH DUYỆT
          localStorage.setItem('pi_final_v6_3', JSON.stringify(userData));
          setUser(userData);
          setLoading(false);
        }, (err: any) => {
          console.error(err);
          // NẾU LỖI, ÉP NÚT VÀNG HIỆN LẠI SAU 2 GIÂY
          setTimeout(() => setLoading(false), 2000);
        });

        // BỘ CỨU HỘ: Sau 5 giây nếu vẫn treo, tự động Refresh lại trạng thái nút
        setTimeout(() => {
          if (!user) setLoading(false);
        }, 5000);

      } catch (e) {
        setLoading(false);
      }
    } else {
      alert("Boss hãy mở trong Pi Browser nhé!");
    }
  };

  // --- MÀN HÌNH CHÀO MỪNG (KHI MẠCH ĐÃ THÔNG) ---
  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '40px', border: '4px solid #ffcc00', borderRadius: '40px', textAlign: 'center', boxShadow: '0 0 50px rgba(255,204,0,0.3)' }}>
          <h2 style={{ color: '#ffcc00', letterSpacing: '2px' }}>VẬN HÀNH THÀNH CÔNG ✅</h2>
          <p style={{ fontSize: '35px', fontWeight: '900', margin: '20px 0' }}>@{user.username}</p>
          <div style={{ padding: '15px', backgroundColor: '#ffcc00', color: '#000', borderRadius: '15px', fontWeight: 'bold' }}>
            CHÀO MỪNG BOSS TRỞ LẠI! 👑
          </div>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '40px', color: '#444', background: 'none', border: 'none', textDecoration: 'underline' }}>Đăng xuất</button>
      </div>
    );
  }

  // --- MÀN HÌNH ĐĂNG NHẬP ---
  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px', boxShadow: '0 0 30px #ffcc00' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', letterSpacing: '2px', marginBottom: '40px' }}>CONNECT-PI</h1>
        
        <button 
          onClick={handleAuth}
          style={{ 
            width: '100%', maxWidth: '320px', padding: '20px', 
            backgroundColor: loading ? '#222' : '#ffcc00', 
            color: loading ? '#555' : '#000', 
            border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px',
            boxShadow: loading ? 'none' : '0 10px 20px rgba(255,204,0,0.2)'
          }}
          disabled={loading}
        >
          {loading ? 'ĐANG ĐỌC DỮ LIỆU...' : 'KẾT NỐI NGAY 🚀'}
        </button>

        {loading && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '18px' }}>MẠCH ĐANG THÔNG!</p>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '10px', lineHeight: '1.5' }}>
              Nếu bảng tím đã đóng mà vẫn treo,<br/>
              Boss hãy đợi 5 giây rồi **BẤM LẠI NÚT VÀNG** nhé!<br/>
              (Lần 2 sẽ kích nổ ID ngay lập tức)
            </p>
          </div>
        )}
      </div>
    </>
  );
}
  
