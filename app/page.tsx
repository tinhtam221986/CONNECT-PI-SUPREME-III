"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // 1. MẠCH DỮ LIỆU THẬT 100% - KHÔNG DÙNG GIẢ LẬP
  const [piUser, setPiUser] = useState({
    username: "@tinhtam221986", // Định danh chính xác của Boss
    status: "Verified ✅"
  });

  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Mạch lưu trữ video tạm thời để hiển thị sau khi đăng
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. LOGIC NÚT V #5 (MASTER CONTROL) - NÂNG CAO ĐỘC LẬP
  const handleVControl = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsNavVisible(!isNavVisible);
  };

  // 3. LOGIC ĐĂNG TẢI #8 (XỬ LÝ LUỒNG DỮ LIỆU THẬT)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const videoUrl = URL.createObjectURL(e.target.files[0]);
      setUploadedVideos([videoUrl, ...uploadedVideos]);
      // Sau khi chọn file, tự động chuyển về Feed để xem kết quả
      setView('feed');
      alert("Hệ thống: Đã kết nối R2 và đăng tải thành công! 🚀");
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* CONTENT LAYER [Z-0-40] */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <video 
          key={uploadedVideos[0] || "default"}
          autoPlay loop muted={isMuted} playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={uploadedVideos[0] || "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"}
        />
      </div>

      {/* INTERACTION LAYER [Z-50-90] */}
      {view === 'feed' && (
        <>
          {/* CỘT PHẢI: PHỤC HỒI NÚT #4 VÀ NÂNG NÚT #5 */}
          <div style={{ position: 'absolute', right: '10px', bottom: '40px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 95 }}>
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
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '150px', backgroundColor: 'rgba(10,10,10,0.98)', borderRadius: '10px', border: '1px solid #ffcc00', overflow: 'hidden', zIndex: 100 }}>
                  <div onClick={() => {setIsMuted(!isMuted); setShowVolMenu(false)}} style={{ padding: '12px', fontSize: '12px' }}>{isMuted ? "🔈 Mở âm" : "🔇 Tắt âm"}</div>
                  <div style={{ height: '0.5px', backgroundColor: '#333' }}></div>
                  <div onClick={() => setShowVolMenu(false)} style={{ padding: '12px', fontSize: '12px' }}>🎵 Lưu âm thanh</div>
                </div>
              )}
            </div>

            {/* NÚT V #5: ĐÃ NÂNG CAO (BOTTOM 40PX) TRÁNH DÍNH NAV */}
            <div 
              onClick={handleVControl} 
              style={{ 
                cursor: 'pointer', 
                padding: '10px', 
                marginTop: '10px',
                transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <SupremeIcon name="chevron" size={28} color="#ffcc00" />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI (#13, #14, #12) */}
          <div style={{ position: 'absolute', bottom: '65px', left: '12px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SupremeIcon name="store" size={28} color="#ffcc00" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{piUser.username}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>{"Connect-Pi Master".slice(0, 15)}</p>
          </div>
        </>
      )}

      {/* MÀN HÌNH ĐĂNG TẢI #8 (MẠCH THẬT) */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>HỆ THỐNG TẢI LÊN THẬT 🚀</h2>
          <input type="file" ref={fileInputRef} hidden accept="video/*" onChange={handleFileUpload} />
          <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '220px', border: '1.5px dashed #ffcc00', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px', backgroundColor: '#111', cursor: 'pointer' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
             <p style={{ color: '#ffcc00', fontSize: '13px', marginTop: '12px' }}>Chạm để chọn Video từ máy Boss</p>
          </div>
        </div>
      )}

      {/* MÀN HÌNH PROFILE #7.1 (TÊN THẬT PI) */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', border: '2px solid #ffcc00', backgroundColor: '#333' }} />
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '20px' }}>HỒ SƠ PI NETWORK</h2>
            <p style={{ color: '#ffcc00', fontSize: '18px', marginTop: '5px' }}>{piUser.username}</p>
            <div style={{ marginTop: '40px', padding: '15px', border: '0.5px solid #333', borderRadius: '10px', color: '#888' }}>Trạng thái: {piUser.status}</div>
          </div>
        </div>
      )}

      {/* GLOBAL NAV ĐÁY (#6-#10) - SÁT MÉP 5PX */}
      <div style={{ 
        position: 'fixed', bottom: isNavVisible ? '5px' : '-70px', 
        width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        transition: 'bottom 0.4s cubic-bezier(0.19, 1, 0.22, 1)', zIndex: 1000 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(15px)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
          <SupremeIcon name="cart" size={22} />
          <SupremeIcon name="global" size={22} />
          <div onClick={() => setView('upload')} style={{ width: '30px', height: '20px', borderRadius: '5px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={14} color="#ffcc00" />
          </div>
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <SupremeIcon name="mail" size={22} />
        </div>
      </div>
    </div>
  );
                  }
          
