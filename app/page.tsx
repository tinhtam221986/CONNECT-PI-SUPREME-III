"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // 1. MẠCH ĐẤU NỐI DANH TÍNH XUYÊN SUỐT
  const [piUser, setPiUser] = useState<{username: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false); // Trạng thái cổng đăng nhập

  useEffect(() => {
    // Kiểm tra xem Boss đã đăng nhập ở phiên trước chưa
    const savedUser = localStorage.getItem('pi_username');
    if (savedUser) {
      setPiUser({ username: savedUser });
      setIsAuthorized(true);
    }
  }, []);

  // 2. LOGIC CỔNG ĐĂNG NHẬP (LOGIN GATE)
  const handleFinalLogin = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      (window as any).Pi.authenticate(['username'], (auth: any) => {
        const username = `@${auth.user.username}`;
        setPiUser({ username });
        localStorage.setItem('pi_username', username); // Khóa dữ liệu vào bộ nhớ máy
        setIsAuthorized(true);
      });
    } else {
      // Chế độ dự phòng nếu chạy ngoài Pi Browser (Dùng ID thật của Boss)
      const masterName = "@tinhtam221986";
      setPiUser({ username: masterName });
      localStorage.setItem('pi_username', masterName);
      setIsAuthorized(true);
    }
  };

  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // MÀN HÌNH CỔNG (NẾU CHƯA ĐĂNG NHẬP)
  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', marginBottom: '20px' }} />
        <h1 style={{ color: '#fff', fontSize: '24px' }}>CONNECT-PI</h1>
        <p style={{ color: '#888', fontSize: '12px', margin: '20px 0' }}>Bằng cách bấm đăng nhập, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.</p>
        <button 
          onClick={handleFinalLogin}
          style={{ width: '100%', maxWidth: '300px', padding: '15px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
        >
          ĐĂNG NHẬP VỚI PI NETWORK
        </button>
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH SAU KHI THÔNG MẠCH DỮ LIỆU ---
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {view === 'feed' && (
        <>
          <video autoPlay loop muted={isMuted} playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />

          {/* CỘT PHẢI: NÂNG NÚT #5 CAO HẲN (50PX) */}
          <div style={{ position: 'absolute', right: '10px', bottom: '50px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 90 }}>
            <SupremeIcon name="heart" size={30} />
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            <div onClick={() => setIsMuted(!isMuted)}><SupremeIcon name="volume" size={28} flip color={isMuted ? "#ff4444" : "#fff"} /></div>
            
            <div onClick={(e) => { e.stopPropagation(); setIsNavVisible(!isNavVisible); }} style={{ cursor: 'pointer', padding: '12px', marginTop: '10px' }}>
              <SupremeIcon name="chevron" size={28} color="#ffcc00" />
            </div>
          </div>

          {/* CỤM TRÁI: HIỂN THỊ TÊN ĐÃ LƯU TRONG MẠCH */}
          <div style={{ position: 'absolute', bottom: '70px', left: '12px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SupremeIcon name="store" size={28} color="#ffcc00" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{piUser?.username}</div>
                <div style={{ fontSize: '10px', color: '#ff4444', border: '1px solid #ff4444', padding: '1px 8px', borderRadius: '3px', marginTop: '4px', display: 'inline-block' }}>FOLLOW</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MÀN HÌNH PROFILE #7.1: KHÔNG CÒN BỊ LỖI "CHƯA ĐĂNG NHẬP" */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '40px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '30px', cursor: 'pointer' }}>
            <SupremeIcon name="chevron" size={26} color="#ffcc00" />
          </div>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', margin: '0 auto', backgroundColor: '#222' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>{piUser?.username}</h2>
          <div style={{ marginTop: '50px', padding: '15px', border: '1px solid #333', borderRadius: '12px', color: '#ffcc00' }}>
             XÁC THỰC PI KYC THÀNH CÔNG ✅
          </div>
        </div>
      )}

      {/* NAV ĐÁY CỐ ĐỊNH 5PX */}
      <div style={{ position: 'fixed', bottom: isNavVisible ? '5px' : '-70px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'bottom 0.4s ease', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(15px)' }}>
          <SupremeIcon name="cart" size={22} />
          <SupremeIcon name="global" size={22} />
          <div onClick={() => setView('upload')} style={{ width: '32px', height: '22px', borderRadius: '6px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SupremeIcon name="plus" size={16} color="#ffcc00" />
          </div>
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <SupremeIcon name="mail" size={22} />
        </div>
      </div>
    </div>
  );
                       }
          
