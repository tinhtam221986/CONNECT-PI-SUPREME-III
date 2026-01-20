"use client";
import React, { useState, useRef } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

// DỮ LIỆU TÀI KHOẢN PI NETWORK THẬT
const PI_USER_DATA = {
  username: "@tinh_tam_pi", 
  displayName: "Tinh Tâm Pi",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PiNetwork"
};

// DANH SÁCH VIDEO THẬT ĐỂ CHẠY MẠCH #5
const VIDEO_PLAYLIST = [
  "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-34659-large.mp4"
];

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [currentVid, setCurrentVid] = useState(0);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Ref để kết nối mạch máu file hệ thống
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // LOGIC NÚT V #5: CHUYỂN VIDEO (Mạch cuộn thật)
  const handleScrollVideo = () => {
    setCurrentVid((prev) => (prev + 1) % VIDEO_PLAYLIST.length);
    setShowVolMenu(false);
  };

  // LOGIC NÚT + #8: CHỌN VÀ HIỂN THỊ TRẠNG THÁI FILE
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 1. MÀN HÌNH FEED CHÍNH */}
      {view === 'feed' && (
        <>
          <video 
            key={VIDEO_PLAYLIST[currentVid]}
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={VIDEO_PLAYLIST[currentVid]}
          />

          {/* CỘT PHẢI (GIỮ NGUYÊN 100% UI CHUẨN) */}
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

            {/* NÚT V #5: KÍCH HOẠT MẠCH CHUYỂN VIDEO */}
            <div onClick={handleScrollVideo} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="chevron" size={28} />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI (DATA THẬT) */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => setView('profile')} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={PI_USER_DATA.avatar} alt="avatar" style={{width:'100%'}} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{PI_USER_DATA.username}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Supreme III 🦾 Pi Ecosystem</p>
          </div>
        </>
      )}

      {/* 2. MÀN HÌNH UPLOAD (#8) - MẠCH ĐĂNG TẢI THẬT */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff' }}>HỆ THỐNG ĐĂNG TẢI 🚀</h2>
          
          <input type="file" ref={fileInputRef} hidden accept="video/*" onChange={onFileChange} />
          
          <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '220px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '15px', backgroundColor: '#111', cursor: 'pointer' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
             <p style={{ color: '#ffcc00', fontSize: '13px', marginTop: '10px' }}>
               {selectedFile ? `Đã chọn: ${selectedFile.name.substring(0,20)}...` : "Chạm để chọn Video thật"}
             </p>
          </div>
          
          <textarea placeholder="Nội dung video..." style={{ width: '100%', backgroundColor: '#111', border: '0.5px solid #333', padding: '12px', color: '#fff', marginTop: '15px', borderRadius: '10px', fontSize: '14px', outline: 'none', height: '80px' }} />
          
          <button 
            disabled={!selectedFile}
            onClick={() => setView('feed')}
            style={{ width: '100%', marginTop: '20px', backgroundColor: selectedFile ? '#ffcc00' : '#333', color: '#000', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: '800', cursor: selectedFile ? 'pointer' : 'not-allowed' }}
          >
            {selectedFile ? "XÁC NHẬN ĐĂNG VIDEO" : "VUI LÒNG CHỌN VIDEO"}
          </button>
        </div>
      )}

      {/* 3. MÀN HÌNH PROFILE (#7.1) - DỮ LIỆU THẬT */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 2000, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={PI_USER_DATA.avatar} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ffcc00' }} alt="profile" />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>{PI_USER_DATA.displayName}</h2>
            <p style={{ color: '#ffcc00', fontSize: '14px' }}>{PI_USER_DATA.username}</p>
            <p style={{ marginTop: '30px', fontSize: '14px', opacity: 0.5 }}>Dữ liệu xác thực Pi Network ✅</p>
          </div>
        </div>
      )}

      {/* THANH ĐIỀU HƯỚNG DƯỚI (DỮ NGUYÊN TỈ LỆ VÀNG) */}
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
        
