"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; // Đấu nối kho Icon
import ProfilePage from './ProfilePage';      // Đấu nối trang Profile Boss

export default function SupremeMasterApp() {
  // Trạng thái điều hướng: 'feed' (Trang chủ video) hoặc 'profile' (Trang Boss)
  const [view, setView] = useState<'feed' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {/* ---------------------------------------------------------
          PHẦN 1: HIỂN THỊ NỘI DUNG (THAY ĐỔI THEO TRẠNG THÁI VIEW)
      ---------------------------------------------------------- */}
      {view === 'profile' ? (
        <ProfilePage /> 
      ) : (
        /* GIAO DIỆN VIDEO FEED (KẾT QUẢ ĐÃ ĐẠT CHUẨN CỦA CHÚNG TA) */
        <>
          {/* KÍNH LÚP */}
          <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}>
            <SupremeIcon name="search" size={28} />
          </div>

          {/* CỘT PHẢI - CĂN CHỈNH ĐỀU TUYỆT ĐỐI */}
          <div style={{ 
            position: 'absolute', right: '12px', bottom: '80px', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            justifyContent: 'space-between', height: '360px', zIndex: 100 
          }}>
            <SupremeIcon name="heart" size={32} />
            <SupremeIcon name="comment" size={32} />
            <SupremeIcon name="share" size={32} />
            <SupremeIcon name="save" size={32} />
            
            {/* NÚT LOA THÔNG MINH */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)} style={{ cursor: 'pointer' }}>
                <SupremeIcon name="volume" size={32} flip={true} /> 
              </div>
              {showVolMenu && (
                <div style={{ 
                  position: 'absolute', right: '55px', bottom: '0', width: '135px',
                  backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: '12px', border: '0.8px solid rgba(255,255,255,0.3)',
                  display: 'flex', flexDirection: 'column', overflow: 'hidden', backdropFilter: 'blur(10px)', zIndex: 200
                }}>
                  <div onClick={() => {setIsMuted(!isMuted); setShowVolMenu(false);}} style={{ padding: '12px', fontSize: '11px', borderBottom: '0.5px solid #333', cursor: 'pointer', color: '#fff' }}>
                    {isMuted ? "Mở âm thanh" : "Tắt âm thanh"}
                  </div>
                  <div style={{ padding: '12px', fontSize: '11px', borderBottom: '0.5px solid #333', color: '#fff' }}>Lưu âm thanh</div>
                  <div style={{ padding: '12px', fontSize: '11px', color: '#fff' }}>Sử dụng</div>
                </div>
              )}
            </div>

            {/* NÚT V #5 */}
            <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ cursor:'pointer', transition:'0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
              <SupremeIcon name="chevron" size={32} />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI - KÉO SÁT NÚT GIỎ HÀNG 1/3 */}
          <div style={{ position: 'absolute', bottom: '70px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '4px', border: '0.8px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <SupremeIcon name="store" size={14} color="#ffcc00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#111' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color:'#fff' }}>@architect</span>
                <span style={{ fontSize: '9px', color: '#ff4444', border: '0.8px solid #ff4444', padding: '0px 4px', borderRadius: '3px', width: 'fit-content' }}>+ follow</span>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#fff', margin: 0, opacity: 0.95 }}>Connect-Pi: Sup...</p>
          </div>
        </>
      )}

      {/* ---------------------------------------------------------
          PHẦN 2: THANH ĐIỀU HƯỚNG CỐ ĐỊNH (BOTTOM NAVIGATION)
      ---------------------------------------------------------- */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '82%', height: '65px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        background: 'linear-gradient(transparent, rgba(0,0,0,1))',
        transition: 'transform 0.4s ease',
        transform: isNavVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)',
        zIndex: 1000
      }}>
        {/* Nút Giỏ hàng #10 */}
        <div onClick={() => setView('feed')} style={{ cursor: 'pointer', opacity: view === 'feed' ? 1 : 0.6 }}>
          <SupremeIcon name="cart" size={26} />
        </div>

        {/* Nút Siêu thị #9 */}
        <SupremeIcon name="global" size={28} />

        {/* Nút Cộng + #8 */}
        <div style={{ width: '34px', height: '22px', borderRadius: '5px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SupremeIcon name="plus" size={16} color="#ffcc00" />
        </div>

        {/* NÚT HOME #7 - CHÌA KHÓA VÀO PROFILE ÔNG CHỦ */}
        <div onClick={() => setView(view === 'profile' ? 'feed' : 'profile')} style={{ cursor: 'pointer', opacity: view === 'profile' ? 1 : 0.6 }}>
          <SupremeIcon name="home" size={26} color={view === 'profile' ? "#ffcc00" : "#fff"} />
        </div>

        {/* Nút Hộp thư #6 */}
        <SupremeIcon name="mail" size={26} />
      </div>

    </div>
  );
                }
