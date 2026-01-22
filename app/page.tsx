"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. Tự động kiểm tra bộ nhớ khi vừa mở App
  useEffect(() => {
    const saved = localStorage.getItem('pi_user_final_v68');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);

    const Pi = (window as any).Pi;
    
    // Kiểm tra xem SDK đã thực sự sẵn sàng chưa
    if (!Pi) {
      alert("Đang nạp tín hiệu Pi... Boss đợi 2 giây rồi bấm lại nhé!");
      setLoading(false);
      return;
    }

    try {
      // Khởi tạo SDK với thông số ép buộc
      await Pi.init({ version: "2.0", sandbox: false });
      
      // Bắt đầu xác thực
      Pi.authenticate(['username'], (auth: any) => {
        const userData = { username: auth.user.username, uid: auth.user.uid };
        localStorage.setItem('pi_user_final_v68', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      }, (err: any) => {
        console.error("Lỗi xác thực:", err);
        setLoading(false);
        // Nếu kẹt, tự động tải lại mạch trang sau 1 giây
        setTimeout(() => window.location.reload(), 1000);
      });
    } catch (e) {
      setLoading(false);
      window.location.reload();
    }
  };

  // MÀN HÌNH KHI ĐÃ ĐĂNG NHẬP THÀNH CÔNG
  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#ffcc00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ padding: '30px', border: '4px solid #ffcc00', borderRadius: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>SUCCESS! ✅</h1>
          <p style={{ fontSize: '24px', color: '#fff' }}>@{user.username}</p>
          <p style={{ color: '#444', fontSize: '12px' }}>ID: {user.uid}</p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            style={{ marginTop: '30px', background: 'none', border: 'none', color: '#ffcc00', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  // MÀN HÌNH CHỜ XÁC THỰC
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px', boxShadow: '0 0 30px rgba(255,204,0,0.5)' }}>π</div>
      
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '900', letterSpacing: '2px', marginBottom: '5px' }}>CONNECT-PI</h1>
      <p style={{ color: '#444', fontSize: '12px', marginBottom: '40px' }}>SUPREME EDITION v6.8</p>
      
      <button 
        onClick={handleAuth}
        style={{ 
          width: '100%', maxWidth: '300px', padding: '20px', 
          backgroundColor: loading ? '#222' : '#ffcc00', 
          color: '#000', border: 'none', borderRadius: '50px', 
          fontWeight: '900', fontSize: '18px',
          boxShadow: loading ? 'none' : '0 10px 20px rgba(255,204,0,0.2)'
        }}
      >
        {loading ? 'ĐANG KÍCH HOẠT...' : 'KẾT NỐI NGAY 🚀'}
      </button>

      {loading && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#ffcc00', fontWeight: 'bold' }}>MẠCH ĐANG THÔNG!</p>
          <p style={{ color: '#666', fontSize: '11px', marginTop: '10px' }}>Nếu bảng tím đã đóng mà vẫn treo,<br/>hãy đợi 3 giây để hệ thống tự Reset mạch.</p>
        </div>
      )}
    </div>
  );
}
