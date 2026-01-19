"use client";
import React, { useState, useEffect } from 'react';

// --- HỆ THỐNG ICON MẢNH (ULTRA-THIN) & VIỀN ĐEN MỜ ---
const SupremeIcon = ({ name, size = 26, color = "#FFFFFF" }: { name: string, size?: number, color?: string }) => {
  const shadowStyle = { filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,1))' };
  const icons: any = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    comment: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
    save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    volume: <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    cart: <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />,
    global: <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />,
    store: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><rect x="9" y="22" width="6" height="10" />
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={shadowStyle}>
      {icons[name]}
    </svg>
  );
};

export default function SupremeIII() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', color: '#fff', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. CỘT 5 NÚT BÊN PHẢI (Z-INDEX 100) - THẲNG HÀNG DỌC, KHOẢNG CÁCH ĐỀU */}
      <div style={{ position: 'absolute', right: '15px', top: '40%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', zIndex: 100 }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}><SupremeIcon name="heart" /><span style={{fontSize:'10px', marginTop:'2px'}}>92</span></div>
        <SupremeIcon name="comment" />
        <SupremeIcon name="share" />
        <SupremeIcon name="save" />
        <SupremeIcon name="volume" /> {/* Đã cập nhật nút Loa #11 */}
      </div>

      {/* 2. CỤM TRÁI (AVATAR & SHOP) - THU NHỎ 3/4, HÀI HÒA */}
      <div style={{ position: 'absolute', bottom: '110px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* #14 SHOP CHỦ VIDEO (Mảnh, có viền mờ) */}
        <div style={{ 
          width: '38px', height: '38px', borderRadius: '8px', border: '1px solid rgba(255,204,0,0.8)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: '0 0 4px rgba(0,0,0,1)'
        }}>
          <SupremeIcon name="store" size={18} color="#ffcc00" />
          <span style={{ fontSize: '7px', color: '#ffcc00', fontWeight: 'bold' }}>SHOP</span>
        </div>

        {/* #13 AVATAR CHỦ VIDEO (Thu nhỏ 3/4) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.2px solid #fff', backgroundColor: '#222', boxShadow: '0 0 5px rgba(0,0,0,1)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', textShadow: '1px 1px 2px #000' }}>@architect</span>
            <span style={{ fontSize: '9px', color: '#ff4444', border: '0.8px solid #ff4444', padding: '0px 6px', borderRadius: '4px', width: 'fit-content' }}>+ follow</span>
          </div>
        </div>

        {/* CAPTION */}
        <p style={{ fontSize: '13px', maxWidth: '220px', textShadow: '1px 1px 2px #000' }}>Connect-Pi: Sup...</p>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG ĐÁY (6 NÚT) - CÂN ĐỐI TRUNG TÂM */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        padding: '0 10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: isNavVisible ? 'translateY(0)' : 'translateY(100px)',
        zIndex: 90
      }}>
        <SupremeIcon name="cart" size={24} />   {/* #10 Giỏ hàng */}
        <SupremeIcon name="global" size={24} /> {/* #9 Siêu thị toàn cầu (Icon Quả địa cầu mảnh) */}
        
        {/* #8 ĐĂNG VIDEO - CHÍNH GIỮA TRUNG TÂM */}
        <div style={{ 
          width: '45px', height: '30px', borderRadius: '8px', border: '1.2px solid #ffcc00', 
          display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <SupremeIcon name="plus" size={22} color="#ffcc00" />
        </div>

        <SupremeIcon name="home" size={24} />   {/* #7 Home */}
        <SupremeIcon name="mail" size={24} />   {/* #6 Hòm thư */}
        
        {/* #5 MASTER V (Gắn vào cuối thanh điều hướng để đồng bộ) */}
        <div onClick={() => setIsNavVisible(false)} style={{ cursor:'pointer' }}>
          <SupremeIcon name="chevron" size={22} />
        </div>
      </div>

      {/* NÚT XỔ LÊN KHI THANH NAV ĐÓNG */}
      {!isNavVisible && (
        <div 
          onClick={() => setIsNavVisible(true)}
          style={{ position: 'fixed', bottom: '15px', left: '50%', transform: 'translateX(-50%) rotate(180deg)', zIndex: 110, cursor:'pointer' }}
        >
          <SupremeIcon name="chevron" size={28} color="#ffcc00" />
        </div>
      )}

    </div>
  );
    }
