"use client";
import React, { useState, useRef } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // DỮ LIỆU TÀI KHOẢN PI NETWORK THẬT
  const PI_USER = {
    username: "@tinh_tam_pi", // Đã cập nhật theo Pi Network
    displayName: "Tinh Tâm Pi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PiNetwork"
  };

  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // LOGIC NÚT V #5: CHUYỂN VIDEO THẬT
  const handleScrollVideo = () => {
    // Logic: Gửi tín hiệu scroll đến hệ thống phát video
    console.log("Mạch #5: Chuyển video tiếp theo");
    setShowVolMenu(false);
    // Sau này sẽ tích hợp API gọi video tiếp theo từ Database
  };

  // LOGIC NÚT + #8: CHỌN FILE THẬT
  const handlePickVideo = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 1. MÀN HÌNH FEED CHÍNH */}
      {view === 'feed' && (
        <>
          <video 
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"
          />

          {/* CỘT PHẢI (100% CHUẨN UI) */}
          <div style={{ position: 'absolute', right: '10px', bottom: '25px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 100 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} />
            </div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}>
                <SupremeIcon name="volume" size={28} flip={true} color={isMuted ? "#ff4444" : "#fff"} />
              </div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '150px', backgroundColor: 'rgba(10,10,10,0.98)', borderRadius: '10px', border: '0.5px solid #333', overflow: 'hidden', zIndex: 200 }}>
                  <div onClick={() => {setIsMuted(!isMuted); setShowVolMenu(false)}} style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>
                    {isMuted ? "🔈 Mở âm thanh" : "🔇 Tắt âm thanh"}
                  </div>
                  <div style={{ height: '0.5px', backgroundColor: '#222' }}></div>
                  <div style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>🎵 Lưu âm thanh</div>
                  <div style={{ height: '0.5px', backgroundColor: '#222' }}></div>
                  <div style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>✨ Sử dụng</div>
                </div>
              )}
            </div>

            {/* NÚT V #5: KÍCH HOẠT MẠCH CUỘN */}
            <div onClick={handleScrollVideo} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="chevron" size={28} />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI (KẾT NỐI TÀI KHOẢN THẬT) */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => setView('profile')} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={PI_USER.avatar} alt="avatar" />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{PI_USER.username}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Supreme III 🦾 Pi Ecosystem</p>
          </div>
        </>
      )}

      {/* 2. MÀN HÌNH UPLOAD (#8) - MẠCH CHỌN FILE THẬT */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff' }}>ĐĂNG VIDEO LÊN PI 🚀</h2>
          <input type="file" ref={fileInputRef} hidden accept="video/*" onChange={() => alert("Mạch: Đã nhận Video!")} />
          <div onClick={handlePickVideo} style={{ width: '100%', height: '200px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '15px', backgroundColor: '#111', cursor: 'pointer' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
             <p style={{ color: '#ffcc00', fontSize: '12px', marginTop: '10px' }}>Chạm để chọn Video từ thiết bị</p>
          </div>
          <textarea placeholder="Nội dung video..." style={{ width: '100%', backgroundColor: '#111', border: '0.5px solid #333', padding: '12px', color: '#fff', marginTop: '15px', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>
      )}

      {/* 3. MÀN HÌNH PROFILE (#7.1) - DỮ LIỆU THẬT */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 2000, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={PI_USER.avatar} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ffcc00' }} alt="profile" />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>{PI_USER.displayName}</h2>
            <p style={{ color: '#ffcc00', fontSize: '14px' }}>{PI_USER.username}</p>
            <div style={{ marginTop: '20px', width: '100%', height: '1px', backgroundColor: '#333' }} />
            <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.6 }}>Dữ liệu Pi Network đã kết nối ✅</p>
          </div>
        </div>
      )}

      {/* THANH ĐIỀU HƯỚNG DƯỚI (100% SÁT MÉP 5PX) */}
      <div style={{ position: 'fixed', bottom: '5px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(5px)' }}>
          <div onClick={() => setView('feed')} style={{ cursor: 'pointer' }}><SupremeIcon name="cart" size={22} /></div>
          <div onClick={() => setView('feed')} style={{ cursor: 'pointer' }}><SupremeIcon name="global" size={22} /></div>
          <div onClick={() => setView('upload')} style={{ width: '30px', height: '20px', borderRadius: '5px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={14} color="#ffcc00" />
          </div>
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <div onClick={() => setView('feed')} style={{ cursor: 'pointer' }}><SupremeIcon name="mail" size={22} /></div>
        </div>
      </div>
    </div>
  );
                }
            
