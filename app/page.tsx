"use client";
import React, { useState } from 'react';

const SupremeIcon = ({ name, size = 26, color = "#FFFFFF" }: { name: string, size?: number, color?: string }) => {
  const filterStyle = { filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,1)) drop-shadow(0px 0px 0.5px rgba(0,0,0,1))' };
  
  const icons: any = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    comment: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
    save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    // Mục 3: Lật lại nút loa quay vào trong
    volume: <path d="M13 5l5 4h4v6h-4l-5 4V5zM4.93 19.07a10 10 0 0 1 0-14.14M8.46 15.54a5 5 0 0 1 0-7.07" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    cart: <>
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>,
    // Mục 5: Siêu thị toàn cầu (Địa cầu lồng trong khung cửa hàng)
    global: <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="4" /><line x1="8" y1="13" x2="16" y2="13" /><path d="M12 9a6 6 0 0 1 0 8" />
    </>,
    plus: <path d="M12 5v14M5 12h14" />,
    // Mục 4: Nút Home có thêm cánh cửa ở giữa
    home: <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>,
    mail: <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>,
    store: <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <rect x="10" y="14" width="4" height="8" />
    </>
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={filterStyle}>
      {icons[name]}
    </svg>
  );
};

export default function SupremeFinalV2() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {/* MỤC 2: CỘT PHẢI - KÉO XUỐNG DƯỚI (Bottom 95px thay vì 15%) */}
      <div style={{ 
        position: 'absolute', right: '12px', bottom: '95px', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 100 
      }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <SupremeIcon name="heart" />
          <span style={{fontSize:'10px', marginTop:'2px', color:'#fff', textShadow:'1px 1px 2px #000'}}>92</span>
        </div>
        <SupremeIcon name="comment" />
        <SupremeIcon name="share" />
        <SupremeIcon name="save" />
        <SupremeIcon name="volume" /> {/* Đã lật lại hướng vào trong */}
        <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ cursor:'pointer', transition:'0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
          <SupremeIcon name="chevron" />
        </div>
      </div>

      {/* MỤC 1: CỤM TRÁI - KÉO SÁT THANH ĐÁY (Bottom 85px) */}
      <div style={{ 
        position: 'absolute', bottom: '85px', left: '12px', zIndex: 100, 
        display: 'flex', flexDirection: 'column', gap: '10px' 
      }}>
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '6px', border: '1px solid rgba(255,204,0,0.7)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)', boxShadow: '0 0 4px rgba(0,0,0,0.8)'
        }}>
          <SupremeIcon name="store" size={16} color="#ffcc00" />
          <span style={{ fontSize: '6px', color: '#ffcc00', fontWeight: 'bold' }}>SHOP</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#111' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color:'#fff' }}>@architect</span>
            <span style={{ fontSize: '9px', color: '#ff4444', border: '1px solid #ff4444', padding: '0px 5px', borderRadius: '3px', width: 'fit-content' }}>+ follow</span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Connect-Pi: Sup...</p>
      </div>

      {/* THANH ĐIỀU HƯỚNG ĐÁY */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 25px', background: 'linear-gradient(transparent, rgba(0,0,0,1))',
        zIndex: 90
      }}>
        <SupremeIcon name="cart" size={24} />
        <SupremeIcon name="global" size={24} /> {/* Đã lồng địa cầu vào shop */}
        
        <div style={{ 
          width: '42px', height: '28px', borderRadius: '6px', border: '1.2px solid #ffcc00', 
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <SupremeIcon name="plus" size={20} color="#ffcc00" />
        </div>

        <SupremeIcon name="home" size={24} /> {/* Đã thêm cánh cửa */}
        <SupremeIcon name="mail" size={24} />
      </div>

    </div>
  );
        }
