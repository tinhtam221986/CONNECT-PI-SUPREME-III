"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initPi = () => {
      if ((window as any).Pi) {
        (window as any).Pi.init({ version: "2.0", sandbox: false });
      }
    };
    initPi();
    setTimeout(initPi, 1000); // Thử lại lần 2 cho chắc chắn
  }, []);

  const handleAuth = () => {
    setLoading(true);
    const Pi = (window as any).Pi;
    
    if (!Pi) {
      alert("Đang nạp tín hiệu Pi... Boss đợi 2 giây rồi bấm lại!");
      setLoading(false);
      return;
    }

    Pi.authenticate(['username'], (auth: any) => {
      setUser({ username: auth.user.username, uid: auth.user.uid });
      setLoading(false);
    }, (err: any) => {
      console.error(err);
      setLoading(false);
      // CHIÊU CUỐI: Nếu kẹt, ép tải lại trang để nhận ID
      window.location.reload();
    });
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#ffcc00' }}>SUCCESS! ✅</h1>
          <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff' }}>@{user.username}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bold', marginBottom: '30px' }}>π</div>
      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '40px' }}>CONNECT-PI v7.2</h1>
      
      <button 
        onClick={handleAuth}
        style={{ width: '100%', maxWidth: '300px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '18px' }}
      >
        {loading ? 'ĐANG THÔNG MẠCH...' : 'KẾT NỐI NGAY 🚀'}
      </button>

      {loading && (
        <p style={{ color: '#ffcc00', marginTop: '20px', textAlign: 'center' }}>
          Boss hãy bấm **Allow** (nếu hiện bảng tím)<br/>rồi chờ mạch tự nhảy nhé!
        </p>
      )}
    </div>
  );
}
