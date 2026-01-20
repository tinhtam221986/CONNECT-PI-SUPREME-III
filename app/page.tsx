"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Quản lý trạng thái loa

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {view === 'feed' && (
        <>
          <div style={{ position: 'absolute', top: '20px', right: '15px', zIndex: 100, opacity: 0.8 }}><SupremeIcon name="search" size={24} /></div>

          {/* 1 & 3. DÀN ĐỀU CỘT PHẢI XUỐNG SÁT ĐÁY & KHÔI PHỤC NÚT V #5 */}
          <div style={{ 
            position: 'absolute', right: '10px', 
            bottom: '25px', // Kéo xuống sát đáy (cùng khoảng cách gap)
            display: 'flex', flexDirection: 'column', 
            gap: '25px', 
            alignItems: 'center', zIndex: 100 
          }}>
            <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={30} /><div style={{ fontSize: '10px', marginTop: '2px' }}>92</div></div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            
            {/* 4. NÚT LOA 🔊 CHUẨN HÓA 3 NGĂN CHỨC NĂNG */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}>
                <SupremeIcon name="volume" size={28} flip={true} color={isMuted ? "#ff4444" : "#fff"} />
              </div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '45px', bottom: '0', width: '150px', backgroundColor: 'rgba(15,15,15,0.98)', borderRadius: '10px', border: '0.5px solid #333', overflow: 'hidden' }}>
                  <div onClick={() => {setIsMuted(!isMuted); setShowVolMenu(false)}} style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>
                    {isMuted ? "🔈 Mở âm thanh" : "🔇 Tắt âm thanh"}
                  </div>
                  <div style={{ height: '0.5px', backgroundColor: '#333' }}></div>
                  <div style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>🎵 Lưu âm thanh</div>
                  <div style={{ height: '0.5px', backgroundColor: '#333' }}></div>
                  <div style={{ padding: '12px', fontSize: '12px', cursor: 'pointer' }}>✨ Sử dụng</div>
                </div>
              )}
            </div>

            {/* 3. KHÔI PHỤC TÁC DỤNG NÚT V #5 */}
            <div onClick={() => { setShowVolMenu(false); /* Thêm logic chuyển video tại đây */ }} style={{ cursor: 'pointer', transform: 'rotate(0deg)' }}>
              <SupremeIcon name="chevron" size={28} />
            </div>
          </div>

          {/* 5. CỤM THÔNG TIN BÊN TRÁI (Kéo xuống sát đáy) */}
          <div style={{ position: 'absolute', bottom: '45px', left: '12px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

      {/* 2. THANH ĐIỀU HƯỚNG SÁT MÉP DƯỚI & THU NHỎ NÚT + #8 */}
      <div style={{ 
        position: 'fixed', bottom: '5px', // Sát mép dưới cùng
        width: '100%', height: '45px', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        backgroundColor: 'transparent', zIndex: 1000 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 25px', borderRadius: '30px' }}>
          <div onClick={() => setView('feed')} style={{ opacity: 0.9 }}><SupremeIcon name="cart" size={22} /></div>
          <div style={{ opacity: 0.9 }}><SupremeIcon name="global" size={22} /></div>
          
          {/* NÚT + #8 (Thu nhỏ bằng 3/5 kích thước cũ) */}
          <div onClick={() => setView('upload')} style={{ 
            width: '30px', height: '20px', // Đã thu nhỏ
            borderRadius: '5px', border: '1.2px solid #ffcc00', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' 
          }}>
            <SupremeIcon name="plus" size={14} color={view === 'upload' ? "#000" : "#ffcc00"} />
          </div>

          <div onClick={() => setView('feed')} style={{ opacity: 0.9 }}><SupremeIcon name="home" size={22} /></div>
          <div style={{ opacity: 0.9 }}><SupremeIcon name="mail" size={22} /></div>
        </div>
      </div>
    </div>
  );
      }
