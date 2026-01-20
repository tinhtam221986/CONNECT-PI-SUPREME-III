"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'connected'>('idle');

  // --- MẠCH 1: KHỞI TẠO SDK NGAY KHI TRANG TẢI XONG ---
  const onPiScriptLoad = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      try {
        (window as any).Pi.init({ version: "2.0", sandbox: false });
        console.log("Mạch SDK đã sẵn sàng! 🚀");
      } catch (e) {
        console.error("Lỗi khởi tạo SDK:", e);
      }
    }
  };

  // --- MẠCH 2: XỬ LÝ ĐĂNG NHẬP (GỌI TRỰC TIẾP) ---
  const handleConnect = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      setStatus('loading');

      // Gọi lệnh xác thực ngay lập tức khi người dùng bấm
      Pi.authenticate(['username', 'payments'], (auth: any) => {
        const userData = {
          username: `@${auth.user.username}`,
          uid: auth.user.uid
        };
        setUser(userData);
        setStatus('connected');
        localStorage.setItem('pi_session_v4', JSON.stringify(userData));
      }, (err: any) => {
        console.error("Lỗi xác thực:", err);
        setStatus('idle');
        alert("Xác thực không thành công. Boss hãy thử bấm lại!");
      });
    } else {
      alert("Boss cần mở Link trong Pi Browser!");
    }
  };

  // Tự động khôi phục phiên cũ
  useEffect(() => {
    const saved = localStorage.getItem('pi_session_v4');
    if (saved) {
      setUser(JSON.parse(saved));
      setStatus('connected');
    }
  }, []);

  // --- GIAO DIỆN CỔNG ĐĂNG NHẬP ---
  if (status !== 'connected') {
    return (
      <>
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="afterInteractive" 
          onLoad={onPiScriptLoad}
        />
        <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div style={{ 
            width: '85px', height: '85px', backgroundColor: '#ffcc00', borderRadius: '25px', 
            marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '45px', fontWeight: 'bold', color: '#000', boxShadow: '0 0 30px rgba(255, 204, 0, 0.5)' 
          }}>π</div>
          
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', letterSpacing: '2px' }}>CONNECT-PI</h1>
          
          <div style={{ margin: '40px 0', textAlign: 'center' }}>
            <p style={{ color: status === 'loading' ? '#ffcc00' : '#888', fontSize: '14px', fontWeight: status === 'loading' ? 'bold' : 'normal' }}>
              {status === 'loading' ? 'ĐANG MỞ CỬA SỔ XÁC THỰC... ⏳' : 'Bấm nút dưới để kết nối với Pi Network'}
            </p>
          </div>

          <button 
            onClick={handleConnect}
            style={{ 
              width: '100%', maxWidth: '320px', padding: '20px', 
              backgroundColor: '#ffcc00', color: '#000', border: 'none', 
              borderRadius: '40px', fontWeight: '900', fontSize: '18px', 
              cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 204, 0, 0.3)'
            }}
          >
            {status === 'loading' ? 'VUI LÒNG ĐỢI...' : 'KẾT NỐI NGAY 🚀'}
          </button>
        </div>
      </>
    );
  }

  // --- MÀN HÌNH CHÍNH (SAU KHI HIỆN TÊN @tinhtam...) ---
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
       <div style={{ width: '110px', height: '110px', borderRadius: '50%', border: '4px solid #ffcc00', backgroundColor: '#111', marginBottom: '20px' }} />
       <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{user.username}</h2>
       <div style={{ marginTop: '20px', padding: '10px 25px', backgroundColor: 'rgba(255, 204, 0, 0.1)', border: '1px solid #ffcc00', borderRadius: '12px' }}>
          <span style={{ color: '#ffcc00', fontWeight: 'bold' }}>PI MASTER VERIFIED ✅</span>
       </div>
       
       <button 
         onClick={() => { localStorage.removeItem('pi_session_v4'); window.location.reload(); }}
         style={{ marginTop: '60px', color: '#444', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}
       >
         Thoát tài khoản
       </button>
    </div>
  );
}
