"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 
import ProfilePage from './ProfilePage';      

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [myVideos, setMyVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Mạch máu API
  useEffect(() => {
    if (view === 'profile') {
      fetch('/api/videos').then(res => res.json()).then(data => { if(Array.isArray(data)) setMyVideos(data); }).catch(() => {});
    }
  }, [view]);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', (document.getElementById('vCap') as HTMLInputElement).value || "");
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) { setView('profile'); } 
      else { alert("Lỗi: Cần tạo file API Upload để thực thi lệnh này."); }
    } catch { alert("Hệ thống Backend chưa kích hoạt."); }
    finally { setUploading(false); }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {view === 'profile' && <ProfilePage videoList={myVideos} />}
      
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '50px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px' }}><SupremeIcon name="chevron" size={30} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{uploading ? "ĐANG TẢI..." : "TẢI VIDEO THẬT 🚀"}</h2>
          <div style={{ width: '100%', height: '220px', border: '2px dashed #ffcc00', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
             <SupremeIcon name="plus" size={40} color="#ffcc00" />
             <input type="file" accept="video/*" onChange={handleUpload} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }} />
          </div>
          <input id="vCap" placeholder="Nhập tiêu đề video..." style={{ width: '100%', backgroundColor: '#111', border: 'none', padding: '15px', color: '#fff', marginTop: '20px', borderRadius: '10px' }} />
        </div>
      )}

      {view === 'feed' && (
        <>
          {/* SEARCH NẰM TRÊN CÙNG PHẢI */}
          <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}><SupremeIcon name="search" size={28} /></div>

          {/* CỘT PHẢI - ICON MẢNH 0.9MM CHUẨN TỈ LỆ */}
          <div style={{ position: 'absolute', right: '12px', bottom: '85px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '380px', zIndex: 100 }}>
            <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={32} /><div style={{ fontSize: '10px', color: '#fff', marginTop: '4px' }}>92</div></div>
            <SupremeIcon name="comment" size={32} />
            <SupremeIcon name="share" size={32} />
            <SupremeIcon name="save" size={32} />
            
            {/* NÚT VOLUME #11 */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)}><SupremeIcon name="volume" size={32} flip={true} /></div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '55px', bottom: '0', width: '135px', backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: '12px', border: '0.8px solid rgba(255,255,255,0.3)', overflow: 'hidden' }}>
                  <div style={{ padding: '12px', fontSize: '11px', borderBottom: '0.5px solid #333', color: '#fff' }}>Tắt/mở âm thanh</div>
                  <div style={{ padding: '12px', fontSize: '11px', color: '#fff' }}>Lưu âm thanh</div>
                </div>
              )}
            </div>

            {/* NÚT XỔ LÊN/XUỐNG #5 */}
            <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ transition: '0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
              <SupremeIcon name="chevron" size={32} />
            </div>
          </div>

          {/* CỤM THÔNG TIN TRÁI - KHÔI PHỤC NÚT SHOP #14 & FOLLOW #15 */}
          <div style={{ position: 'absolute', bottom: '75px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* NÚT SHOP #14 */}
            <div style={{ width: '26px', height: '26px', borderRadius: '5px', border: '0.8px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <SupremeIcon name="store" size={16} color="#ffcc00" />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#111' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>@tinhtam221986</span>
                {/* NÚT FOLLOW #15 */}
                <span style={{ fontSize: '9px', color: '#ff4444', border: '0.8px solid #ff4444', padding: '1px 5px', borderRadius: '3px', width: 'fit-content', marginTop: '2px' }}>+ follow</span>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#fff', margin: 0, opacity: 0.9 }}>Connect-Pi: Supreme III 🦾</p>
          </div>
        </>
      )}

      {/* THANH ĐIỀU HƯỚNG DƯỚI - CHUẨN TỈ LỆ GIỮA CÁC NÚT */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '70px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        backgroundColor: 'rgba(0,0,0,0.95)', borderTop: '0.5px solid #1a1a1a', 
        transition: 'transform 0.4s ease', transform: isNavVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)',
        zIndex: 1000, padding: '0 10px'
      }}>
        <div onClick={() => setView('feed')} style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: view === 'feed' ? 1 : 0.5 }}><SupremeIcon name="cart" size={26} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><SupremeIcon name="global" size={26} /></div>
        
        {/* NÚT ĐĂNG VIDEO #8 CHUẨN BOX */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => setView('upload')} style={{ width: '45px', height: '30px', borderRadius: '8px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' }}>
            <SupremeIcon name="plus" size={20} color={view === 'upload' ? "#000" : "#ffcc00"} />
          </div>
        </div>

        <div onClick={() => setView('profile')} style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: view === 'profile' ? 1 : 0.5 }}><SupremeIcon name="home" size={26} color={view === 'profile' ? "#ffcc00" : "#fff"} /></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><SupremeIcon name="mail" size={26} /></div>
      </div>

    </div>
  );
            }
          
