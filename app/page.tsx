"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 
import ProfilePage from './ProfilePage';      

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [myVideos, setMyVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  // 1. Hàm lấy danh sách video thật từ MongoDB khi vào Profile
  useEffect(() => {
    if (view === 'profile') {
      fetch('/api/videos').then(res => res.json()).then(data => setMyVideos(data));
    }
  }, [view]);

  // 2. Hàm xử lý Upload Video lên Cloudflare R2 thông qua API
  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', (document.getElementById('vCap') as HTMLInputElement).value || "Connect-Pi Video");

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        alert("🦾 SIÊU CẤP: Video đã được đẩy lên Cloudflare R2 & MongoDB thành công!");
        setView('profile');
      }
    } catch (err) {
      alert("Lỗi kết nối mạch máu dữ liệu!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {view === 'profile' && <ProfilePage videoList={myVideos} />}
      
      {view === 'upload' && (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', color: '#fff', padding: '40px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')}><SupremeIcon name="chevron" size={30} color="#ffcc00" /></div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>{uploading ? "ĐANG ĐẨY LÊN R2..." : "TẢI VIDEO THẬT 🚀"}</h2>
          
          <div style={{ width: '100%', height: '200px', border: '2px dashed #ffcc00', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px', backgroundColor: '#0a0a0a', position: 'relative' }}>
             {uploading ? (
               <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #ffcc00', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
             ) : (
               <>
                 <SupremeIcon name="plus" size={40} color="#ffcc00" />
                 <p style={{ color: '#ffcc00', fontSize: '14px', marginTop: '10px' }}>Chạm để chọn Video từ máy</p>
                 <input type="file" accept="video/*" onChange={handleUpload} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} disabled={uploading} />
               </>
             )}
          </div>
          <input id="vCap" placeholder="Nhập tiêu đề video..." style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #333', padding: '15px 0', color: '#fff', marginTop: '20px', outline: 'none' }} />
        </div>
      )}

      {view === 'feed' && (
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
           <p style={{ color: '#555' }}>Video Feed Coming Soon...</p>
        </div>
      )}

      {/* NAVIGATION BAR - GIỮ NGUYÊN LOGIC */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '82%', height: '65px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: 'linear-gradient(transparent, rgba(0,0,0,1))',
        transition: 'transform 0.4s ease', transform: isNavVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)', zIndex: 1000
      }}>
        <div onClick={() => setView('feed')} style={{ opacity: view === 'feed' ? 1 : 0.6 }}><SupremeIcon name="cart" size={26} /></div>
        <SupremeIcon name="global" size={28} />
        <div onClick={() => setView('upload')} style={{ width: '34px', height: '22px', borderRadius: '5px', border: '1px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SupremeIcon name="plus" size={16} color="#ffcc00" />
        </div>
        <div onClick={() => setView('profile')} style={{ opacity: view === 'profile' ? 1 : 0.6 }}><SupremeIcon name="home" size={26} color={view === 'profile' ? "#ffcc00" : "#fff"} /></div>
        <SupremeIcon name="mail" size={26} />
      </div>
    </div>
  );
                                                       }
