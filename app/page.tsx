"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. TỰ ĐỘNG KHÔI PHỤC KẾT NỐI
  useEffect(() => {
    const saved = localStorage.getItem('pi_id_v6_2');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 2. HÀM KẾT NỐI SIÊU TỐC (CƠ CHẾ PHÁ BĂNG)
  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      try {
        // Khởi tạo (ép buộc không dùng sandbox để thông mạch)
        await Pi.init({ version: "2.0", sandbox: false });

        // Dùng Promise để ép App không được đứng im
        const authPromise = new Promise((resolve, reject) => {
          Pi.authenticate(['username'], (auth: any) => resolve(auth), (err: any) => reject(err));
        });

        const auth: any = await authPromise;
        const userData = { username: auth.user.username, uid: auth.user.uid };
        
        localStorage.setItem('pi_id_v6_2', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        // TỰ ĐỘNG LOAD LẠI MẠCH NẾU TREO
        alert("Mạch vừa được Reset, Boss hãy bấm nút vàng một lần nữa nhé!");
      }
    } else {
      setLoading(false);
      alert("Hãy mở trong Pi Browser!");
    }
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ padding: '40px', border: '3px solid #ffcc00', borderRadius: '30px', textAlign: 'center', backgroundColor: '#111' }}>
          <h2 style={{ color: '#ffcc00' }}>VẬN HÀNH THÀNH CÔNG! ✅</h2>
          <p style={{ fontSize: '30px', fontWeight: 'bold', margin: '20px 0' }}>@{user.username}</p>
          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#ffcc00', color: '#000', borderRadius: '15px', fontWeight: 'bold' }}>CHÀO MÀNG BOSS TRỞ LẠI 👑</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px', boxShadow: '0 0 30px #ffcc00' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', letterSpacing: '2px', marginBottom: '40px' }}>CONNECT-PI</h1>
        
        <button 
          onClick={handleAuth}
          style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px', cursor: 'pointer' }}
        >
          {loading ? 'ĐANG KÍCH HOẠT...' : 'ĐĂNG NHẬP PI NETWORK 🚀'}
        </button>

        {loading && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p style={{ color: '#ffcc00', fontWeight: 'bold' }}>MẠCH ĐANG THÔNG!</p>
            <p style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>Nếu Boss đã bấm Allow mà vẫn treo,<br/>hãy đợi 3 giây rồi **BẤM NÚT LẦN 2** nhé!</p>
          </div>
        )}
      </div>
    </>
  );
}
