"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {view === 'feed' && (
        <>
          <div style={{ position: 'absolute', top: '20px', right: '15px', zIndex: 100, opacity: 0.8 }}><SupremeIcon name="search" size={24} /></div>

          {/* 1. DÀN ĐỀU CÁC NÚT BÊN PHẢI (Lấy tim làm mốc) */}
          <div style={{ 
            position: 'absolute', right: '10px', bottom: '100px', 
            display: 'flex', flexDirection: 'column', 
            gap: '25px', // Tăng gap và cố định để dàn đều từ tim xuống
            alignItems: 'center', zIndex: 100 
          }}>
            <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={30} /><div style={{ fontSize: '10px', marginTop: '2px' }}>92</div></div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            {/* 3 & 4. NÚT LOA VÀ MENU CHUẨN HÓA (Phục hồi chức năng và ngăn cách) */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}><SupremeIcon name="volume" size={28} flip={true} /></div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '130px', backgroundColor: 'rgba(15,15,15,0.95)', borderRadius: '10px', border: '0.5px solid #333', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                  <div style={{ padding: '12px', fontSize: '12px', color: '#fff' }}>Âm thanh: Bật</div>
                  <div style={{ height: '0.5px', backgroundColor: '#333', margin: '0 10px' }}></div> {/* Ngăn cách chuẩn */}
                  <div style={{ padding: '12px', fontSize: '12px', color: '#fff' }}>Lưu âm thanh</div>
                </div>
              )}
            </div>
            {/* 3. NÚT V #5 PHỤC HỒI TÁC DỤNG (Bấm để đổi view hoặc đóng menu) */}
            <div onClick={() => setShowVolMenu(false)} style={{ cursor: 'pointer' }}><SupremeIcon name="chevron" size={28} /></div>
          </div>

          {/* 5. CỤM THÔNG TIN BÊN TRÁI (Hạ thấp xuống gần thanh điều hướng) */}
          <div style={{ position: 'absolute', bottom: '85px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '5px', border: '0.8px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SupremeIcon name="store" size={14} color="#ffcc00" /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>@tinhtam221986</div>
                <div style={{ fontSize: '9px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Connect-Pi: Supreme III 🦾</p>
          </div>
        </>
      )}

      {/* 2 & 6. THANH ĐIỀU HƯỚNG TRONG SUỐT & THU GỌN KHOẢNG CÁCH NÚT */}
      <div style={{ 
        position: 'fixed', bottom: 0, width: '100%', height: '65px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', // Căn giữa toàn bộ cụm nút
        backgroundColor: 'transparent', // Trong suốt hoàn toàn
        zIndex: 1000 
      }}>
        {/* Container bọc các nút để co cụm lại, không dàn trải hết màn hình */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 25px', borderRadius: '30px' }}>
          <div onClick={() => setView('feed')} style={{ opacity: view === 'feed' ? 1 : 0.4 }}><SupremeIcon name="cart" size={22} /></div>
          <div style={{ opacity: 0.4 }}><SupremeIcon name="global" size={22} /></div>
          
          <div onClick={() => setView('upload')} style={{ 
            width: '42px', height: '28px', borderRadius: '8px', border: '1.5px solid #ffcc00', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' 
          }}>
            <SupremeIcon name="plus" size={18} color={view === 'upload' ? "#000" : "#ffcc00"} />
          </div>

          <div onClick={() => setView('feed')} style={{ opacity: view === 'feed' ? 1 : 0.4 }}><SupremeIcon name="home" size={22} /></div>
          <div style={{ opacity: 0.4 }}><SupremeIcon name="mail" size={22} /></div>
        </div>
      </div>
    </div>
  );
            }
