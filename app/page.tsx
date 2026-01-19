"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 
import ProfilePage from './ProfilePage';      

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showVolMenu, setShowVolMenu] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    } catch { alert("Hệ thống Backend chưa thông suốt."); }
    finally { setUploading(false); }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {view === 'profile' && <ProfilePage videoList={[]} />}
      
      {/* TRANG UPLOAD - ĐÃ CHỈNH KHUNG NHẬP LIỆU */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px' }}><SupremeIcon name="chevron" size={30} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{uploading ? "ĐANG TẢI..." : "TẢI VIDEO THẬT 🚀"}</h2>
          
          <div style={{ width: '100%', height: '220px', border: '1.5px dashed #ffcc00', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', position: 'relative', backgroundColor: '#050505' }}>
             <SupremeIcon name="plus" size={40} color="#ffcc00" />
             <input type="file" accept="video/*" onChange={handleUpload} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }} />
          </div>

          {/* BOX NHẬP LIỆU CHUẨN - KHÔNG TRÀN MÀN HÌNH */}
          <div style={{ width: '100%', marginTop: '20px', boxSizing: 'border-box' }}>
            <textarea 
              id="vCap" 
              placeholder="Nhập tiêu đề và mô tả video của bạn..." 
              style={{ width: '100%', height: '100px', backgroundColor: '#111', border: '0.5px solid #333', padding: '15px', color: '#fff', borderRadius: '12px', outline: 'none', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <p style={{ fontSize: '11px', color: '#555', marginTop: '10px' }}>* Video sẽ được lưu trữ an toàn trên Cloudflare R2.</p>
        </div>
      )}

      {view === 'feed' && (
        <>
          <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}><SupremeIcon name="search" size={28} /></div>

          {/* CỘT PHẢI - ICON TIM ĐÃ SỬA & MENU LOA 2 NGĂN */}
          <div style={{ position: 'absolute', right: '12px', bottom: '85px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '360px', zIndex: 100 }}>
            <div style={{ textAlign: 'center' }}>
              <SupremeIcon name="heart" size={34} /> {/* Đã làm đầy đặn */}
              <div style={{ fontSize: '11px', marginTop: '2px' }}>92</div>
            </div>
            <SupremeIcon name="comment" size={32} />
            <SupremeIcon name="share" size={32} />
            <SupremeIcon name="save" size={32} />
            
            {/* MENU LOA CHUẨN 2 NGĂN */}
            <div style={{ position: 'relative' }}>
              <div onClick={() => setShowVolMenu(!showVolMenu)}><SupremeIcon name="volume" size={32} flip={true} /></div>
              {showVolMenu && (
                <div style={{ position: 'absolute', right: '50px', bottom: '0', width: '130px', backgroundColor: 'rgba(15,15,15,0.95)', borderRadius: '10px', border: '0.5px solid #444', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                  <div style={{ padding: '12px', fontSize: '12px', borderBottom: '0.5px solid #222', color: '#fff' }}>Âm thanh: Bật</div>
                  <div style={{ padding: '12px', fontSize: '12px', color: '#fff' }}>Lưu âm thanh</div>
                </div>
              )}
            </div>

            <div onClick={() => setIsNavVisible(!isNavVisible)} style={{ transition: '0.3s', transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
              <SupremeIcon name="chevron" size={32} />
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '75px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SupremeIcon name="store" size={16} color="#ffcc00" /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>@tinhtam221986</div>
                <div style={{ fontSize: '10px', color: '#ff4444', border: '0.5px solid #ff4444', width: 'fit-content', padding: '1px 4px', borderRadius: '3px', marginTop: '2px' }}>+ follow</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', margin: 0 }}>Connect-Pi: Supreme III 🦾</p>
          </div>
        </>
      )}

      {/* THANH ĐIỀU HƯỚNG */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, width: '100%', height: '70px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        backgroundColor: 'rgba(0,0,0,0.98)', borderTop: '0.5px solid #1a1a1a', 
        transform: isNavVisible ? 'translateY(0)' : 'translateY(100px)', transition: '0.4s ease', zIndex: 1000
      }}>
        <div onClick={() => setView('feed')} style={{ opacity: view === 'feed' ? 1 : 0.4 }}><SupremeIcon name="cart" size={26} /></div>
        <div style={{ opacity: 0.4 }}><SupremeIcon name="global" size={26} /></div>
        <div onClick={() => setView('upload')} style={{ width: '46px', height: '30px', borderRadius: '8px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' }}>
          <SupremeIcon name="plus" size={20} color={view === 'upload' ? "#000" : "#ffcc00"} />
        </div>
        <div onClick={() => setView('profile')} style={{ opacity: view === 'profile' ? 1 : 0.4 }}><SupremeIcon name="home" size={26} color={view === 'profile' ? "#ffcc00" : "#fff"} /></div>
        <div style={{ opacity: 0.4 }}><SupremeIcon name="mail" size={26} /></div>
      </div>
    </div>
  );
                  }
