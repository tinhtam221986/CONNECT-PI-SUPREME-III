"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // QUẢN LÝ MẠCH ĐIỀU HƯỚNG
  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  // Dữ liệu mẫu để màn hình luôn hoạt động
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4";

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* --- PHÂN KHU 1: MÀN HÌNH VIDEO CHÍNH --- */}
      {view === 'feed' && (
        <>
          <video 
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={videoUrl}
          />

          {/* NÚT TÌM KIẾM */}
          <div style={{ position: 'absolute', top: '20px', right: '15px', zIndex: 100, opacity: 0.8 }}>
            <SupremeIcon name="search" size={24} />
          </div>

          {/* CỘT PHẢI (GIỮ NGUYÊN 100% TỈ LỆ CHUẨN) */}
          <div style={{ position: 'absolute', right: '10px', bottom: '25px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 100 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} />
            </div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            {/* NÚT LOA #11 CHUẨN 3 NGĂN */}
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

            {/* NÚT V #5 - KHÔI PHỤC TÁC DỤNG (Bấm để đóng menu hoặc chuyển cảnh) */}
            <div onClick={() => setShowVolMenu(false)} style={{ cursor: 'pointer' }}>
              <SupremeIcon name="chevron" size={28} />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI (#14) */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => setView('profile')} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', cursor: 'pointer' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>@tinhtam221986</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Connect-Pi: Supreme III 🦾</p>
          </div>
        </>
      )}

      {/* --- PHÂN KHU 2: MÀN HÌNH UPLOAD (#8) --- */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
             <SupremeIcon name="chevron" size={26} color="#ffcc00" />
          </div>
          <h2 style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>TẢI VIDEO 🚀</h2>
          <div style={{ width: '100%', height: '200px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px', backgroundColor: '#111' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
          </div>
          <textarea placeholder="Nhập mô tả cho video của bạn..." style={{ width: '100%', backgroundColor: '#111', border: '0.5px solid #333', padding: '12px', color: '#fff', marginTop: '15px', borderRadius: '10px', fontSize: '14px', outline: 'none', height: '100px' }} />
          <button onClick={() => setView('feed')} style={{ width: '100%', marginTop: '20px', backgroundColor: '#ffcc00', color: '#000', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>ĐĂNG VIDEO</button>
        </div>
      )}

      {/* --- PHÂN KHU 3: MÀN HÌNH PROFILE (#7.1) --- */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 2000, padding: '40px 20px' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
            <SupremeIcon name="chevron" size={26} color="#ffcc00" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: '#222', marginBottom: '15px' }} />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>@tinhtam221986</h2>
            <p style={{ color: '#888', fontSize: '14px' }}>Hồ sơ cá nhân của bạn</p>
          </div>
        </div>
      )}

      {/* --- PHÂN KHU 4: THANH ĐIỀU HƯỚNG DƯỚI (SÁT MÉP 5PX) --- */}
      <div style={{ position: 'fixed', bottom: '5px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(5px)' }}>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="cart" size={22} /></div>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="global" size={22} /></div>
          
          {/* NÚT + (#8) ĐÃ KÍCH HOẠT */}
          <div onClick={() => setView('upload')} style={{ width: '30px', height: '20px', borderRadius: '5px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={14} color="#ffcc00" />
          </div>

          {/* NÚT HOME (#7) KÍCH HOẠT PROFILE (#7.1) */}
          <div onClick={() => setView('profile')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="mail" size={22} /></div>
        </div>
      </div>
    </div>
  );
          }
                      
