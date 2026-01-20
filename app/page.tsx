"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

// 1. KHỞI TẠO MẠCH MÁU DỮ LIỆU (Dữ liệu mẫu chuẩn cấu trúc R2)
const DUMMY_VIDEOS = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    user: "@tinhtam221986",
    desc: "Connect-Pi: Supreme III - Khởi chạy hệ thống 🦾",
    likes: "1.2K",
    shopId: "shop_01"
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-34659-large.mp4",
    user: "@supreme_tech",
    desc: "Trải nghiệm mua sắm Web3 chuẩn tương lai 🚀",
    likes: "850",
    shopId: "shop_02"
  }
];

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload' | 'shop'>('feed');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  // 2. LOGIC TỰ ĐỘNG CHUYỂN VIDEO (Mạch vận động)
  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % DUMMY_VIDEOS.length);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {view === 'feed' && (
        <>
          {/* 📺 MÁY PHÁT VIDEO TRUNG TÂM */}
          <video 
            key={DUMMY_VIDEOS[currentVideoIndex].url}
            autoPlay 
            loop 
            muted={isMuted}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={DUMMY_VIDEOS[currentVideoIndex].url}
          />

          <div style={{ position: 'absolute', top: '20px', right: '15px', zIndex: 100, opacity: 0.8 }}><SupremeIcon name="search" size={24} /></div>

          {/* CỘT PHẢI: MẠCH TƯƠNG TÁC */}
          <div style={{ position: 'absolute', right: '10px', bottom: '25px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 100 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer', color: liked ? '#ff4444' : '#fff' }}>
              <SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} />
            </div>
            
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            {/* Logic Menu Loa chuẩn 3 ngăn */}
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

            {/* Nút V #5: Chuyển video tiếp theo */}
            <div onClick={nextVideo} style={{ cursor: 'pointer' }}><SupremeIcon name="chevron" size={28} /></div>
          </div>

          {/* CỤM THÔNG TIN TRÁI & SHOP CÁ NHÂN */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => setView('shop')} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222', overflow: 'hidden' }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=tinh-tam" alt="avatar" />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{DUMMY_VIDEOS[currentVideoIndex].user}</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, textShadow: '1px 1px 2px #000' }}>{DUMMY_VIDEOS[currentVideoIndex].desc}</p>
          </div>
        </>
      )}

      {/* 🧭 THANH ĐIỀU HƯỚNG DƯỚI (Mạch kết nối trang) */}
      <div style={{ position: 'fixed', bottom: '5px', width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(5px)' }}>
          <div onClick={() => setView('shop')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="cart" size={22} /></div>
          <div style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="global" size={22} /></div>
          <div onClick={() => setView('upload')} style={{ width: '30px', height: '20px', borderRadius: '5px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SupremeIcon name="plus" size={14} color="#ffcc00" />
          </div>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <div style={{ opacity: 0.9, cursor: 'pointer' }}><SupremeIcon name="mail" size={22} /></div>
        </div>
      </div>
    </div>
  );
                    }
