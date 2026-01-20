"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. Khởi tạo SDK và kiểm tra bộ nhớ cũ
  useEffect(() => {
    const saved = localStorage.getItem('pi_id_final');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 2. Hàm đăng nhập (Đã sửa lỗi đứng im)
  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      try {
        // Khởi tạo lại mạch máu
        await Pi.init({ version: "2.0", sandbox: false });

        // Gửi lệnh xác thực ID
        Pi.authenticate(['username'], (auth: any) => {
          // KHI BOSS BẤM ALLOW - MẠCH CHẠY VÀO ĐÂY
          const userData = { username: auth.user.username, uid: auth.user.uid };
          setUser(userData);
          localStorage.setItem('pi_id_final', JSON.stringify(userData));
          setLoading(false);
          console.log("Thành công!");
        }, (err: any) => {
          console.error(err);
          setLoading(false);
          // Nếu bị treo, cho phép bấm lại sau 2 giây
          setTimeout(() => setLoading(false), 2000);
        });

      } catch (e) {
        setLoading(false);
        alert("Mạch Pi chưa sẵn sàng, Boss đợi 2 giây rồi bấm lại nhé!");
      }
    } else {
      setLoading(false);
      alert("Hãy mở trong Pi Browser!");
    }
  };

  // MÀN HÌNH SAU KHI THÔNG MẠCH (SẼ HIỆN TÊN BOSS)
  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ padding: '30px', border: '3px solid #ffcc00', borderRadius: '30px', backgroundColor: '#111' }}>
          <h2 style={{ color: '#ffcc00', fontSize: '20px' }}>ID ĐÃ THÔNG MẠCH ✅</h2>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '20px 0' }}>@{user.username}</p>
          <div style={{ fontSize: '12px', color: '#444' }}>UID: {user.uid}</div>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '50px', color: '#888', background: 'none', border: 'none', textDecoration: 'underline' }}>
          Thoát để kiểm tra lại
        </button>
      </div>
    );
  }

  // MÀN HÌNH ĐĂNG NHẬP (CHỐNG TREO)
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '20px' }}>
      <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', color: '#000', fontWeight: 'bold', marginBottom: '30px', boxShadow: '0 0 30px #ffcc00' }}>π</div>
      <h1 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '40px' }}>CONNECT-PI</h1>
      
      <button 
        onClick={handleAuth}
        style={{ 
          width: '100%', maxWidth: '300px', padding: '20px', 
          backgroundColor: '#ffcc00', color: '#000', border: 'none', 
          borderRadius: '50px', fontWeight: '900', fontSize: '18px', cursor: 'pointer',
          boxShadow: loading ? 'none' : '0 10px 20px rgba(255, 204, 0, 0.3)'
        }}
      >
        {loading ? 'ĐANG ĐỢI BOSS BẤM ALLOW...' : 'KẾT NỐI ID PI 🚀'}
      </button>

      {loading && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
           <p style={{ color: '#ffcc00', fontWeight: 'bold' }}>MẠCH ĐANG MỞ!</p>
           <p style={{ color: '#666', fontSize: '12px' }}>Nếu bảng màu tím biến mất mà vẫn chưa vào được,<br/>Boss hãy bấm nút trên một lần nữa!</p>
        </div>
      )}
    </div>
  );
}
