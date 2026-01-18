"use client";
import React, { useState, useEffect } from 'react';

// --- PHẦN 1: HỆ THỐNG ICON (ASSETS) - DỄ DÀNG BẢO TRÌ ---
// Khi cần thay đổi hình dáng nút, bạn chỉ cần sửa code SVG tại đây.
const APP_ICONS = {
  SEARCH: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  HEART: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  COMMENT: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  SHARE: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
  SAVE: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>,
  STORE: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  HOME: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  CART: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
  MAIL: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  PLUS: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  MASTER_V: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  BOT: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>
};

export default function ConnectPiApp() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [captionOpen, setCaptionOpen] = useState(false);

  // --- PHẦN 2: LOGIC TỌA ĐỘ GRID 30x40 ---
  const calculatePosition = (x: number, y: number) => ({
    left: `${(x / 30) * 100}%`,
    bottom: `${(y / 40) * 100}%`,
    transform: 'translateX(-50%)'
  });

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', color: '#fff', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* 1. LỚP NỘI DUNG (CONTENT LAYER - Z:10) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        
        {/* CỤM TƯƠNG TÁC PHẢI (RIGHT ACTION BAR) - TỌA ĐỘ CHUẨN */}
        <div style={{ position: 'absolute', ...calculatePosition(27.5, 37.5) }}><APP_ICONS.SEARCH /></div>
        <div style={{ position: 'absolute', ...calculatePosition(27.5, 24) }}><APP_ICONS.HEART /><span style={{fontSize:'10px', fontWeight:'bold'}}>92</span></div>
        <div style={{ position: 'absolute', ...calculatePosition(27.5, 19) }}><APP_ICONS.COMMENT /></div>
        <div style={{ position: 'absolute', ...calculatePosition(27.5, 14) }}><APP_ICONS.SHARE /></div>
        <div style={{ position: 'absolute', ...calculatePosition(27.5, 9) }}><APP_ICONS.SAVE /></div>
        <div style={{ position: 'absolute', ...calculatePosition(27.5, 4) }}><APP_ICONS.MAIL /></div>

        {/* CỤM THÔNG TIN TRÁI (LEFT INFO) */}
        <div style={{ position: 'absolute', bottom: '5%', left: '3%', width: '80%', display:'flex', flexDirection:'column', gap:'12px' }}>
          
          {/* #14 SHOP KHÁCH */}
          <div style={{ width:'fit-content', padding:'5px 10px', borderRadius:'8px', border:'1.5px solid #ffcc00', backgroundColor:'rgba(0,0,0,0.4)', textAlign:'center', cursor:'pointer' }}>
            <div style={{color:'#ffcc00'}}><APP_ICONS.STORE /></div>
            <div style={{fontSize:'8px', fontWeight:'bold', color:'#ffcc00'}}>SHOP</div>
          </div>

          {/* #13 AVATAR & USER */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'50px', height:'50px', borderRadius:'50%', border:'2px solid #fff', backgroundColor:'#333' }} />
            <div style={{ display:'flex', flexDirection:'column' }}>
              <span style={{ fontWeight:'bold', fontSize:'16px' }}>@architect</span>
              <span style={{ fontSize:'10px', color:'#ff4444', border:'1px solid #ff4444', padding:'1px 8px', borderRadius:'5px', width:'fit-content' }}>+ follow</span>
            </div>
          </div>

          {/* #12 CAPTION (LOGIC 15 KÝ TỰ) */}
          <div onClick={() => setCaptionOpen(!captionOpen)} style={{ cursor:'pointer' }}>
            <p style={{ fontSize:'15px', maxWidth:'90%' }}>
              {captionOpen ? "Connect-Pi: Supreme Web3 Experience 2026. Một tầm nhìn chiến lược từ Ban Giám Đốc." : "Connect-Pi: Sup..."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. LỚP HỆ THỐNG - NAV ĐÁY (SYSTEM LAYER - Z:90) */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '95px', 
        background: 'linear-gradient(transparent, rgba(0,0,0,0.95))',
        transition: 'transform 0.4s ease',
        transform: isNavVisible ? 'translateY(0)' : 'translateY(110px)',
        zIndex: 90, pointerEvents: 'none'
      }}>
        <div style={{ position: 'absolute', ...calculatePosition(6, 1.5), pointerEvents:'auto' }}><APP_ICONS.CART /></div>
        <div style={{ position: 'absolute', ...calculatePosition(11, 1.5), pointerEvents:'auto' }}><APP_ICONS.STORE /></div>
        <div style={{ position: 'absolute', ...calculatePosition(16, 1.5), pointerEvents:'auto', color:'#ffcc00' }}><APP_ICONS.PLUS /></div>
        <div style={{ position: 'absolute', ...calculatePosition(21, 1.5), pointerEvents:'auto' }}><APP_ICONS.HOME /></div>
        <div style={{ position: 'absolute', ...calculatePosition(26, 1.5), pointerEvents:'auto' }}><APP_ICONS.MAIL /></div>
      </div>

      {/* 3. LỚP ĐIỀU KHIỂN - MASTER V & BOT (Z:100) */}
      {/* Nút #5 Master V */}
      <div 
        onClick={() => setIsNavVisible(!isNavVisible)}
        style={{ 
          position: 'fixed', ...calculatePosition(28.5, 0.8), zIndex: 100, cursor: 'pointer',
          transition: 'transform 0.3s', transform: `translateX(-50%) rotate(${isNavVisible ? '0deg' : '180deg'})`,
          color: isNavVisible ? '#fff' : '#ffcc00'
        }}
      >
        <APP_ICONS.MASTER_V />
      </div>

      {/* Nút #18 Bot AI */}
      <div style={{ 
        position: 'fixed', top: '20%', right: '5%', zIndex: 100,
        backgroundColor:'#0033ff', padding:'12px', borderRadius:'50%', border:'2px solid #fff',
        boxShadow: '0 0 20px rgba(0, 51, 255, 0.5)'
      }}>
        <APP_ICONS.BOT />
      </div>

    </div>
  );
                     }
