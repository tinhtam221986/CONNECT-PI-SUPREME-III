"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [piUser, setPiUser] = useState<{username: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);

  // --- BƯỚC 1: KHỞI TẠO MẠCH MÁU SDK NGAY KHI LOAD APP ---
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      try {
        (window as any).Pi.init({ version: "2.0", sandbox: false });
        console.log("Mạch Pi SDK đã sẵn sàng 🚀");
      } catch (e) {
        console.error("Lỗi khởi tạo mạch:", e);
      }
    }
  }, []);

  // --- BƯỚC 2: XÁC THỰC THẬT (KHÔNG CƯỠNG BỨC) ---
  const handlePiLogin = () => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      // Hệ thống sẽ mở cửa sổ xác nhận của Pi Network tại đây
      (window as any).Pi.authenticate(['username', 'payments'], (auth: any) => {
        // Dữ liệu thật 100% từ Pi Network đổ về
        const realUsername = `@${auth.user.username}`;
        setPiUser({ username: realUsername });
        localStorage.setItem('pi_username', realUsername);
        setIsAuthorized(true);
      }, (error: any) => {
        console.error("Người dùng từ chối hoặc lỗi kết nối:", error);
        alert("Cảnh báo: Kết nối Pi Network bị ngắt quãng 🛑");
      });
    } else {
      alert("Yêu cầu: Boss phải chạy ứng dụng bên trong Pi Browser để kết nối dữ liệu thật! 🖥️");
    }
  };

  // --- GIAO DIỆN CỔNG ĐĂNG NHẬP CHUẨN ---
  if (!isAuthorized) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', marginBottom: '30px' }} />
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>CONNECT-PI</h1>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '30px', textAlign: 'center' }}>
          Vui lòng xác thực danh tính qua Pi Network<br/>để kết nối mạch máu dữ liệu thật.
        </p>
        <button 
          onClick={handlePiLogin}
          style={{ width: '100%', maxWidth: '300px', padding: '15px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          KẾT NỐI PI NETWORK 🚀
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {/* FEED & VIDEO LAYER */}
      {view === 'feed' && (
        <>
          <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }} src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" />
          
          {/* CỤM NÚT PHẢI: CHUẨN VỊ TRÍ NÂNG CAO 50PX */}
          <div style={{ position: 'absolute', right: '10px', bottom: '50px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 90 }}>
            <SupremeIcon name="heart" size={30} />
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <div onClick={(e) => { e.stopPropagation(); setIsNavVisible(!isNavVisible); }} style={{ cursor: 'pointer', padding: '12px' }}>
              <SupremeIcon name="chevron" size={28} color="#ffcc00" />
            </div>
          </div>

          {/* THÔNG TIN TRÁI: HIỂN THỊ TÊN THẬT TỪ SDK */}
          <div style={{ position: 'absolute', bottom: '75px', left: '12px', zIndex: 90 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <div onClick={() => setView('profile')} style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer' }} />
               <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{piUser?.username}</div>
            </div>
          </div>
        </>
      )}

      {/* MÀN HÌNH PROFILE #7.1: DỮ LIỆU ĐỐI CHIẾU THẬT */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '40px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '30px', cursor: 'pointer' }}>
            <SupremeIcon name="chevron" size={26} color="#ffcc00" />
          </div>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', margin: '0 auto' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>{piUser?.username}</h2>
          <p style={{ color: '#ffcc00', fontSize: '14px' }}>TÀI KHOẢN ĐÃ XÁC THỰC THẬT ✅</p>
        </div>
      )}

      {/* THANH NAV ĐÁY 5PX */}
      <div style={{ position: 'fixed', bottom: isNavVisible ? '5px' : '-70px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'bottom 0.4s ease', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(15px)' }}>
          <SupremeIcon name="cart" size={22} />
          <SupremeIcon name="global" size={22} />
          <div onClick={() => setView('upload')} style={{ width: '32px', height: '22px', borderRadius: '6px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={16} color="#ffcc00" />
          </div>
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <SupremeIcon name="mail" size={22} />
        </div>
      </div>
    </div>
  );
                       }
        
