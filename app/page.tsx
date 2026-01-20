"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'connected'>('idle');

  // 1. Khởi tạo mạch khi Script tải xong
  const initPi = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      try {
        (window as any).Pi.init({ version: "2.0", sandbox: false });
        console.log("Mạch Pi sẵn sàng!");
      } catch (e) { console.error("Pi Init Error", e); }
    }
  };

  // 2. Hàm kết nối chính (Có bộ cứu hộ 5 giây)
  const handleConnect = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      setStatus('loading');
      const Pi = (window as any).Pi;

      // Bộ cứu hộ: Nếu 5s không phản hồi, cho phép bấm lại
      const rescueTimer = setTimeout(() => {
        if (status === 'loading') {
          setStatus('idle');
          alert("Mạch Pi phản hồi chậm, Boss hãy thử bấm lại lần nữa nhé!");
        }
      }, 5000);

      try {
        Pi.authenticate(['username', 'payments'], (auth: any) => {
          clearTimeout(rescueTimer);
          const userData = {
            username: `@${auth.user.username}`,
            uid: auth.user.uid
          };
          setUser(userData);
          setStatus('connected');
          localStorage.setItem('pi_session_final', JSON.stringify(userData));
        }, (err: any) => {
          clearTimeout(rescueTimer);
          console.error(err);
          setStatus('idle');
        });
      } catch (e) {
        clearTimeout(rescueTimer);
        setStatus('idle');
      }
    } else {
      alert("Hãy mở ứng dụng trong Pi Browser!");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('pi_session_final');
    if (saved) {
      setUser(JSON.parse(saved));
      setStatus('connected');
    }
  }, []);

  // GIAO DIỆN CHUẨN CỦA BOSS
  if (status !== 'connected') {
    return (
      <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" onLoad={initPi} />
        <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', color: '#fff' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bold', color: '#000', marginBottom: '30px' }}>π</div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>CONNECT-PI</h1>
          <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', marginBottom: '40px' }}>
            {status === 'loading' ? 'ĐANG KẾT NỐI VỚI PI BROWSER...' : 'Vui lòng xác thực danh tính để vào hệ thống'}
          </p>
          
          <button 
            onClick={handleConnect}
            disabled={status === 'loading'}
            style={{ width: '100%', maxWidth: '300px', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
          >
            {status === 'loading' ? 'VUI LÒNG ĐỢI...' : 'KẾT NỐI PI NETWORK 🚀'}
          </button>
        </div>
      </>
    );
  }

  // MÀN HÌNH SAU KHI THÔNG MẠCH (SẼ HIỆN @TINHTAM...)
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #ffcc00', backgroundColor: '#222', marginBottom: '20px' }} />
       <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Tinh Tâm Pi Master</h2>
       <p style={{ color: '#ffcc00', fontSize: '18px' }}>{user.username}</p>
       <div style={{ marginTop: '30px', padding: '10px 20px', border: '1px solid #00ff00', color: '#00ff00', borderRadius: '10px' }}>
         Verified Account ✅
       </div>
       <button onClick={() => { localStorage.removeItem('pi_session_final'); window.location.reload(); }} style={{ marginTop: '50px', color: '#444', background: 'none', border: 'none', textDecoration: 'underline' }}>Thoát</button>
    </div>
  );
       }
