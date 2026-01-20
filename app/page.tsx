"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

// Dữ liệu mẫu để đảm bảo màn hình luôn có nội dung, không bị đen
const DUMMY_VIDEOS = [
  { id: 1, url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4", user: "@tinhtam221986", desc: "Connect-Pi: Supreme III 🦾" },
  { id: 2, url: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-34659-large.mp4", user: "@supreme_tech", desc: "Hệ thống vận hành chuẩn xác 🚀" }
];

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'upload'>('feed'); // Chỉ tập trung 2 view chính để tránh lỗi màn hình đen
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  // Hàm chuyển video cho nút V #5
  const handleNextVideo = () => {
    setCurrentIdx((prev) => (prev + 1) % DUMMY_VIDEOS.length);
    setShowVolMenu(false);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 1. MÀN HÌNH FEED (VIDEO CHÍNH) */}
      {view === 'feed' && (
        <>
          {/* LỚP NỀN VIDEO - Đảm bảo không bị đen */}
          <video 
            key={DUMMY_VIDEOS[currentIdx].url}
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={DUMMY_VIDEOS[currentIdx].url}
          />

          <div style={{ position: 'absolute', top: '20px', right: '15px', zIndex: 100, opacity: 0.8 }}><SupremeIcon name="search" size={24} /></div>

          {/* CỘT PHẢI: GIỮ NGUYÊN 100% VỊ TRÍ VÀ KHOẢNG CÁCH Giao diện cũ */}
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
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '150px', backgroundColor: 'rgba(10,10,10,0.98)', borderRadius: '10px', border: '0.5px solid #333', overflow: 'hidden' }}>
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

            {/* PHỤC HỒI NÚT V #5 - CHUYỂN VIDEO */}
            <div onClick={handleNextVideo} style={{ cursor: 'pointer' }}><SupremeIcon name="chevron" size={28} /></div>
          </div>

          {/* CỤM THÔNG TIN TRÁI */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{DUMMY_VIDEOS[currentIdx].user}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>{DUMMY_VIDEOS[currentIdx].desc}</p>
          </div>
        </>
      )}

      {/* 2. MÀN HÌNH UPLOAD (Khi bấm nút +) - Đã sửa lỗi đen màn hình */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff' }}>TẢI VIDEO LÊN 🚀</h2>
          <div style={{ width: '100%', height: '200px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
          </div>
          <textarea placeholder="Mô tả video..." style={{ width: '100%', backgroundColor: '#111', border: '0.5px solid #333', padding: '12px', color: '#fff', marginTop: '15px', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          <button onClick={() => setView('feed')} style={{ marginTop: '20px', backgroundColor: '#ffcc00', color: '#000', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold' }}>Hủy bỏ</button>
        </div>
      )}

      {/* THANH ĐIỀU HƯỚNG DƯỚI (PHỤC HỒI CHỨC NĂNG CÁC NÚT) */}
      <div style={{ position: 'fixed', bottom: '5px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px' }}>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="cart" size={22} /></div>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="global" size={22} /></div>
          
          <div onClick={() => setView('upload')} style={{ width: '30px', height: '20px', borderRadius: '5px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={14} color="#ffcc00" />
          </div>

          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="mail" size={22} /></div>
        </div>
      </div>
    </div>
  );
              }
                     
