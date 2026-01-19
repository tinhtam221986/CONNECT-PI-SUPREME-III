"use client";
import React, { useState, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 
import ProfilePage from './ProfilePage';      

export default function SupremeMasterApp() {
  const [view, setView] = useState<'feed' | 'profile' | 'upload'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [myVideos, setMyVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Lấy video thật từ API khi vào Profile
  useEffect(() => {
    if (view === 'profile') {
      fetch('/api/videos')
        .then(res => res.json())
        .then(data => { if(Array.isArray(data)) setMyVideos(data); })
        .catch(err => console.log("Chưa có API videos"));
    }
  }, [view]);

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
        alert("🦾 THÀNH CÔNG: Video đã được đẩy lên hệ thống!");
        setView('profile');
      } else {
        alert("Lỗi: Cần tạo file API Upload để thực thi lệnh này.");
      }
    } catch (err) {
      alert("Mạch máu Backend chưa thông suốt.");
    } finally { setUploading(false); }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {/* 1. TRANG PROFILE */}
      {view === 'profile' && <ProfilePage videoList={myVideos} />}
      
      {/* 2. TRANG UPLOAD (ĐÃ SỬA LỖI HIỂN THỊ) */}
      {view === 'upload' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', padding: '50px 20px', zIndex: 2000 }}>
          <div onClick={() => setView('feed')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
            <SupremeIcon name="chevron" size={30} color="#ffcc00" />
            <span style={{ color: '#ffcc00', marginLeft: '10px' }}>Quay lại</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>{uploading ? "ĐANG TẢI..." : "TẢI VIDEO THẬT 🚀"}</h2>
          
          <div style={{ width: '100%', height: '220px', border: '2px dashed #ffcc00', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px', backgroundColor: '#0a0a0a', position: 'relative' }}>
             {uploading ? (
               <div style={{ width: '40px', height: '40px', border: '4px solid #ffcc00', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
             ) : (
               <>
                 <SupremeIcon name="plus" size={40} color="#ffcc00" />
                 <p style={{ color: '#ffcc00', fontSize: '13px', marginTop: '10px' }}>Chạm để chọn Video</p>
                 <input type="file" accept="video/*" onChange={handleUpload} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
               </>
             )}
          </div>
          <input id="vCap" placeholder="Nhập tiêu đề video..." style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '15px', color: '#fff', marginTop: '20px', borderRadius: '10px', outline: 'none' }} />
          <p style={{ fontSize: '11px', color: '#555', marginTop: '15px' }}>Lưu ý: Hệ thống sẽ đẩy trực tiếp lên Cloudflare R2 của Boss.</p>
        </div>
      )}

      {/* 3. TRANG FEED (GIỮ NGUYÊN GIAO DIỆN TƯƠNG TÁC) */}
      {view === 'feed' && (
        <>
          <div style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 100 }}><SupremeIcon name="search" size={28} /></div>
          
          {/* CỘT TƯƠNG TÁC PHẢI - KHÔNG ĐƯỢC BIẾN MẤT */}
          <div style={{ position: 'absolute', right: '12px', bottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 100 }}>
            <div style={{ textAlign: 'center' }}><SupremeIcon name="heart" size={32} /><div style={{ fontSize: '10px' }}>92</div></div>
            <SupremeIcon name="comment" size={32} />
            <SupremeIcon name="share" size={32} />
            <SupremeIcon name="save" size={32} />
            <SupremeIcon name="volume" size={32} flip={true} />
          </div>

          <div style={{ position: 'absolute', bottom: '90px', left: '15px', zIndex: 100 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222', border: '1px solid #ffcc00' }} />
                <span style={{ fontWeight: 'bold' }}>@tinhtam221986</span>
             </div>
             <p style={{ fontSize: '14px', marginTop: '10px' }}>Connect-Pi: Supreme III 🦾</p>
          </div>

          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
             Video Feed Ready...
          </div>
        </>
      )}

      {/* 4. THANH ĐIỀU HƯỚNG DƯỚI */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, width: '100%', height: '70px', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', 
        backgroundColor: 'rgba(0,0,0,0.95)', borderTop: '0.5px solid #1a1a1a', zIndex: 1000
      }}>
        <div onClick={() => setView('feed')} style={{ opacity: view === 'feed' ? 1 : 0.5 }}><SupremeIcon name="cart" size={26} /></div>
        <SupremeIcon name="global" size={26} />
        <div onClick={() => setView('upload')} style={{ width: '45px', height: '30px', borderRadius: '8px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: view === 'upload' ? '#ffcc00' : 'transparent' }}>
          <SupremeIcon name="plus" size={20} color={view === 'upload' ? "#000" : "#ffcc00"} />
        </div>
        <div onClick={() => setView('profile')} style={{ opacity: view === 'profile' ? 1 : 0.5 }}><SupremeIcon name="home" size={26} color={view === 'profile' ? "#ffcc00" : "#fff"} /></div>
        <SupremeIcon name="mail" size={26} />
      </div>

      <style jsx global>{` @keyframes spin { to { transform: rotate(360deg); } } `}</style>
    </div>
  );
                       }
