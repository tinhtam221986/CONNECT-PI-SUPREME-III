"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. Tự động kiểm tra bộ nhớ khi vừa mở App
  useEffect(() => {
    const saved = localStorage.getItem('pi_verified_id');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // 2. Hàm kích hoạt xác thực
  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      try {
        // Khởi tạo SDK
        Pi.init({ version: "2.0", sandbox: false });

        // Gọi xác thực ID
        Pi.authenticate(['username'], (auth: any) => {
          // KHI BOSS BẤM ALLOW, ĐOẠN NÀY PHẢI CHẠY NGAY:
          const userData = { 
            username: auth.user.username, 
            uid: auth.user.uid 
          };
          
          // LƯU VÀO BỘ NHỚ VÀ CẬP NHẬT MÀN HÌNH
          localStorage.setItem('pi_verified_id', JSON.stringify(userData));
          setUser(userData); 
          setLoading(false);
          console.log("Đã thông mạch!");
        }, (err: any) => {
          console.error(err);
          setLoading(false);
          alert("Mạch bận, Boss hãy thử lại!");
        });
      } catch (e) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("Hãy mở App trong Pi Browser!");
    }
  };

  // --- GIAO DIỆN SAU KHI ĐĂNG NHẬP THÀNH CÔNG ---
  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '40px', border: '3px solid #ffcc00', borderRadius: '30px', textAlign: 'center', backgroundColor: '#111' }}>
          <h2 style={{ color: '#ffcc00', marginBottom: '20px' }}>XÁC THỰC THÀNH CÔNG ✅</h2>
          <p style={{ fontSize: '30px', fontWeight: 'bold' }}>@{user.username}</p>
          <p style={{ color: '#444', marginTop: '10px' }}>ID: {user.uid}</p>
          
          <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#ffcc00', color: '#000', borderRadius: '15px', fontWeight: 'bold' }}>
            CHÀO MỪNG BOSS ĐẾN VỚI SUPREME 💎
          </div>
        </div>
        
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '50px', color: '#666', background: 'none', border: 'none', textDecoration: 'underline' }}>
          Đăng xuất
        </button>
      </div>
    );
  }

  // --- GIAO DIỆN ĐĂNG NHẬP (ẢNH BOSS GỬI) ---
  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px', boxShadow: '0 0 30px #ffcc00' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', letterSpacing: '2px', marginBottom: '40px' }}>CONNECT-PI</h1>
        
        <button 
          onClick={handleAuth}
          disabled={loading}
          style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', transition: '0.3s' }}
        >
          {loading ? 'ĐANG LẤY ID...' : 'ĐĂNG NHẬP PI NETWORK 🚀'}
        </button>

        {loading && (
          <p style={{ color: '#ffcc00', marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            MẠCH ĐANG KẾT NỐI...<br/>Boss hãy đợi 3-5 giây nhé!
          </p>
        )}
      </div>
    </>
  );
}
