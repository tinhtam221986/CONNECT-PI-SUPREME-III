"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";
import { SupremeIcon } from './SupremeIcons';

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [view, setView] = useState<'feed' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);

  // --- MẠCH KẾT NỐI CHUẨN XÁC THEO @PiCoreTeam ---
  const handleConnect = async () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      try {
        const Pi = (window as any).Pi;
        // 1. Khởi tạo mạch máu
        Pi.init({ version: "2.0", sandbox: false });
        
        // 2. Gọi xác thực danh tính thật
        Pi.authenticate(['username', 'payments'], (auth: any) => {
          const username = `@${auth.user.username}`;
          setUser({ username: username });
          localStorage.setItem('pi_user_verified', username);
          setConnected(true);
        }, (err: any) => {
          alert("Lỗi: Boss chưa đồng ý kết nối hoặc mạng yếu.");
        });
      } catch (e) {
        alert("Đang khởi tạo mạch Pi, Boss đợi 2 giây rồi bấm lại nhé!");
      }
    } else {
      alert("Boss hãy mở App này TRONG Pi Browser để kết nối thật nhé! 🚀");
    }
  };

  // Tự động khôi phục nếu đã đăng nhập
  useEffect(() => {
    const saved = localStorage.getItem('pi_user_verified');
    if (saved) {
      setUser({ username: saved });
      setConnected(true);
    }
  }, []);

  // MÀN HÌNH CỔNG ĐĂNG NHẬP (THEO ĐÚNG HƯỚNG DẪN 10 PHÚT)
  if (!connected) {
    return (
      <>
        {/* Nạp thư viện chính chủ từ máy chủ Pi Network */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
          onLoad={() => console.log("Pi SDK đã nạp xong!")}
        />
        <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <div style={{ width: '85px', height: '85px', backgroundColor: '#ffcc00', borderRadius: '22px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '45px', fontWeight: 'bold', color: '#000' }}>π</div>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '900' }}>CONNECT-PI</h1>
          <p style={{ color: '#888', textAlign: 'center', margin: '20px 0 40px', fontSize: '14px' }}>
            Xác thực danh tính thật qua Pi Network<br/>theo tiêu chuẩn @PiCoreTeam 2026.
          </p>
          <button 
            onClick={handleConnect}
            style={{ width: '100%', maxWidth: '320px', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 204, 0, 0.4)' }}
          >
            KẾT NỐI DANH TÍNH 🚀
          </button>
        </div>
      </>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {view === 'feed' && (
        <>
          <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />
          
          {/* CỘT PHẢI: NÚT V #5 NÂNG CAO 65PX ĐỂ TRÁNH THANH NAV */}
          <div style={{ position: 'absolute', right: '15px', bottom: '65px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 100 }}>
            <SupremeIcon name="heart" size={32} />
            <SupremeIcon name="comment" size={30} />
            <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ cursor: 'pointer', padding: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%' }}>
              <SupremeIcon name="chevron" size={30} color="#ffcc00" />
            </div>
          </div>

          {/* TRÁI: HIỂN THỊ TÊN ID THẬT (@tinhtam221986) */}
          <div style={{ position: 'absolute', bottom: '85px', left: '15px', zIndex: 100 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div onClick={() => setView('profile')} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #ffcc00', backgroundColor: '#222', cursor: 'pointer' }} />
                <div style={{ fontWeight: 'bold', fontSize: '17px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{user?.username}</div>
             </div>
          </div>
        </>
      )}

      {/* VIEW PROFILE #7.1 (SÁT VỚI HÌNH BOSS GỬI) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 500, padding: '50px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '40px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={28} color="#ffcc00" /></div>
          <div style={{ width: '110px', height: '110px', borderRadius: '50%', border: '3px solid #ffcc00', margin: '0 auto', backgroundColor: '#111' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '25px' }}>{user?.username}</h2>
          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#111', borderRadius: '15px', border: '1px solid #333' }}>
             <p style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '18px' }}>XÁC THỰC THÀNH CÔNG ✅</p>
             <p style={{ color: '#666', fontSize: '12px', marginTop: '10px' }}>Dữ liệu được kết nối trực tiếp từ Pi Blockchain</p>
          </div>
        </div>
      )}

      {/* THANH NAV ĐÁY 5PX - CHUẨN VỊ TRÍ BOSS YÊU CẦU */}
      <div style={{ position: 'fixed', bottom: isNavVisible ? '5px' : '-80px', width: '100%', height: '50px', display: 'flex', justifyContent: 'center', transition: 'bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', backgroundColor: 'rgba(20,20,20,0.95)', padding: '0 35px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(15px)' }}>
          <SupremeIcon name="cart" size={24} />
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={24} /></div>
          <SupremeIcon name="mail" size={24} />
        </div>
      </div>
    </div>
  );
                       }
