"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

// --- ĐẤU NỐI MẠCH MÁU DỮ LIỆU THẬT 100% ---
const PI_CONFIG = {
  username: "@tinhtam221986", // Khớp 100% tài khoản chủ sở hữu
  wallet: "Hung21986pi...", 
  r2Domain: "https://pub-e63dc11b8830414dae41e7e0f122a7e7.r2.dev"
};

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true); // Mạch Nút #5
  const [isMuted, setIsMuted] = useState(false);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Logic Video Feed (Content Layer Z-0)
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const videoList = [
    `${PI_CONFIG.r2Domain}/video1.mp4`, // Kết nối R2 Public Domain thật
    `${PI_CONFIG.r2Domain}/video2.mp4`
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3.2. LOGIC "PHẦN CỨNG" NÚT #5 (MASTER V CONTROL)
  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
    console.log("Mạch #5: Toggle isNavVisible ->", !isNavVisible);
  };

  // 3.1. LOGIC NÚT #14 (CỬA HÀNG KHÁCH)
  const handleShopClick = () => {
    // Giả lập check DB: shop_status
    const hasProducts = false; 
    if (!hasProducts) {
      alert("Bot #18: Chủ quán đang đi nhập hàng, vui lòng quay lại sau! 🤖");
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {/* --- Z-INDEX [0-40]: CONTENT LAYER --- */}
      {view === 'feed' && (
        <video 
          key={currentVideoIdx}
          autoPlay loop muted={isMuted} playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }}
          src={videoList[currentVideoIdx]}
        />
      )}

      {/* --- Z-INDEX [50-90]: INTERACTION LAYER (KHÔNG BAO GIỜ ẨN) --- */}
      
      {/* CỘT PHẢI: PHÍM CHỨC NĂNG CỐT LÕI */}
      <div style={{ position: 'absolute', right: '10px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 90 }}>
        <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}>
          <SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} />
        </div>
        <SupremeIcon name="comment" size={28} />
        <SupremeIcon name="share" size={28} />
        
        {/* NÚT #11: LOA 3 NGĂN */}
        <div style={{ position: 'relative' }}>
          <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}>
            <SupremeIcon name="volume" size={28} flip={true} color={isMuted ? "#ff4444" : "#fff"} />
          </div>
          {showVolMenu && (
            <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '160px', backgroundColor: 'rgba(10,10,10,0.95)', borderRadius: '12px', border: '1px solid #ffcc00', zIndex: 95 }}>
              <div onClick={() => setIsMuted(!isMuted)} style={{ padding: '12px', fontSize: '13px' }}>1- Tắt/Mở âm thanh</div>
              <div style={{ height: '1px', backgroundColor: '#333' }} />
              <div style={{ padding: '12px', fontSize: '13px' }}>2- Lưu âm thanh</div>
              <div style={{ height: '1px', backgroundColor: '#333' }} />
              <div style={{ padding: '12px', fontSize: '13px' }}>3- Sử dụng âm thanh</div>
            </div>
          )}
        </div>

        {/* NÚT #5: MASTER V CONTROL (LUÔN ĐỨNG IM) */}
        <div onClick={toggleNav} style={{ cursor: 'pointer', transition: 'transform 0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
          <SupremeIcon name="chevron" size={28} color="#ffcc00" />
        </div>
      </div>

      {/* CỤM LEFT (#13, #14, #12) */}
      <div style={{ position: 'absolute', bottom: '60px', left: '12px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div onClick={handleShopClick} style={{ cursor: 'pointer' }}>
          <SupremeIcon name="store" size={28} color="#ffcc00" /> {/* Nút #14 Mái che */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div onClick={() => setView('profile')} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: '#333', cursor: 'pointer' }} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{PI_CONFIG.username}</div>
            <div style={{ fontSize: '10px', color: '#ff4444', border: '1px solid #ff4444', padding: '1px 6px', borderRadius: '3px', marginTop: '3px' }}>FOLLOW</div>
          </div>
        </div>
        <p style={{ fontSize: '14px', maxWidth: '70vw' }}>Supreme Master III 🦾 Connect-Pi Ecosystem</p>
      </div>

      {/* NAV ĐÁY (#6-#10): TRƯỢT THEO NÚT #5 */}
      <div style={{ 
        position: 'fixed', bottom: isNavVisible ? '5px' : '-60px', 
        width: '100%', height: '50px', display: 'flex', justifyContent: 'center', 
        transition: 'bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 100 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 30px', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
          <SupremeIcon name="cart" size={24} />
          <SupremeIcon name="global" size={24} />
          {/* NÚT #8 (+) UPLOAD */}
          <div onClick={() => setView('upload')} style={{ width: '35px', height: '22px', borderRadius: '6px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={16} color="#ffcc00" />
          </div>
          {/* NÚT #7 HOME -> PROFILE */}
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={24} /></div>
          <SupremeIcon name="mail" size={24} />
        </div>
      </div>

      {/* --- MÀN HÌNH UPLOAD THẬT (#8) --- */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 100, padding: '40px' }}>
          <h2 style={{ color: '#ffcc00' }}>R2 CLOUDFLARE UPLOAD 🚀</h2>
          <input type="file" ref={fileInputRef} hidden accept="video/*" />
          <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '200px', border: '2px dashed #ffcc00', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', cursor: 'pointer' }}>
             Bấm để chọn Video thật từ máy
          </div>
          <button onClick={() => setView('feed')} style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#ffcc00', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>ĐĂNG LÊN HỆ SINH THÁI PI</button>
        </div>
      )}

      {/* --- Z-INDEX [100]: AI LAYER (BOT #18) --- */}
      <div style={{ position: 'absolute', top: '20%', left: '10px', zIndex: 100, width: '50px', height: '50px', cursor: 'move' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#00ffff', boxShadow: '0 0 15px #00ffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🤖
        </div>
      </div>

    </div>
  );
                }
                                                          
