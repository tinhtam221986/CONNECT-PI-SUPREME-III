"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. CHỐT CHẶN CUỐI: Kiểm tra xem ID đã kẹt trong máy chưa
  useEffect(() => {
    const saved = localStorage.getItem('pi_id_final_boss');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuth = () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      // KHỞI CHẠY LẠI TỪ ĐẦU
      Pi.init({ version: "2.0", sandbox: false });

      Pi.authenticate(['username'], (auth: any) => {
        const userData = { username: auth.user.username, uid: auth.user.uid };
        localStorage.setItem('pi_id_final_boss', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      }, (err: any) => {
        console.error(err);
        // NẾU TREO, ÉP TRÌNH DUYỆT TẢI LẠI TOÀN BỘ SAU 2 GIÂY
        setTimeout(() => {
          window.location.reload(); 
        }, 2000);
      });
    } else {
      setLoading(false);
      alert("Hãy mở trong Pi Browser!");
    }
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ffcc00' }}>HỆ THỐNG ĐÃ THÔNG! 🚀</h2>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>@{user.username}</p>
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#444' }}>ID: {user.uid}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '40px' }}>CONNECT-PI v6.4</h1>
        
        <button 
          onClick={handleAuth}
          style={{ width: '100%', maxWidth: '300px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px' }}
        >
          {loading ? 'ĐANG PHÁ BĂNG...' : 'BẤM ĐỂ KẾT NỐI 🚀'}
        </button>

        {loading && (
          <p style={{ color: '#ffcc00', marginTop: '20px', textAlign: 'center' }}>
            Mạch đang bị kẹt. Nếu thấy bảng tím,<br/>hãy bấm **Allow** rồi đợi 3s để App tự Reload!
          </p>
        )}
      </div>
    </>
  );
}
