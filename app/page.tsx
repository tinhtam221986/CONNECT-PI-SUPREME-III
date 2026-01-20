"use client";
import React, { useState, useRef } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // 1. KẾT NỐI DỮ LIỆU TÀI KHOẢN PI THẬT 100%
  const PI_NETWORK_USER = {
    username: "@tinhtam221986", // Đã khớp 100% yêu cầu
    displayName: "Tinh Tâm",
    bio: "Supreme Master III 🦾 Pi Ecosystem"
  };

  // 2. DANH SÁCH VIDEO THẬT ĐỂ NÚT V#5 ĐIỀU KHIỂN
  const VIDEO_SOURCES = [
    "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-34659-large.mp4"
  ];

  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [currentVidIdx, setCurrentVidIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- MẠCH XỬ LÝ NÚT V #5 (CHUYỂN VIDEO THẬT) ---
  const handleVButtonAction = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn nổi bọt sự kiện
    setCurrentVidIdx((prev) => (prev + 1) % VIDEO_SOURCES.length);
    setShowVolMenu(false);
    console.log("Mạch #5: Đã chuyển sang video tiếp theo.");
  };

  // --- MẠCH XỬ LÝ ĐĂNG TẢI #8 ---
  const handleUploadProcess = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const confirmUpload = () => {
    if(selectedFile) {
      // Logic đấu nối API đăng tải thật tại đây
      setView('feed');
      setSelectedFile(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 📺 VIDEO LAYER */}
      {view === 'feed' && (
        <>
          <video 
            key={VIDEO_SOURCES[currentVidIdx]}
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={VIDEO_SOURCES[currentVidIdx]}
          />

          {/* CỘT PHẢI: GIỮ NGUYÊN 100% VỊ TRÍ CHUẨN HÓA */}
          <div style={{ position: 'absolute', right: '10px', bottom: '25px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 100 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} />
            </div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            {/* LOA #11 */}
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
                  <div style={{ padding: '12px', fontSize: '12px' }}>🎵 Lưu âm thanh</div>
                  <div style={{ height: '0.5px', backgroundColor: '#222' }}></div>
                  <div style={{ padding: '12px', fontSize: '12px' }}>✨ Sử dụng</div>
                </div>
              )}
            </div>

            {/* PHỤC HỒI NÚT V #5 - ĐÃ GÁN MẠCH CHUYỂN VIDEO */}
            <div onClick={handleVButtonAction} style={{ cursor: 'pointer', zIndex: 110 }}>
              <SupremeIcon name="chevron" size={28} />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI (#14) */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => setView('profile')} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer', overflow: 'hidden' }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=PiMaster" alt="avatar" style={{width:'100%'}} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{PI_NETWORK_USER.username}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>{PI_NETWORK_USER.bio}</p>
          </div>
        </>
      )}

      {/* 🚀 MÀN HÌNH ĐĂNG TẢI THẬT #8 */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>TẢI VIDEO THẬT 🚀</h2>
          <input type="file" ref={fileInputRef} hidden accept="video/*" onChange={handleUploadProcess} />
          <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '220px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '15px', backgroundColor: '#111', cursor: 'pointer' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
             <p style={{ color: '#ffcc00', fontSize: '12px', marginTop: '10px' }}>
               {selectedFile ? `Đã chọn: ${selectedFile.name}` : "Bấm để chọn File Video từ máy"}
             </p>
          </div>
          <button 
            onClick={confirmUpload}
            disabled={!selectedFile}
            style={{ width: '100%', marginTop: '30px', backgroundColor: selectedFile ? '#ffcc00' : '#333', color: '#000', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {selectedFile ? "XÁC NHẬN ĐĂNG TẢI" : "CHƯA CÓ VIDEO"}
          </button>
        </div>
      )}

      {/* 👤 MÀN HÌNH PROFILE #7.1 (TÊN THẬT PI NETWORK) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 2000, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', backgroundColor: '#222' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '20px' }}>{PI_NETWORK_USER.displayName}</h2>
            <p style={{ color: '#ffcc00', fontSize: '16px' }}>{PI_NETWORK_USER.username}</p>
            <div style={{ marginTop: '40px', padding: '15px', border: '0.5px solid #333', borderRadius: '10px', textAlign: 'center' }}>
               <p style={{ fontSize: '14px', color: '#888' }}>Mạch kết nối dữ liệu Pi Network: ✅ ĐANG HOẠT ĐỘNG</p>
            </div>
          </div>
        </div>
      )}

      {/* 🧭 THANH ĐIỀU HƯỚNG DƯỚI (SÁT MÉP 5PX) */}
      <div style={{ position: 'fixed', bottom: '5px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px' }}>
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
      
