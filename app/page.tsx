"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. CƠ CHẾ QUÉT NGẦM: Tự động đăng nhập nếu Pi đã cấp quyền trước đó
  useEffect(() => {
    const autoLogin = () => {
      if ((window as any).Pi) {
        const Pi = (window as any).Pi;
        Pi.init({ version: "2.0", sandbox: false });
        
        // Thử lấy ID mà không cần đợi bấm nút
        Pi.authenticate(['username'], (auth: any) => {
          setUser({ username: auth.user.username, uid: auth.user.uid });
          setLoading(false);
        }, (err: any) => console.log("Chưa có phiên làm việc cũ"));
      }
    };
    
    // Quét ngay khi mở và quét lại sau 3 giây
    autoLogin();
    const timer = setTimeout(autoLogin, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuth = () => {
    if (loading) return;
    setLoading(true);

    if ((window as any).Pi) {
      const Pi = (window as any).Pi;
      Pi.authenticate(['username'], (auth: any) => {
        setUser({ username: auth.user.username, uid: auth.user.uid });
        setLoading(false);
      }, (err: any) => {
        setLoading(false);
        alert("Boss hãy thử làm mới trang (Refresh) rồi bấm lại nhé!");
      });
    }
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ffcc00', fontSize: '24px' }}>ĐÃ THÔNG MẠCH! ✅</h2>
          <p style={{ fontSize: '35px', fontWeight: '900', color: '#fff', margin: '20px 0' }}>@{user.username}</p>
          <div style={{ padding: '15px', backgroundColor: '#ffcc00', color: '#000', borderRadius: '15px', fontWeight: 'bold' }}>CHÀO MỪNG BOSS ĐẾN VỚI SUPREME</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px', boxShadow: '0 0 30px #ffcc00' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>CONNECT-PI</h1>
        <p style={{ color: '#444', fontSize: '12px', marginBottom: '40px' }}>VERSION 6.6 - AUTO-DETECTION</p>
        
        <button 
          onClick={handleAuth}
          style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px' }}
        >
          {loading ? 'ĐANG ĐỢI XÁC THỰC...' : 'KẾT NỐI NGAY 🚀'}
        </button>

        {loading && (
          <p style={{ color: '#ffcc00', marginTop: '30px', textAlign: 'center', fontSize: '14px', lineHeight: '1.6' }}>
            MẠCH ĐANG TREO?<br/>
            👉 Boss hãy **Refresh (Tải lại trang)**<br/>
            bằng menu của Pi Browser nhé!
          </p>
        )}
      </div>
    </>
  );
}

