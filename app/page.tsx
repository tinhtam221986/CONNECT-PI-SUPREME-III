"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [piUser, setPiUser] = useState<{username: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);

  // 1. TỰ ĐỘNG NHẬN DIỆN NGƯỜI DÙNG CŨ
  useEffect(() => {
    const saved = localStorage.getItem('active_pi_user');
    if (saved) {
      setPiUser({ username: saved });
      setIsAuthorized(true);
    }
  }, []);

  // 2. LỆNH KẾT NỐI THẬT - ĐẢM BẢO PHẢN HỒI VẬT LÝ
  const handleConnect = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      // Khởi tạo mạch
      Pi.init({ version: "2.0", sandbox: false });
      
      // Mở cửa sổ KYC của Pi
      Pi.authenticate(['username'], (auth: any) => {
        const username = `@${auth.user.username}`;
        setPiUser({ username });
        localStorage.setItem('active_pi_user', username);
        setIsAuthorized(true);
      }, (err: any) => {
        alert("Lỗi kết nối Pi: " + err.message);
      });
    } else {
      alert("Boss hãy chạy link này TRONG Pi Browser để thấy phép màu! 🚀");
    }
  };

  // MÀN HÌNH CHỜ (LOGIN GATE)
  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 'bold' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>CONNECT-PI</h1>
        <p style={{ color: '#666', fontSize: '13px', textAlign: 'center', margin: '20px 0 40px' }}>Yêu cầu xác thực danh tính để kết nối dữ liệu thật.</p>
        <button 
          onClick={handleConnect}
          style={{ width: '100%', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}
        >
          KẾT NỐI NGAY 🚀
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {view === 'feed' && (
        <>
          <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />
          
          {/* CỘT PHẢI: CHUẨN VỊ TRÍ + NÚT V #5 NÂNG CAO 60PX */}
          <div style={{ position: 'absolute', right: '15px', bottom: '65px', display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center', zIndex: 100 }}>
            <SupremeIcon name="heart" size={32} />
            <SupremeIcon name="comment" size={30} />
            <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ cursor: 'pointer', padding: '10px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%' }}>
              <SupremeIcon name="chevron" size={30} color="#ffcc00" />
            </div>
          </div>

          {/* TRÁI: HIỂN THỊ TÊN ID THẬT (@TINHTAM...) */}
          <div style={{ position: 'absolute', bottom: '85px', left: '15px', zIndex: 100 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div onClick={() => setView('profile')} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #ffcc00', backgroundColor: '#333' }} />
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{piUser?.username}</div>
             </div>
          </div>
        </>
      )}

      {/* MÀN HÌNH PROFILE #7.1 (DANH TÍNH THẬT) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '50px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '40px' }}><SupremeIcon name="chevron" size={28} color="#ffcc00" /></div>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', margin: '0 auto' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>{piUser?.username}</h2>
          <p style={{ color: '#ffcc00', marginTop: '10px' }}>TÀI KHOẢN CHÍNH CHỦ ✅</p>
        </div>
      )}

      {/* NAV ĐÁY 5PX CHUẨN PIXEL */}
      <div style={{ position: 'fixed', bottom: isNavVisible ? '5px' : '-80px', width: '100%', height: '50px', display: 'flex', justifyContent: 'center', transition: 'bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', backgroundColor: 'rgba(20,20,20,0.9)', padding: '0 30px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <SupremeIcon name="cart" size={24} />
          <div onClick={() => setView('upload')} style={{ width: '40px', height: '28px', borderRadius: '8px', border: '2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SupremeIcon name="plus" size={18} color="#ffcc00" /></div>
          <div onClick={() => setView('profile')}><SupremeIcon name="home" size={24} /></div>
          <SupremeIcon name="mail" size={24} />
        </div>
      </div>
    </div>
  );
          }
