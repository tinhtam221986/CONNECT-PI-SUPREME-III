"use client";
import React, { useState, useEffect } from 'react';

export default function SupremeApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. CƠ CHẾ QUÉT TỰ ĐỘNG (CỰC KỲ QUAN TRỌNG)
  useEffect(() => {
    const checkPi = setInterval(() => {
      if ((window as any).Pi) {
        const Pi = (window as any).Pi;
        Pi.init({ version: "2.0", sandbox: false });
        
        // Thử lấy thông tin âm thầm (Nếu Boss đã từng bấm Allow, nó sẽ vào luôn)
        Pi.authenticate(['username'], (auth: any) => {
          setUser({ username: auth.user.username, uid: auth.user.uid });
          setLoading(false);
          clearInterval(checkPi);
        }, (err: any) => {
          // Chưa có quyền, tiếp tục đợi Boss bấm nút
        });
      }
    }, 2000); // Quét mỗi 2 giây

    return () => clearInterval(checkPi);
  }, []);

  const handleAuth = () => {
    if (loading) return;
    setLoading(true);

    if ((window as any).Pi) {
      const Pi = (window as any).Pi;
      Pi.authenticate(['username'], (auth: any) => {
        setUser({ username: auth.user.username, uid: auth.user.uid });
        setLoading(false);
      }, (err: any) => {
        setLoading(false);
        alert("Boss hãy bấm 'Allow' rồi đợi vài giây nhé!");
      });
    } else {
      setLoading(false);
      alert("Vui lòng mở trong Pi Browser!");
    }
  };

  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#ffcc00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ padding: '40px', border: '5px solid #ffcc00', borderRadius: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900' }}>KẾT NỐI THÀNH CÔNG ✅</h1>
          <p style={{ fontSize: '35px', fontWeight: '900', color: '#fff', margin: '20px 0' }}>@{user.username}</p>
          <div style={{ fontSize: '12px', color: '#444' }}>ID: {user.uid}</div>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '30px', color: '#555', background: 'none', border: 'none', textDecoration: 'underline' }}>Thoát</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
      <div style={{ width: '90px', height: '90px', backgroundColor: '#ffcc00', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', color: '#000', marginBottom: '30px' }}>π</div>
      <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '900', marginBottom: '10px' }}>CONNECT-PI</h1>
      <p style={{ color: '#ffcc00', fontSize: '13px', fontWeight: 'bold', marginBottom: '40px' }}>SUPREME ENGINE v7.0</p>
      
      <button 
        onClick={handleAuth}
        style={{ width: '100%', maxWidth: '320px', padding: '20px', backgroundColor: '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '18px' }}
      >
        {loading ? 'ĐANG ĐỢI TÍN HIỆU...' : 'KẾT NỐI NGAY 🚀'}
      </button>

      {loading && (
        <p style={{ color: '#ffcc00', marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
          Mạch đang quét tín hiệu...<br/>
          Nếu bảng tím đã đóng, Boss chỉ cần<br/>
          **ĐỢI 5 GIÂY** (Không cần bấm thêm gì cả)
        </p>
      )}
    </div>
  );
}
