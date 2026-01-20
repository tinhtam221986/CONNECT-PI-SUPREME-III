"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";
import { SupremeIcon } from './SupremeIcons';

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'feed' | 'profile'>('feed');

  // 1. KHỞI TẠO SDK NGAY KHI TRANG TẢI (Đây là chìa khóa)
  const initPi = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      (window as any).Pi.init({ version: "2.0", sandbox: false });
    }
  };

  // 2. TỰ ĐỘNG NHẬN DIỆN NẾU ĐÃ ĐĂNG NHẬP
  useEffect(() => {
    const saved = localStorage.getItem('pi_verified_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 3. HÀM ĐĂNG NHẬP NGUYÊN BẢN
  const handleAuth = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      Pi.authenticate(['username'], (auth: any) => {
        const userData = { username: auth.user.username, uid: auth.user.uid };
        setUser(userData);
        localStorage.setItem('pi_verified_user', JSON.stringify(userData));
      }, (err: any) => {
        alert("Boss hãy bấm Allow để vào App!");
      });
    }
  };

  // --- NẾU CHƯA CÓ ID: HIỆN CỔNG ĐĂNG NHẬP ---
  if (!user) {
    return (
      <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" onLoad={initPi} />
        <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#000', fontWeight: 'bold', marginBottom: '30px' }}>π</div>
          <h1 style={{ marginBottom: '40px', fontWeight: '900' }}>CONNECT-PI</h1>
          <button 
            onClick={handleAuth}
            style={{ width: '280px', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}
          >
            ĐĂNG NHẬP PI NETWORK 🚀
          </button>
        </div>
      </>
    );
  }

  // --- NẾU ĐÃ CÓ ID: VÀO THẲNG GIAO DIỆN CHÍNH ---
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      {view === 'feed' ? (
        <>
          <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />
          <div style={{ position: 'absolute', right: '15px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '25px', zIndex: 10 }}>
            <SupremeIcon name="heart" size={35} />
            <SupremeIcon name="comment" size={35} />
            <div onClick={() => setView('profile')} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #ffcc00', backgroundColor: '#222' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '100px', left: '15px', zIndex: 10 }}>
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>@{user.username}</p>
          </div>
        </>
      ) : (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 onClick={() => setView('feed')}>← QUAY LẠI</h2>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #ffcc00', margin: '30px auto' }} />
          <p style={{ fontSize: '24px' }}>@{user.username}</p>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '50px', color: '#ff4444' }}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
}
