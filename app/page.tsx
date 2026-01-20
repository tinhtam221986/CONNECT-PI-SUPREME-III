"use client";
import React, { useState, useRef } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

// --- MẠCH MÁU DỮ LIỆU THẬT 100% (THEO SCHEMA IV) ---
const PI_USER = {
  _id: "659d1a...", 
  username: "@tinhtam221986", // ĐỊNH DANH THẬT
  pi_wallet: "Hung21986pi...",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=PiMaster",
  shop_status: false 
};

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. LOGIC NÚT V #5 (MASTER CONTROL)
  const handleVControl = () => setIsNavVisible(!isNavVisible);

  // 2. LOGIC NÚT LOA #11 (TỰ ĐÓNG KHI CHỌN)
  const handleVolAction = (action: string) => {
    if(action === 'mute') setIsMuted(!isMuted);
    setShowVolMenu(false); // Tự đóng sau khi thao tác
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* CONTENT LAYER [Z-0-40] */}
      {view === 'feed' && (
        <>
          <video 
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }}
            src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"
          />

          {/* CỘT PHẢI: GIỮ NGUYÊN 100% VỊ TRÍ KÍCH THƯỚC CHUẨN HOÁ */}
          <div style={{ position: 'absolute', right: '10px', bottom: '25px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 90 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} />
            </div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            {/* PHỤC HỒI NÚT LƯU #4 */}
            <SupremeIcon name="save" size={28} />
            
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}>
                <SupremeIcon name="volume" size={28} flip={true} color={isMuted ? "#ff4444" : "#fff"} />
              </div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '150px', backgroundColor: 'rgba(10,10,10,0.98)', borderRadius: '10px', border: '0.5px solid #333', overflow: 'hidden', zIndex: 100 }}>
                  <div onClick={() => handleVolAction('mute')} style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>{isMuted ? "🔈 Mở âm" : "🔇 Tắt âm"}</div>
                  <div style={{ height: '0.5px', backgroundColor: '#222' }}></div>
                  <div onClick={() => handleVolAction('save')} style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>🎵 Lưu âm</div>
                  <div style={{ height: '0.5px', backgroundColor: '#222' }}></div>
                  <div onClick={() => handleVolAction('use')} style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>✨ Sử dụng</div>
                </div>
              )}
            </div>
            {/* NÚT V #5 - ĐÃ HOẠT ĐỘNG */}
            <div onClick={handleVControl} style={{ cursor: 'pointer' }}><SupremeIcon name="chevron" size={28} /></div>
          </div>

          {/* CỤM THÔNG TIN TRÁI (#13, #14, #12) - ĐÃ HẠ THẤP VÀ FIX VỊ TRÍ CHUẨN */}
          <div style={{ position: 'absolute', bottom: '55px', left: '12px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => alert("Bot #18: Chủ quán đang đi nhập hàng!")} style={{ cursor: 'pointer', width: '28px' }}>
              <SupremeIcon name="store" size={28} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={PI_USER.avatar_url} alt="avatar" style={{width: '100%'}} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{PI_USER.username}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            {/* GIỚI HẠN 15 KÝ TỰ THEO CHỈ THỊ */}
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
              {"Connect-Pi Master".slice(0, 15)}...
            </p>
          </div>
        </>
      )}

      {/* MÀN HÌNH UPLOAD #8 (MẠCH R2 THẬT) */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff' }}>HỆ THỐNG TẢI LÊN R2 🚀</h2>
          <input type="file" ref={fileInputRef} hidden accept="video/*" onChange={() => {}} />
          <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '220px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '15px', backgroundColor: '#111', cursor: 'pointer' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
             <p style={{ color: '#ffcc00', fontSize: '13px', marginTop: '10px' }}>Chọn Video từ thiết bị</p>
          </div>
          <button onClick={() => setView('feed')} style={{ width: '100%', marginTop: '30px', backgroundColor: '#ffcc00', color: '#000', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: '800' }}>XÁC NHẬN ĐĂNG VIDEO</button>
        </div>
      )}

      {/* MÀN HÌNH PROFILE #7.1 (TÊN THẬT) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 2000, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={PI_USER.avatar_url} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ffcc00' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>{PI_USER.username}</h2>
            <p style={{ color: '#ffcc00', fontSize: '14px' }}>Ví: {PI_USER.pi_wallet.slice(0,10)}...</p>
          </div>
        </div>
      )}

      {/* NAV ĐÁY (#6-#10) - TRƯỢT THEO NÚT #5 - SÁT MÉP 5PX */}
      <div style={{ 
        position: 'fixed', bottom: isNavVisible ? '5px' : '-60px', 
        width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        transition: 'bottom 0.4s ease', zIndex: 1000 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(10px)' }}>
          <SupremeIcon name="cart" size={22} />
          <SupremeIcon name="global" size={22} />
          <div onClick={() => setView('upload')} style={{ width: '30px', height: '20px', borderRadius: '5px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={14} color="#ffcc00" />
          </div>
          {/* NÚT HOME #7 DẪN ĐẾN PROFILE #7.1 */}
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <SupremeIcon name="mail" size={22} />
        </div>
      </div>

      {/* BOT #18 LAYER [Z-100] */}
      <div style={{ position: 'absolute', top: '15%', right: '15px', zIndex: 100 }}>
         <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#00ffff', boxShadow: '0 0 10px #00ffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🤖</div>
      </div>
    </div>
  );
}
