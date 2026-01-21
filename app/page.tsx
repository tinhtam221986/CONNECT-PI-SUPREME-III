"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("SẴN SÀNG KẾT NỐI");

  // KHỞI TẠO SDK NGAY KHI MỞ APP (KHÔNG ĐỢI BẤM NÚT)
  useEffect(() => {
    const initPi = () => {
      if ((window as any).Pi) {
        (window as any).Pi.init({ version: "2.0", sandbox: false });
        console.log("Mạch Pi đã mở!");
      }
    };
    initPi();
    // Thử lại sau 2s nếu SDK chưa load kịp
    const timer = setTimeout(initPi, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuth = () => {
    if (!(window as any).Pi) return alert("Hãy mở trong Pi Browser!");
    
    setLoading(true);
    setStatus("ĐANG ĐỢI BOSS BẤM 'ALLOW'...");

    (window as any).Pi.authenticate(['username'], (auth: any) => {
      // NẾU NHẬN ĐƯỢC AUTH, CHO VÀO THẲNG KHÔNG CẦN LƯU LOCALSTORAGE
      setUser({ username: auth.user.username, uid: auth.user.uid });
      setLoading(false);
    }, (err: any) => {
      console.error(err);
      setLoading(false);
      setStatus("MẠCH BỊ CHẶN - HÃY THỬ LẠI");
      alert("Lỗi: " + JSON.stringify(err));
    });
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center', boxShadow: '0 0 40px #ffcc00' }}>
          <h2 style={{ color: '#ffcc00', fontSize: '20px' }}>KẾT NỐI THÀNH CÔNG! 💎</h2>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: '20px 0' }}>@{user.username}</p>
          <p style={{ color: '#444' }}>ID: {user.uid}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>CONNECT-PI</h1>
        <p style={{ color: '#ffcc00', fontSize: '12px', marginBottom: '40px', fontWeight: 'bold' }}>VERSION 6.5 - ULTIMATE FIX</p>
        
        <button 
          onClick={handleAuth}
          disabled={loading}
          style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: loading ? '#222' : '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px', cursor: 'pointer' }}
        >
          {loading ? 'ĐANG KẾT NỐI...' : 'BẤM ĐỂ XÁC THỰC 🚀'}
        </button>

        <p style={{ color: '#555', marginTop: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
          TRẠNG THÁI: <span style={{ color: '#ffcc00' }}>{status}</span>
        </p>
      </div>
    </>
  );
}

