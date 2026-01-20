"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // Quản lý các màn hình: feed (video), profile (cá nhân), upload (đăng bài)
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#000', 
      overflow: 'hidden', 
      color: '#fff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
    }}>
      
      {/* 1. MÀN HÌNH VIDEO FEED */}
      {view === 'feed' && (
        <>
          <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}>
            <SupremeIcon name="search" size={28} />
          </div>
          
          {/* Sidebar tương tác bên phải */}
          <div style={{ position: 'absolute', right: '12px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', zIndex: 100 }}>
            <div style={{ textAlign: 'center' }}>
              <SupremeIcon name="heart" size={32} />
              <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 'bold' }}>92</div>
            </div>
            <SupremeIcon name="comment" size={30} />
            <SupremeIcon name="share" size={30} />
            <SupremeIcon name="save" size={30} />
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)}>
                <SupremeIcon name="volume" size={30} flip={true} />
              </div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '50px', bottom: '0', width: '140px', backgroundColor: 'rgba(28,28,30,0.95)', borderRadius: '12px', border: '0.5px solid #3a3a3c', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                  <div style={{ padding: '12px', fontSize: '13px', borderBottom: '0.5px solid #38383a' }}>Tắt/mở âm thanh</div>
                  <div style={{ padding: '12px', fontSize: '13px' }}>Lưu âm thanh</div>
                </div>
              )}
            </div>
            <SupremeIcon name="chevron" size={28} />
          </div>

          {/* Thông tin người dùng phía dưới */}
          <div style={{ position: 'absolute', bottom: '95px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 204, 0, 0.1)' }}>
              <SupremeIcon name="store" size={20} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: '#222', backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=tinh-tam")', backgroundSize: 'cover' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>@tinhtam221986</div>
                <div style={{ fontSize: '11px', color: '#ff4444', fontWeight: 'bold', border: '1px solid #ff4444', width: 'fit-content', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', textTransform: 'uppercase' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, lineHeight: '1.4' }}>Connect-Pi: Supreme III 🦾</p>
          </div>
          
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <span style={{ opacity: 0.3, fontSize: '14px' }}>Video Feed Ready...</span>
          </div>
        </>
      )}

      {/* 2. MÀN HÌNH UPLOAD (Kích hoạt khi bấm nút +) */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '50px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '30px', cursor: 'pointer' }}>
            <SupremeIcon name="chevron" size={32} color="#ffcc00" />
            <span style={{ marginLeft: '10px', color: '#ffcc00', verticalAlign: 'middle' }}>Quay lại</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>ĐANG TẢI... 🚀</h2>
          <div style={{ width: '100%', height: '250px', border: '2px dashed #ffcc00', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' }}>
             <SupremeIcon name="plus" size={50} color="#ffcc00" />
             <p style={{ color: '#ffcc00', marginTop: '15px', fontSize: '14px' }}>Chạm để chọn Video</p>
          </div>
          <textarea 
            placeholder="Nhập tiêu đề và mô tả video của bạn..." 
            style={{ width: '100%', height: '120px', backgroundColor: '#1c1c1e', border: '1px solid #3a3a3c', padding: '15px', color: '#fff', marginTop: '20px', borderRadius: '15px', outline: 'none', fontSize: '15px' }} 
          />
          <p style={{ fontSize: '11px', color: '#888', marginTop: '15px' }}>* Video sẽ được lưu trữ an toàn trên Cloudflare R2.</p>
        </div>
      )}

      {/* 3. THANH ĐIỀU HƯỚNG BOTTOM NAV (Bản phục hồi "Thời Phục Hưng") */}
      <nav style={{ 
        position: 'fixed', 
        bottom: 0, 
        width: '100%', 
        height: '85px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        backgroundColor: '#000', 
        borderTop: '0.5px solid #2c2c2e', 
        zIndex: 1000,
        paddingBottom: '20px' // Chừa khoảng trống cho thanh swipe trên iPhone
      }}>
        {/* Nút Giỏ hàng / Shop */}
        <div onClick={() => setView('feed')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: view === 'feed' ? 1 : 0.4 }}>
          <SupremeIcon name="cart" size={26} />
        </div>

        {/* Nút Khám phá / Global */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.4 }}>
          <SupremeIcon name="global" size={26} />
        </div>

        {/* Nút Thêm Video (+) */}
        <div onClick={() => setView('upload')} style={{ 
          width: '50px', 
          height: '35px', 
          borderRadius: '12px', 
          border: '2px solid #ffcc00', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent',
          transition: '0.2s all'
        }}>
          <SupremeIcon name="plus" size={24} color={view === 'upload' ? "#000" : "#ffcc00"} />
        </div>

        {/* Nút Home (Số 7 - Đã kích hoạt) */}
        <div onClick={() => setView('feed')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: view === 'feed' ? 1 : 0.4 }}>
          <SupremeIcon name="home" size={26} />
        </div>

        {/* Nút Hộp thư / Mail */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.4 }}>
          <SupremeIcon name="mail" size={26} />
        </div>
      </nav>

    </div>
  );
}
