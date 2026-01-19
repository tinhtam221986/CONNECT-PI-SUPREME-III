"use client";
import React, { useState, useEffect } from 'react';

// --- HỆ THỐNG ICON SIÊU MẢNH (STROKE 1.0) & VIỀN ĐEN MỜ (GLOW BLACK) ---
const SupremeIcon = ({ name, size = 26, color = "#FFFFFF" }: { name: string, size?: number, color?: string }) => {
  const filterStyle = { filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,1)) drop-shadow(0px 0px 0.5px rgba(0,0,0,1))' };
  
  const icons: any = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    comment: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
    save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    volume: <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    // Đã bọc Fragment <> </> để tránh lỗi "Expected ',', got 'cx'"
    cart: <>
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>,
    global: <>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>,
    plus: <path d="M12 5v14M5 12h14" />,
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    mail: <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>,
    store: <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <line x1="9" y1="22" x2="9" y2="12" /><line x1="15" y1="22" x2="15" y2="12" />
    </>
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={filterStyle}>
      {icons[name]}
    </svg>
  );
};

export default function SupremeFinal() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. CỘT 6 NÚT BÊN PHẢI (THẲNG HÀNG DỌC) */}
      <div style={{ position: 'absolute', right: '12px', bottom: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', zIndex: 100 }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <SupremeIcon name="heart" />
          <span style={{fontSize:'10px', marginTop:'2px', color:'#fff', textShadow:'1px 1px 2px #000'}}>92</span>
        </div>
        <SupremeIcon name="comment" />
        <SupremeIcon name="share" />
        <SupremeIcon name="save" />
        <SupremeIcon name="volume" />
        <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ cursor:'pointer', transition:'0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
          <SupremeIcon name="chevron" />
        </div>
      </div>

      {/* 2. CỤM TRÁI (AVATAR & SHOP - THU NHỎ 3/4) */}
      <div style={{ position: 'absolute', bottom: '100px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* #14 SHOP CHỦ VIDEO */}
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '6px', border: '1px solid rgba(255,204,0,0.7)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)', boxShadow: '0 0 4px rgba(0,0,0,0.8)'
        }}>
          <SupremeIcon name="store" size={16} color="#ffcc00" />
          <span style={{ fontSize: '6px', color: '#ffcc00', fontWeight: 'bold' }}>SHOP</span>
        </div>

        {/* #13 AVATAR & USERNAME */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#111', boxShadow: '0 0 4px rgba(0,0,0,0.8)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color:'#fff', textShadow: '1px 1px 2px #000' }}>@architect</span>
            <span style={{ fontSize: '9px', color: '#ff4444', border: '1px solid #ff4444', padding: '0px 5px', borderRadius: '3px', width: 'fit-content' }}>+ follow</span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#fff', textShadow: '1px 1px 2px #000', margin: 0 }}>Connect-Pi: Sup...</p>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG ĐÁY (6 NÚT - CHUẨN TRUNG TÂM) */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '75px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.95))',
        transition: 'transform 0.4s ease',
        transform: isNavVisible ? 'translateY(0)' : 'translateY(100px)',
        zIndex: 90
      }}>
        <SupremeIcon name="cart" size={24} />
        <SupremeIcon name="global" size={24} />
        
        {/* #8 ĐĂNG VIDEO (TRUNG TÂM TUYỆT ĐỐI) */}
        <div style={{ 
          width: '42px', height: '28px', borderRadius: '6px', border: '1px solid #ffcc00', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,204,0,0.1)'
        }}>
          <SupremeIcon name="plus" size={20} color="#ffcc00" />
        </div>

        <SupremeIcon name="home" size={24} />
        <SupremeIcon name="mail" size={24} />
      </div>

    </div>
  );
      }
