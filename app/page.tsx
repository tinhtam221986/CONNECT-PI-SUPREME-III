"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    // Tự động kiểm tra mỗi khi load trang
    if ((window as any).Pi) {
      (window as any).Pi.init({ version: "2.0", sandbox: false });
    }
    
    // Hiện nút Thử lại sau 7 giây nếu bị treo
    const timer = setTimeout(() => {
      if (loading) setRetry(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleAuth = () => {
    setLoading(true);
    setRetry(false);

    const Pi = (window as any).Pi;
    if (!Pi) {
      alert("SDK chưa nạp xong!");
      setLoading(false);
      return;
    }

    Pi.authenticate(['username'], (auth: any) => {
      setUser({ username: auth.user.username, uid: auth.user.uid });
      setLoading(false);
    }, (err: any) => {
      console.error(err);
      setLoading(false);
      // Nếu lỗi, thử reset trang
      if (confirm("Mạch vẫn kẹt, Boss có muốn nạp lại trang không?")) {
        window.location.reload();
      }
    });
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#ffcc00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900' }}>KẾT NỐI THÀNH CÔNG! ✅</h1>
          <p style={{ fontSize: '32px', fontWeight: '900', color: '#fff', margin: '20px 0' }}>@{user.username}</p>
          <p style={{ color: '#444' }}>UID: {user.uid}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px' }}>π</div>
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '900', marginBottom: '10px' }}>CONNECT-PI v7.1</h1>
      
      <button 
        onClick={handleAuth}
        style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px' }}
      >
        {loading ? 'ĐANG PHÁ BĂNG...' : 'KẾT NỐI NGAY 🚀'}
      </button>

      {loading && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#ffcc00', fontSize: '14px' }}>Mạch đang quét tín hiệu...</p>
          {retry && (
            <button 
              onClick={() => window.location.reload()}
              style={{ marginTop: '15px', background: 'none', border: '1px solid #ffcc00', color: '#ffcc00', padding: '10px 20px', borderRadius: '10px' }}
            >
              BẤM VÀO ĐÂY ĐỂ TẢI LẠI MẠCH 🔄
            </button>
          )}
        </div>
      )}
    </div>
  );
}
