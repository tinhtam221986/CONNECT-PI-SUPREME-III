"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [piUser, setPiUser] = useState<{username: string, uid: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1. MẠCH KHỞI TẠO VÀ LẤY DỮ LIỆU THẬT (ĐÃ KHÔI PHỤC) ---
  useEffect(() => {
    const connectPi = async () => {
      if (typeof window !== 'undefined' && (window as any).Pi) {
        try {
          // Khởi tạo SDK
          (window as any).Pi.init({ version: "2.0", sandbox: false });
          
          // Kiểm tra xem đã có session cũ chưa để vào thẳng
          const savedUser = localStorage.getItem('pi_username');
          if (savedUser) {
            setPiUser({ username: savedUser, uid: "session_active" });
            setIsAuthorized(true);
          }
        } catch (e) { console.error("SDK Init Error", e); }
      }
    };
    connectPi();
  }, []);

  // --- 2. LOGIC ĐĂNG NHẬP THẬT (KHÔNG CƯỠNG BỨC) ---
  const handleLogin = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      (window as any).Pi.authenticate(['username', 'payments'], (auth: any) => {
        const username = `@${auth.user.username}`;
        setPiUser({ username, uid: auth.user.uid });
        localStorage.setItem('pi_username', username);
        setIsAuthorized(true);
      }, (err: any) => alert("Xác thực thất bại: " + err.message));
    } else {
      alert("Hãy mở App trong Pi Browser để kết nối dữ liệu thật!");
    }
  };

  // --- 3. GIAO DIỆN CỔNG ĐĂNG NHẬP (GATE) ---
  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', marginBottom: '20px' }} />
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>CONNECT-PI</h1>
        <p style={{ color: '#888', fontSize: '12px', textAlign: 'center', margin: '20px 0' }}>Đồng ý điều khoản và kết nối danh tính Pi Network của bạn.</p>
        <button onClick={handleLogin} style={{ width: '100%', maxWidth: '300px', padding: '15px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>ĐĂNG NHẬP PI NETWORK</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 4. FEED VIDEO LAYER */}
      {view === 'feed' && (
        <>
          <video autoPlay loop muted={isMuted} playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />

          {/* CỘT PHẢI: CHUẨN VỊ TRÍ + NÂNG NÚT V #5 CAO 50PX */}
          <div style={{ position: 'absolute', right: '10px', bottom: '50px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 90 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}><SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} /></div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            <div onClick={() => setIsMuted(!isMuted)} style={{ cursor: 'pointer' }}><SupremeIcon name="volume" size={28} flip color={isMuted ? "#ff4444" : "#fff"} /></div>
            <div onClick={(e) => { e.stopPropagation(); setIsNavVisible(!isNavVisible); }} style={{ cursor: 'pointer', padding: '10px' }}><SupremeIcon name="chevron" size={28} color="#ffcc00" /></div>
          </div>

          {/* THÔNG TIN TRÁI: FIX NÚT FOLLOW + GIỚI HẠN 15 KÝ TỰ */}
          <div style={{ position: 'absolute', bottom: '70px', left: '12px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SupremeIcon name="store" size={28} color="#ffcc00" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{piUser?.username}</div>
                <div style={{ fontSize: '10px', color: '#ff4444', border: '1px solid #ff4444', padding: '1px 8px', borderRadius: '3px', marginTop: '4px', fontWeight: 'bold', display: 'inline-block' }}>FOLLOW</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>{"Connect-Pi Master".slice(0, 15)}</p>
          </div>
        </>
      )}

      {/* 5. MÀN HÌNH PROFILE #7.1 (DANH TÍNH THẬT) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '40px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '30px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', margin: '0 auto', backgroundColor: '#222' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>{piUser?.username}</h2>
          <p style={{ color: '#ffcc00', fontSize: '14px', marginTop: '10px' }}>XÁC THỰC THẬT TỪ PI NETWORK ✅</p>
        </div>
      )}

      {/* 6. THANH NAV ĐÁY: CHUẨN 5PX + TRƯỢT THEO NÚT #5 */}
      <div style={{ position: 'fixed', bottom: isNavVisible ? '5px' : '-70px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'bottom 0.4s ease', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(15px)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
          <SupremeIcon name="cart" size={22} />
          <SupremeIcon name="global" size={22} />
          <div onClick={() => setView('upload')} style={{ width: '32px', height: '22px', borderRadius: '6px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><SupremeIcon name="plus" size={16} color="#ffcc00" /></div>
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <SupremeIcon name="mail" size={22} />
        </div>
      </div>
    </div>
  );
                                                                   }
                                                                   
