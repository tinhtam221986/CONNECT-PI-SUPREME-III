"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'connected'>('idle');

  // --- HÀM KẾT NỐI CHÍNH ---
  const handleConnect = async () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      setStatus('loading');
      try {
        const Pi = (window as any).Pi;
        
        // 1. Khởi tạo (Bắt buộc)
        Pi.init({ version: "2.0", sandbox: false });
        
        // 2. Xác thực và hứng dữ liệu (@tinhtam221986)
        Pi.authenticate(['username', 'payments'], (auth: any) => {
          // Khi Boss bấm "Allow", đoạn code này sẽ chạy:
          const userData = {
            username: `@${auth.user.username}`,
            uid: auth.user.uid
          };
          setUser(userData);
          setStatus('connected');
          localStorage.setItem('pi_user_session', JSON.stringify(userData));
          console.log("Xác thực thành công:", userData);
        }, (err: any) => {
          console.error(err);
          setStatus('idle');
          alert("Boss chưa xác thực thành công. Vui lòng thử lại!");
        });
      } catch (e) {
        setStatus('idle');
        alert("Mạch Pi đang bận, Boss đợi xíu rồi bấm lại nhé!");
      }
    } else {
      alert("Boss cần mở trong Pi Browser để kích hoạt mạch máu!");
    }
  };

  // Tự động nhận diện nếu đã đăng nhập trước đó
  useEffect(() => {
    const saved = localStorage.getItem('pi_user_session');
    if (saved) {
      setUser(JSON.parse(saved));
      setStatus('connected');
    }
  }, []);

  // MÀN HÌNH CHỜ / ĐĂNG NHẬP
  if (status !== 'connected') {
    return (
      <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
        <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div style={{ width: '85px', height: '85px', backgroundColor: '#ffcc00', borderRadius: '22px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '45px', fontWeight: 'bold', color: '#000', boxShadow: '0 0 20px #ffcc00' }}>π</div>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', letterSpacing: '2px' }}>CONNECT-PI</h1>
          
          <div style={{ margin: '40px 0', textAlign: 'center' }}>
            {status === 'loading' ? (
               <p style={{ color: '#ffcc00', fontWeight: 'bold' }}>ĐANG KẾT NỐI MẠCH MÁU... ⚡</p>
            ) : (
               <p style={{ color: '#888', fontSize: '14px' }}>Vui lòng xác thực danh tính qua Pi Network<br/>để kết nối mạch máu dữ liệu thật.</p>
            )}
          </div>

          <button 
            onClick={handleConnect}
            disabled={status === 'loading'}
            style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: status === 'loading' ? '#444' : '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}
          >
            {status === 'loading' ? 'ĐANG XỬ LÝ...' : 'KẾT NỐI PI NETWORK 🚀'}
          </button>
        </div>
      </>
    );
  }

  // MÀN HÌNH CHÍNH SAU KHI ĐĂNG NHẬP THÀNH CÔNG
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #ffcc00', backgroundColor: '#222', marginBottom: '20px' }} />
       <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Tinh Tâm Pi Master</h2>
       <p style={{ color: '#ffcc00', fontSize: '18px', marginTop: '10px' }}>{user.username}</p>
       <div style={{ marginTop: '30px', padding: '15px 30px', backgroundColor: 'rgba(0,255,0,0.1)', border: '1px solid #00ff00', borderRadius: '10px' }}>
          <span style={{ color: '#00ff00' }}>Trạng thái: Verified ✅</span>
       </div>
       <button 
         onClick={() => { localStorage.removeItem('pi_user_session'); window.location.reload(); }}
         style={{ marginTop: '50px', color: '#666', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
       >
         Đăng xuất
       </button>
    </div>
  );
      }
