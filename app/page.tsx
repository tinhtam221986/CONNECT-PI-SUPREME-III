"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {/* NÚT TÌM KIẾM TRÊN CÙNG */}
      <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}><SupremeIcon name="search" size={28} /></div>

      {/* CỘT ICON BÊN PHẢI */}
      <div style={{ position: 'absolute', right: '12px', bottom: '90px', display: 'flex', flexDirection: 'column', gap: '22px', alignItems: 'center', zIndex: 100 }}>
        <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={34} /><div style={{ fontSize: '11px' }}>92</div></div>
        <SupremeIcon name="comment" size={32} />
        <SupremeIcon name="share" size={32} />
        <SupremeIcon name="save" size={32} />
        
        {/* NÚT LOA 2 NGĂN CHUẨN */}
        <div style={{ position: 'relative' }}>
          <div onClick={() => setShowVolMenu(!showVolMenu)}><SupremeIcon name="volume" size={32} flip={true} /></div>
          {showVolMenu && (
            <div style={{ position: 'absolute', right: '50px', bottom: '0', width: '130px', backgroundColor: 'rgba(20,20,20,0.95)', borderRadius: '10px', border: '0.5px solid #444', overflow: 'hidden' }}>
              <div style={{ padding: '12px', fontSize: '12px', borderBottom: '0.5px solid #333' }}>Âm thanh: Bật</div>
              <div style={{ padding: '12px', fontSize: '12px' }}>Lưu âm thanh</div>
            </div>
          )}
        </div>
        <SupremeIcon name="chevron" size={32} />
      </div>

      {/* THÔNG TIN NGƯỜI DÙNG & NÚT #14 SHOP, #15 FOLLOW */}
      <div style={{ position: 'absolute', bottom: '85px', left: '15px', z { display: 'flex', flexDirection: 'column', gap: '10px' } }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SupremeIcon name="cart" size={18} color="#ffcc00" /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#333' }} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>@tinhtam221986</div>
            <div style={{ fontSize: '10px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '3px', marginTop: '3px' }}>+ follow</div>
          </div>
        </div>
        <p style={{ fontSize: '14px', margin: 0 }}>Connect-Pi: Supreme III 🦾</p>
      </div>

      {/* THANH ĐIỀU HƯỚNG DƯỚI - TỈ LỆ VÀNG */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '75px', display: 'flex', alignItems: 'center', backgroundColor: '#000', borderTop: '0.5px solid #222', zIndex: 1000 }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><SupremeIcon name="cart" size={26} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><SupremeIcon name="global" size={26} /></div>
        
        {/* NÚT CỘNG TRUNG TÂM */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => setView('upload')} style={{ width: '48px', height: '32px', borderRadius: '10px', border: '2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SupremeIcon name="plus" size={22} color="#ffcc00" />
          </div>
        </div>

        <div onClick={() => setView('profile')} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><SupremeIcon name="home" size={26} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><SupremeIcon name="mail" size={26} /></div>
      </div>
    </div>
  );
                         }
