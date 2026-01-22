"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // 1. Tự động kiểm tra phiên đăng nhập cũ trong máy
  useEffect(() => {
    const saved = localStorage.getItem('pi_user_v69_final');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // 2. Hàm xử lý xác thực "Ép nạp"
  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);
    setStatus("ĐANG KẾT NỐI SDK...");

    const Pi = (window as any).Pi;
    
    if (!Pi) {
      setStatus("LỖI SDK - ĐANG TẢI LẠI...");
      setTimeout(() => window.location.reload(), 1000);
      return;
    }

    try {
      // Khởi tạo SDK (Bắt buộc)
      await Pi.init({ version: "2.0", sandbox: false });
      
      setStatus("ĐANG ĐỢI BOSS BẤM 'ALLOW'...");

      // GỌI XÁC THỰC QUYẾT LIỆT
      Pi.authenticate(['username'], (auth: any) => {
        const userData = { 
          username: auth.user.username, 
          uid: auth.user.uid 
        };
        // Lưu vào bộ nhớ máy để lần sau không cần bấm nữa
        localStorage.setItem('pi_user_v69_final', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      }, (err: any) => {
        console.error("Auth Error:", err);
        setLoading(false);
        // Nếu lỗi hoặc treo sau khi bấm Allow, ép Reset toàn mạch
        setStatus("MẠCH KẸT - ĐANG TỰ RESET...");
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 1500);
      });

    } catch (e) {
      console.error("Init Error:", e);
      setLoading(false);
      window.location.reload();
    }
  };

  // --- GIAO DIỆN KHI ĐÃ ĐĂNG NHẬP THÀNH CÔNG ---
  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#ffcc00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center', boxShadow: '0 0 50px rgba(255,204,0,0.3)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>SUCCESS! ✅</h1>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>HỆ THỐNG SUPREME ĐÃ KÍCH HOẠT</p>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', borderBottom: '2px solid #ffcc00', paddingBottom: '10px', marginBottom: '20px' }}>
            @{user.username}
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            style={{ background: 'none', border: 'none', color: '#555', textDecoration: 'underline', fontSize: '13px', cursor: 'pointer' }}
          >
            Đăng xuất khỏi phiên
          </button>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN MÀN HÌNH CHỜ (GIỐNG ẢNH BOSS GỬI) ---
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', fontFamily: 'sans-serif' }}>
      {/* Biểu tượng Pi phát sáng */}
      <div style={{ width: '100px', height: '100px', backgroundColor: '#ffcc00', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '55px', fontWeight: 'bold', color: '#000', marginBottom: '40px', boxShadow: '0 0 40px rgba(255,204,0,0.6)' }}>π</div>
      
      <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: '900', letterSpacing: '3px', marginBottom: '10px' }}>CONNECT-PI</h1>
      <p style={{ color: '#ffcc00', fontSize: '14px', fontWeight: 'bold', marginBottom: '50px' }}>SUPREME EDITION v6.9</p>
      
      <button 
        onClick={handleAuth}
        style={{ 
          width: '100%', maxWidth: '320px', padding: '22px', 
          backgroundColor: loading ? '#1a1a1a' : '#ffcc00', 
          color: loading ? '#444' : '#000', 
          border: 'none', borderRadius: '50px', 
          fontWeight: '900', fontSize: '20px',
          boxShadow: loading ? 'none' : '0 15px 30px rgba(255,204,0,0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        disabled={loading}
      >
        {loading ? 'ĐANG PHÁ BĂNG...' : 'KẾT NỐI NGAY 🚀'}
      </button>

      {loading && (
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '16px', animation: 'blink 1s infinite' }}>{status}</p>
          <p style={{ color: '#666', fontSize: '12px', marginTop: '15px', lineHeight: '1.6' }}>
            Sau khi bấm **Allow**, nếu App đứng im 3 giây,<br/>
            mạch sẽ tự động **Reset** để nổ máy ID của Boss!
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
        }
