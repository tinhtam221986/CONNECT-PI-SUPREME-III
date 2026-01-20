"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* MÀN HÌNH FEED VIDEO */}
      {view === 'feed' && (
        <>
          {/* SEARCH NẰM GỌN GÀNG GÓC TRÊN */}
          <div style={{ position: 'absolute', top: '20px', right: '15px', zIndex: 100, opacity: 0.8 }}><SupremeIcon name="search" size={24} /></div>

          {/* CỘT ICON PHẢI - TINH CHỈNH MẢNH 0.9MM */}
          <div style={{ position: 'absolute', right: '10px', bottom: '80px', display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', zIndex: 100 }}>
            <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={30} /><div style={{ fontSize: '10px', marginTop: '2px' }}>92</div></div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)}><SupremeIcon name="volume" size={28} flip={true} /></div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '120px', backgroundColor: 'rgba(10,10,10,0.95)', borderRadius: '8px', border: '0.5px solid #333' }}>
                  <div style={{ padding: '10px', fontSize: '11px', borderBottom: '0.5px solid #222' }}>Âm thanh: Bật</div>
                  <div style={{ padding: '10px', fontSize: '11px' }}>Lưu âm thanh</div>
                </div>
              )}
            </div>
            <SupremeIcon name="chevron" size={28} />
          </div>

          {/* THÔNG TIN NGƯỜI DÙNG - TINH GỌN */}
          <div style={{ position: 'absolute', bottom: '80px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '5px', border: '0.8px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SupremeIcon name="store" size={14} color="#ffcc00" /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '0.8px solid #fff', backgroundColor: '#222' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>@tinhtam221986</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '0px 4px', borderRadius: '2px', marginTop: '1px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', margin: 0, opacity: 0.8 }}>Connect-Pi: Supreme III 🦾</p>
          </div>
        </>
      )}

      {/* TRANG UPLOAD (NÚT #8) */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '30px 15px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '18px', color: '#fff' }}>TẢI VIDEO 🚀</h2>
          <div style={{ width: '100%', height: '200px', border: '1px dashed #ffcc00', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
             <SupremeIcon name="plus" size={32} color="#ffcc00" />
          </div>
          <textarea placeholder="Mô tả video..." style={{ width: '100%', backgroundColor: '#111', border: '0.5px solid #333', padding: '12px', color: '#fff', marginTop: '15px', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
        </div>
      )}

      {/* THANH ĐIỀU HƯỚNG SIÊU TINH GỌN - CHUẨN TỈ LỆ 1:1 */}
      <div style={{ 
        position: 'fixed', bottom: 0, width: '100%', height: '55px', 
        display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.95)', 
        borderTop: '0.5px solid #1a1a1a', zIndex: 1000 
      }}>
        <div onClick={() => setView('feed')} style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: view === 'feed' ? 1 : 0.4 }}><SupremeIcon name="cart" size={22} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.4 }}><SupremeIcon name="global" size={22} /></div>
        
        {/* NÚT CỘNG TRUNG TÂM (#8) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => setView('upload')} style={{ width: '40px', height: '26px', borderRadius: '6px', border: '1.2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' }}>
            <SupremeIcon name="plus" size={18} color={view === 'upload' ? "#000" : "#ffcc00"} />
          </div>
        </div>

        {/* NÚT HOME (#7) - ĐÃ KHÔI PHỤC HOẠT ĐỘNG */}
        <div onClick={() => setView('feed')} style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: view === 'feed' ? 1 : 0.4 }}>
          <SupremeIcon name="home" size={22} />
        </div>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.4 }}><SupremeIcon name="mail" size={22} /></div>
      </div>
    </div>
  );
            }
          
