"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. TRANG FEED CHUẨN SUPREME */}
      {view === 'feed' && (
        <>
          <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}><SupremeIcon name="search" size={28} /></div>
          
          <div style={{ position: 'absolute', right: '12px', bottom: '95px', display: 'flex', flexDirection: 'column', gap: '22px', alignItems: 'center', zIndex: 100 }}>
            <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={34} /><div style={{ fontSize: '11px', marginTop: '4px' }}>92</div></div>
            <SupremeIcon name="comment" size={32} />
            <SupremeIcon name="share" size={32} />
            <SupremeIcon name="save" size={32} />
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

          <div style={{ position: 'absolute', bottom: '90px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SupremeIcon name="store" size={18} color="#ffcc00" /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#333' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>@tinhtam221986</div>
                <div style={{ fontSize: '10px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '3px', marginTop: '3px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Connect-Pi: Supreme III 🦾</p>
          </div>
        </>
      )}

      {/* 2. TRANG UPLOAD GIẢ LẬP ĐỂ TEST GIAO DIỆN */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px' }}><SupremeIcon name="chevron" size={30} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '20px', color: '#fff' }}>TẢI VIDEO THẬT 🚀</h2>
          <div style={{ width: '100%', height: '220px', border: '1.5px dashed #ffcc00', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
             <SupremeIcon name="plus" size={40} color="#ffcc00" />
          </div>
          <textarea placeholder="Nhập mô tả..." style={{ width: '100%', height: '100px', backgroundColor: '#111', border: 'none', padding: '15px', color: '#fff', marginTop: '20px', borderRadius: '12px' }} />
        </div>
      )}

      {/* 3. THANH ĐIỀU HƯỚNG DƯỚI - KHÔI PHỤC TỈ LỆ VÀNG */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '75px', display: 'flex', alignItems: 'center', backgroundColor: '#000', borderTop: '0.5px solid #222', zIndex: 1000 }}>
        <div onClick={() => setView('feed')} style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: view === 'feed' ? 1 : 0.5 }}><SupremeIcon name="cart" size={26} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.5 }}><SupremeIcon name="global" size={26} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => setView('upload')} style={{ width: '48px', height: '32px', borderRadius: '10px', border: '2px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' }}>
            <SupremeIcon name="plus" size={22} color={view === 'upload' ? "#000" : "#ffcc00"} />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.5 }}><SupremeIcon name="home" size={26} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.5 }}><SupremeIcon name="mail" size={26} /></div>
      </div>
    </div>
  );
          }
