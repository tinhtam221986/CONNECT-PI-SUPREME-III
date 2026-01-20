"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // --- TRẠNG THÁI DỮ LIỆU THẬT ---
  const [piUser, setPiUser] = useState<{username: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);

  // --- MẠCH 1: TỰ ĐỘNG KHÔI PHỤC PHIÊN ĐĂNG NHẬP ---
  useEffect(() => {
    const savedUser = localStorage.getItem('pi_username_real');
    if (savedUser) {
      setPiUser({ username: savedUser });
      setIsAuthorized(true);
    }

    const initPi = async () => {
      if (typeof window !== 'undefined' && (window as any).Pi) {
        (window as any).Pi.init({ version: "2.0", sandbox: false });
      }
    };
    initPi();
  }, []);

  // --- MẠCH 2: LOGIC KẾT NỐI (XỬ LÝ TRIỆT ĐỂ VIỆC "TRƠ" NÚT) ---
  const handleConnectPi = () => {
    console.log("Đang kích hoạt mạch kết nối...");
    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      Pi.authenticate(['username', 'payments'], (auth: any) => {
        // LẤY DỮ LIỆU THẬT TỪ HỆ THỐNG PI
        const realID = `@${auth.user.username}`;
        setPiUser({ username: realID });
        localStorage.setItem('pi_username_real', realID);
        setIsAuthorized(true);
      }, (error: any) => {
        alert("Lỗi xác thực: " + error.message);
      });
    } else {
      alert("Hệ thống: Vui lòng sử dụng Pi Browser để kích hoạt dữ liệu thật!");
    }
  };

  // --- MẠCH 3: CỔNG CHỜ XÁC THỰC (THEO HÌNH BOSS GỬI) ---
  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255, 204, 0, 0.4)' }}>
          <span style={{ fontSize: '45px', fontWeight: 'bold' }}>π</span>
        </div>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>CONNECT-PI</h1>
        <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: '20px 0 40px', lineHeight: '1.6', maxWidth: '280px' }}>
          Vui lòng xác thực danh tính qua Pi Network để kết nối mạch máu dữ liệu thật.
        </p>
        <button 
          onClick={handleConnectPi}
          style={{ width: '100%', maxWidth: '320px', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          KẾT NỐI PI NETWORK 🚀
        </button>
      </div>
    );
  }

  // --- MẠCH 4: GIAO DIỆN CHÍNH (SAU KHI CÓ TÊN THẬT) ---
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', position: 'relative' }}>
      
      {view === 'feed' && (
        <>
          <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />
          
          {/* CỘT PHẢI NÂNG CAO 50PX */}
          <div style={{ position: 'absolute', right: '12px', bottom: '60px', display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center', zIndex: 100 }}>
            <SupremeIcon name="heart" size={32} />
            <SupremeIcon name="comment" size={30} />
            <SupremeIcon name="share" size={30} />
            <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ cursor: 'pointer', padding: '10px' }}>
              <SupremeIcon name="chevron" size={30} color="#ffcc00" />
            </div>
          </div>

          {/* INFO TRÁI - HIỂN THỊ TÊN THẬT LẤY TỪ SDK */}
          <div style={{ position: 'absolute', bottom: '80px', left: '15px', zIndex: 100 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div onClick={() => setView('profile')} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #ffcc00', backgroundColor: '#333' }} />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{piUser?.username}</div>
                  <div style={{ fontSize: '10px', color: '#ff4444', border: '1px solid #ff4444', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>FOLLOW</div>
                </div>
             </div>
             <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.9 }}>Connect-Pi Master...</p>
          </div>
        </>
      )}

      {/* VIEW PROFILE CHUẨN (HÌNH BOSS CUNG CẤP) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 500, padding: '50px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '40px' }}><SupremeIcon name="chevron" size={28} color="#ffcc00" /></div>
          <div style={{ width: '110px', height: '110px', borderRadius: '50%', border: '3px solid #ffcc00', margin: '0 auto', backgroundColor: '#222' }} />
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginTop: '25px' }}>{piUser?.username}</h2>
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#111', borderRadius: '15px', border: '1px solid #333' }}>
            <p style={{ color: '#ffcc00', fontWeight: 'bold' }}>TRẠNG THÁI: VERIFIED ✅</p>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Mạch kết nối dữ liệu Pi Network đang hoạt động</p>
          </div>
        </div>
      )}

      {/* THANH NAV ĐÁY 5PX */}
      <div style={{ position: 'fixed', bottom: isNavVisible ? '5px' : '-80px', width: '100%', display: 'flex', justifyContent: 'center', transition: 'bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(20,20,20,0.85)', padding: '10px 30px', borderRadius: '35px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <SupremeIcon name="cart" size={24} />
          <SupremeIcon name="global" size={24} />
          <div onClick={() => setView('upload')} style={{ width: '40px', height: '28px', borderRadius: '8px', border: '2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SupremeIcon name="plus" size={18} color="#ffcc00" />
          </div>
          <div onClick={() => setView('profile')}><SupremeIcon name="home" size={24} /></div>
          <SupremeIcon name="mail" size={24} />
        </div>
      </div>
    </div>
  );
}
