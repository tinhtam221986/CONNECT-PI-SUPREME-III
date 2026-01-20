"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeMasterApp() {
  const [piUser, setPiUser] = useState<{username: string, uid: string} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Khởi tạo SDK ngay khi vào trang
    if (typeof window !== 'undefined' && (window as any).Pi) {
      (window as any).Pi.init({ version: "2.0", sandbox: false });
    }
    // Kiểm tra nếu đã có ID lưu trong máy
    const savedId = localStorage.getItem('pi_id_verified');
    if (savedId) setPiUser(JSON.parse(savedId));
  }, []);

  const handleLogin = () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      // CHỈ YÊU CẦU: Tên người dùng (Username)
      // KHÔNG YÊU CẦU: Quyền thanh toán hay ví
      Pi.authenticate(['username'], (auth: any) => {
        const userData = {
          username: auth.user.username, // Đây là ID/Username Boss cần
          uid: auth.user.uid            // Mã định danh duy nhất của Pi
        };
        setPiUser(userData);
        localStorage.setItem('pi_id_verified', JSON.stringify(userData));
        setLoading(false);
      }, (err: any) => {
        console.error("Lỗi đăng nhập:", err);
        setLoading(false);
        alert("Xác thực ID thất bại. Boss hãy thử lại!");
      });
    } else {
      setLoading(false);
      alert("Vui lòng mở trong trình duyệt Pi Browser!");
    }
  };

  if (piUser) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '20px', border: '2px solid #ffcc00', borderRadius: '15px', textAlign: 'center' }}>
          <h2 style={{ color: '#ffcc00' }}>ID PI ĐÃ XÁC THỰC ✅</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '15px 0' }}>@{piUser.username}</p>
          <p style={{ color: '#666', fontSize: '12px' }}>UID: {piUser.uid}</p>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '30px', color: '#fff', opacity: 0.5 }}>Đăng xuất</button>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>π</div>
      <h1 style={{ marginBottom: '40px', letterSpacing: '2px' }}>CONNECT-PI</h1>
      
      <button 
        onClick={handleLogin}
        style={{ width: '280px', padding: '18px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'ĐANG LẤY ID...' : 'XÁC THỰC ID TÀI KHOẢN 🚀'}
      </button>
      {loading && <p style={{ marginTop: '20px', color: '#ffcc00' }}>Vui lòng bấm 'Allow' trên cửa sổ Pi để cung cấp ID</p>}
    </div>
  );
}
