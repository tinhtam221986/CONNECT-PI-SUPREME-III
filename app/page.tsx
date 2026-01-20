"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Khởi tạo ngay khi vừa vào trang
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Pi) {
      (window as any).Pi.init({ version: "2.0", sandbox: false });
    }
    
    const saved = localStorage.getItem('pi_final_session');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuth = () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      // Lệnh cưỡng chế bật cửa sổ tím
      Pi.authenticate(['username', 'payments'], (auth: any) => {
        const userData = { username: `@${auth.user.username}` };
        setUser(userData);
        localStorage.setItem('pi_final_session', JSON.stringify(userData));
        setLoading(false);
      }, (err: any) => {
        console.error(err);
        setLoading(false);
        alert("Boss cần bấm 'Allow' để hiện tên thật!");
      });
    } else {
      setLoading(false);
      alert("Hãy mở trong Pi Browser!");
    }
  };

  if (!user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#000', fontWeight: 'bold', marginBottom: '30px' }}>π</div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px' }}>CONNECT-PI</h1>
        
        <button 
          onClick={handleAuth}
          style={{ 
            width: '100%', maxWidth: '280px', padding: '18px', 
            backgroundColor: '#ffcc00', color: '#000', border: 'none', 
            borderRadius: '40px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' 
          }}
        >
          {loading ? 'ĐANG KẾT NỐI...' : 'ĐĂNG NHẬP PI NETWORK 🚀'}
        </button>
        
        {loading && <p style={{ marginTop: '20px', color: '#ffcc00' }}>Vui lòng đợi bảng xác thực hiện lên...</p>}
      </div>
    );
  }

  // MÀN HÌNH KHI ĐÃ HIỆN TÊN THẬT
  return (
    <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #ffcc00', marginBottom: '20px' }} />
       <h2 style={{ fontSize: '26px', fontWeight: 'bold' }}>{user.username}</h2>
       <p style={{ color: '#ffcc00', marginTop: '10px' }}>TÀI KHOẢN ĐÃ THÔNG MẠCH ✅</p>
       <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '50px', opacity: 0.5, color: '#fff', background: 'none', border: 'none', textDecoration: 'underline' }}>Thoát</button>
    </div>
  );
}
