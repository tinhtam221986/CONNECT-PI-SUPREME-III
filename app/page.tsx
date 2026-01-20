"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; // Đảm bảo Boss có file này

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'feed' | 'profile'>('feed');

  // 1. KIỂM TRA PHIÊN ĐĂNG NHẬP (Lối vào tắt)
  useEffect(() => {
    const saved = localStorage.getItem('pi_id_final');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleAuth = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      setLoading(true);
      const Pi = (window as any).Pi;
      
      Pi.authenticate(['username'], (auth: any) => {
        const userData = { username: auth.user.username, uid: auth.user.uid };
        // LỆNH MỞ CỬA CƯỠNG CHẾ
        localStorage.setItem('pi_id_final', JSON.stringify(userData));
        setUser(userData); 
        setLoading(false);
      }, (err: any) => {
        console.error(err);
        setLoading(false);
        alert("Boss hãy thử bấm lại hoặc tải lại trang!");
      });
    } else {
      alert("Mở trong Pi Browser, Boss nhé!");
    }
  };

  // --- MÀN HÌNH 1: CỔNG ĐĂNG NHẬP (NẾU CHƯA CÓ ID) ---
  if (!user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>π</div>
        <h1 style={{ marginBottom: '40px' }}>CONNECT-PI</h1>
        <button 
          onClick={handleAuth}
          style={{ width: '280px', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? 'ĐANG MỞ CỬA...' : 'XÁC THỰC VÀO APP 🚀'}
        </button>
      </div>
    );
  }

  // --- MÀN HÌNH 2: GIAO DIỆN BÊN TRONG (KHI ĐÃ CÓ ID) ---
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {view === 'feed' && (
        <>
          {/* Video nền */}
          <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />
          
          {/* Nút chức năng bên phải */}
          <div style={{ position: 'absolute', right: '15px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '25px', zIndex: 10 }}>
            <SupremeIcon name="heart" size={35} />
            <SupremeIcon name="comment" size={35} />
            <div onClick={() => setView('profile')} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #ffcc00', overflow: 'hidden', backgroundColor: '#222' }} />
          </div>

          {/* Thông tin ID Boss ở góc trái */}
          <div style={{ position: 'absolute', bottom: '100px', left: '15px', zIndex: 10 }}>
            <p style={{ fontWeight: 'bold', fontSize: '18px', textShadow: '0 2px 4px #000' }}>@{user.username}</p>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Hệ sinh thái Pi Supreme 💎</p>
          </div>
        </>
      )}

      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 100, padding: '60px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '30px' }}>← Quay lại</div>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #ffcc00', margin: '0 auto', backgroundColor: '#222' }} />
          <h2 style={{ fontSize: '24px', marginTop: '20px' }}>@{user.username}</h2>
          <p style={{ color: '#ffcc00' }}>UID: {user.uid}</p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ marginTop: '100px', color: '#ff4444', background: 'none', border: '1px solid #ff4444', padding: '10px 20px', borderRadius: '20px' }}
          >
            Đăng xuất
          </button>
        </div>
      )}

      {/* THANH ĐIỀU HƯỚNG ĐÁY */}
      <div style={{ position: 'fixed', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ display: 'flex', gap: '50px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '15px 40px', borderRadius: '40px', border: '1px solid #333', backdropFilter: 'blur(10px)' }}>
          <SupremeIcon name="home" size={24} color={view === 'feed' ? '#ffcc00' : '#fff'} />
          <SupremeIcon name="cart" size={24} />
          <SupremeIcon name="mail" size={24} />
        </div>
      </div>
    </div>
  );
            }

