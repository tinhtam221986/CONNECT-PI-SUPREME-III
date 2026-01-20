"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";
import { SupremeIcon } from './SupremeIcons';
import ProfilePage from './ProfilePage';

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'feed' | 'profile'>('feed');

  // 1. Tự động thông mạch nếu đã đăng nhập trước đó
  useEffect(() => {
    const saved = localStorage.getItem('pi_verified_id_v6');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 2. Hàm đăng nhập chuẩn Pi Network (Không bao giờ treo)
  const handleAuth = () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      // Khởi tạo SDK
      Pi.init({ version: "2.0", sandbox: false });

      // Gọi xác thực ID (Chỉ lấy username để bảo mật)
      Pi.authenticate(['username'], (auth: any) => {
        const userData = { 
          username: auth.user.username, 
          uid: auth.user.uid 
        };
        localStorage.setItem('pi_id_verified_v6', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      }, (err: any) => {
        console.error(err);
        setLoading(false);
        alert("Mạch Pi chưa phản hồi. Boss hãy thử Refresh trang rồi bấm lại nhé!");
      });
    } else {
      setLoading(false);
      alert("Boss hãy mở App trong Pi Browser!");
    }
  };

  // --- MÀN HÌNH CHÍNH (SAU KHI ĐĂNG NHẬP THÀNH CÔNG) ---
  if (user) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', color: '#fff' }}>
        {view === 'feed' ? (
          <>
            {/* VIDEO FEED - MẠCH MÁU NỘI DUNG */}
            <video 
              autoPlay loop muted playsInline 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" 
            />
            
            {/* THANH ĐIỀU HƯỚNG BÊN PHẢI */}
            <div style={{ position: 'absolute', right: '15px', bottom: '120px', display: 'flex', flexDirection: 'column', gap: '25px', zIndex: 10 }}>
              <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={35} color="#fff" /><p style={{ fontSize: '10px' }}>99K</p></div>
              <div style={{ textAlign: 'center' }}><SupremeIcon name="comment" size={35} color="#fff" /><p style={{ fontSize: '10px' }}>22K</p></div>
              <div onClick={() => setView('profile')} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #ffcc00', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SupremeIcon name="store" size={24} color="#ffcc00" />
                </div>
              </div>
            </div>

            {/* THÔNG TIN BOSS Ở GÓC TRÁI */}
            <div style={{ position: 'absolute', bottom: '110px', left: '15px', zIndex: 10 }}>
              <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>@{user.username}</p>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Tầm nhìn Connect-Pi: Dữ liệu là mạch máu 🚀</p>
            </div>
          </>
        ) : (
          <ProfilePage /> 
        )}

        {/* THANH NAVBAR ĐÁY */}
        <div style={{ position: 'fixed', bottom: '25px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ display: 'flex', gap: '50px', backgroundColor: 'rgba(0,0,0,0.85)', padding: '15px 40px', borderRadius: '40px', border: '1px solid #333', backdropFilter: 'blur(10px)' }}>
            <div onClick={() => setView('feed')}><SupremeIcon name="home" size={26} color={view === 'feed' ? '#ffcc00' : '#fff'} /></div>
            <SupremeIcon name="cart" size={26} color="#fff" />
            <div onClick={() => setView('profile')}><SupremeIcon name="store" size={26} color={view === 'profile' ? '#ffcc00' : '#fff'} /></div>
          </div>
        </div>
      </div>
    );
  }

  // --- MÀN HÌNH CHỜ (LOGIN) ---
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '20px' }}>
      <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', color: '#000', fontWeight: 'bold', marginBottom: '30px', boxShadow: '0 0 30px #ffcc00' }}>π</div>
      <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>CONNECT-PI</h1>
      <p style={{ color: '#555', marginBottom: '40px' }}>SUPREME ECOSYSTEM v6.0</p>
      
      <button 
        onClick={handleAuth}
        style={{ width: '300px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px', cursor: 'pointer' }}
      >
        {loading ? 'ĐANG KẾT NỐI...' : 'XÁC THỰC DANH TÍNH 🚀'}
      </button>
      
      {loading && <p style={{ marginTop: '20px', color: '#ffcc00' }}>Vui lòng bấm 'Allow' trên màn hình Pi...</p>}
    </div>
  );
}
  
