"use client";
import React, { useState } from 'react';

// --- HỆ THỐNG ICON SIÊU MẢNH (STROKE 0.8 - 1.0) ---
const SupremeIcon = ({ name, size = 26, color = "#FFFFFF", flip = false }: { name: string, size?: number, color?: string, flip?: boolean }) => {
  const filterStyle = { 
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,1))',
    transform: flip ? 'scaleX(-1)' : 'none' // Lật icon loa quay vào trong
  };
  
  const icons: any = {
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    comment: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
    save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    volume: <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>,
    global: <><path d="M3 21h18M3 7l9-5 9 5v14H3V7z" /><circle cx="12" cy="13" r="4" /><line x1="8" y1="13" x2="16" y2="13" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    store: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><rect x="10" y="14" width="4" height="8" /></>
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" style={filterStyle}>
      {icons[name]}
    </svg>
  );
};

export default function SupremeIV() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showVolMenu, setShowVolMenu] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      
      {/* 1. CỘT PHẢI - NÉN KHOẢNG CÁCH XUỐNG ĐÁY */}
      <div style={{ 
        position: 'absolute', right: '12px', bottom: '80px', // Hạ thấp toàn bộ cột
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'flex-end', gap: '18px', zIndex: 100 
      }}>
        <SupremeIcon name="heart" size={30} />
        <SupremeIcon name="comment" size={32} />
        <SupremeIcon name="share" size={32} />
        <SupremeIcon name="save" size={32} />
        
        {/* NÚT LOA #11 - TĂNG 4/3, QUAY VÀO TRONG, MENU 3 NGĂN */}
        <div style={{ position: 'relative' }}>
          <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}>
            <SupremeIcon name="volume" size={42} flip={true} /> 
          </div>
          {showVolMenu && (
            <div style={{ 
              position: 'absolute', right: '50px', bottom: '0', width: '140px',
              backgroundColor: 'rgba(0,0,0,0.85)', borderRadius: '10px', border: '0.8px solid #fff',
              display: 'flex', flexDirection: 'column', overflow: 'hidden', backdropFilter: 'blur(5px)'
            }}>
              <div style={{ padding: '10px', fontSize: '11px', borderBottom: '0.5px solid #444' }}>Tắt/mở âm thanh</div>
              <div style={{ padding: '10px', fontSize: '11px', borderBottom: '0.5px solid #444' }}>Lưu âm thanh</div>
              <div style={{ padding: '10px', fontSize: '11px' }}>Sử dụng</div>
            </div>
          )}
        </div>

        {/* NÚT V #5 - CÁCH NÚT HỘP THƯ 1/2 KHOẢNG CÁCH */}
        <div 
          onClick={() => setIsNavVisible(!isNavVisible)} 
          style={{ cursor:'pointer', transition:'0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          <SupremeIcon name="chevron" size={32} />
        </div>
      </div>

      {/* 2. CỤM TRÁI - KÉO XUỐNG SÁT NÚT GIỎ HÀNG (1/3 KHOẢNG CÁCH) */}
      <div style={{ 
        position: 'absolute', bottom: '72px', left: '15px', zIndex: 100, 
        display: 'flex', flexDirection: 'column', gap: '6px' 
      }}>
        <div style={{ 
          width: '24px', height: '24px', borderRadius: '4px', border: '0.8px solid #ffcc00', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)'
        }}>
          <SupremeIcon name="store" size={14} color="#ffcc00" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#111' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color:'#fff' }}>@architect</span>
            <span style={{ fontSize: '9px', color: '#ff4444', border: '0.8px solid #ff4444', padding: '0px 5px', borderRadius: '3px', width: 'fit-content' }}>+ follow</span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#fff', margin: 0, opacity: 0.9 }}>Connect-Pi: Sup...</p>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG ĐÁY - SIÊU CÔ ĐẶNG */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '65px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        background: 'linear-gradient(transparent, rgba(0,0,0,1))',
        transition: 'transform 0.4s cubic-bezier(0.1, 0.7, 0.1, 1)',
        transform: isNavVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)',
        zIndex: 90
      }}>
        <SupremeIcon name="cart" size={26} />
        <SupremeIcon name="global" size={28} />
        <div style={{ width: '34px', height: '22px', borderRadius: '5px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SupremeIcon name="plus" size={16} color="#ffcc00" />
        </div>
        <SupremeIcon name="home" size={26} />
        <SupremeIcon name="mail" size={26} />
      </div>

    </div>
  );
          }
      
