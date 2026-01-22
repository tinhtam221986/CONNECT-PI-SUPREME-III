"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Tự động kiểm tra nếu đã đăng nhập trước đó
    const saved = localStorage.getItem('pi_user_final');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const Pi = (window as any).Pi;
      if (!Pi) {
        alert("SDK chưa tải xong, Boss đợi 2 giây rồi bấm lại nhé!");
        setLoading(false);
        return;
      }

      await Pi.init({ version: "2.0", sandbox: false });
      
      Pi.authenticate(['username'], (auth: any) => {
        const userData = { username: auth.user.username, uid: auth.user.uid };
        localStorage.setItem('pi_user_final', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      }, (err: any) => {
        console.error(err);
        setLoading(false);
        // THỦ THUẬT: Nếu treo, ép trình duyệt mở lại cổng xác thực
        window.location.href = window.location.href; 
      });
    } catch (e) {
      setLoading(false);
      window.location.reload();
    }
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#ffcc00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '40px' }}>SUCCESS! ✅</h1>
        <p style={{ fontSize: '25px', color: '#fff' }}>Chào Boss: @{user.username}</p>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '20px', color: '#444' }}>Thoát</button>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bold', marginBottom: '20px' }}>π</div>
      <h2 style={{ color: '#fff', marginBottom: '30px' }}>CONNECT-PI v6.7</h2>
      <button 
        onClick={handleAuth}
        style={{ width: '280px', padding: '20px', backgroundColor: '#ffcc00', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '18px' }}
      >
        {loading ? 'ĐANG THÔNG MẠCH...' : 'KẾT NỐI NGAY 🚀'}
      </button>
    </div>
  );
}
