"use client";
import React, { useState, useEffect, useCallback } from 'react';

export default function SupremeMasterApp() {
  const [piUser, setPiUser] = useState<{username: string, uid: string} | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Khởi tạo SDK ngay lập tức
  useEffect(() => {
    const initPi = async () => {
      if (typeof window !== 'undefined' && (window as any).Pi) {
        await (window as any).Pi.init({ version: "2.0", sandbox: false });
        console.log("Pi SDK Ready!");
      }
    };
    initPi();
    
    // Kiểm tra xem đã đăng nhập trước đó chưa
    const saved = localStorage.getItem('pi_verified_id');
    if (saved) setPiUser(JSON.parse(saved));
  }, []);

  // 2. Hàm xử lý đăng nhập - Đã tối ưu hóa để không bị treo
  const handleLogin = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      try {
        const Pi = (window as any).Pi;
        
        // Gọi xác thực và xử lý kết quả ngay lập tức
        Pi.authenticate(['username'], (auth: any) => {
          const userData = {
            username: auth.user.username,
            uid: auth.user.uid
          };
          // CẬP NHẬT TRẠNG THÁI NGAY LẬP TỨC
          setPiUser(userData);
          localStorage.setItem('pi_verified_id', JSON.stringify(userData));
          setLoading(false);
          console.log("Xác thực thành công!");
        }, (err: any) => {
          console.error(err);
          setLoading(false);
          alert("Lỗi xác thực: Boss hãy thử lại!");
        });
      } catch (error) {
        setLoading(false);
        console.error("Auth error:", error);
      }
    } else {
      setLoading(false);
      alert("Vui lòng mở trong Pi Browser!");
    }
  }, [loading]);

  // MÀN HÌNH SAU KHI BẤM ALLOW THÀNH CÔNG
  if (piUser) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ padding: '30px', border: '2px solid #ffcc00', borderRadius: '25px', boxShadow: '0 0 20px rgba(255, 204, 0, 0.2)' }}>
          <h2 style={{ color: '#ffcc00', fontSize: '18px', marginBottom: '10px' }}>XÁC THỰC THÀNH CÔNG ✅</h2>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>@{piUser.username}</p>
          <p style={{ color: '#444', fontSize: '12px', marginTop: '10px' }}>UID: {piUser.uid}</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          style={{ marginTop: '40px', color: '#666', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Đăng xuất để thử lại
        </button>
      </div>
    );
  }

  // MÀN HÌNH ĐĂNG NHẬP (TRẠNG THÁI BOSS ĐANG GẶP)
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '20px' }}>
      <div style={{ width: '85px', height: '85px', backgroundColor: '#ffcc00', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '45px', color: '#000', fontWeight: 'bold', marginBottom: '30px', boxShadow: '0 0 25px rgba(255, 204, 0, 0.4)' }}>π</div>
      <h1 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>CONNECT-PI</h1>
      <p style={{ color: '#888', textAlign: 'center', fontSize: '14px', marginBottom: '40px' }}>
        {loading ? 'ĐANG ĐỢI PI PHẢN HỒI...' : 'Vui lòng xác thực để lấy ID tài khoản'}
      </p>
      
      <button 
        onClick={handleLogin}
        disabled={loading}
        style={{ width: '100%', maxWidth: '300px', padding: '18px', backgroundColor: loading ? '#444' : '#ffcc00', color: '#000', border: 'none', borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'VUI LÒNG ĐỢI...' : 'KẾT NỐI NGAY 🚀'}
      </button>
    </div>
  );
}
