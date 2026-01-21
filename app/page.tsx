"use client";
import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function SupremeMasterApp() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. KHỞI TẠO SDK DUY NHẤT 1 LẦN KHI TRANG LOAD
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initInterval = setInterval(() => {
        if ((window as any).Pi) {
          (window as any).Pi.init({ version: "2.0", sandbox: false });
          console.log("SDK Pi đã sẵn sàng!");
          clearInterval(initInterval);
        }
      }, 500);
      return () => clearInterval(initInterval);
    }
  }, []);

  // 2. KIỂM TRA BỘ NHỚ TỰ ĐỘNG
  useEffect(() => {
    const saved = localStorage.getItem('pi_id_v6_final');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 3. HÀM XÁC THỰC (CHỈ GỌI AUTH, KHÔNG GỌI INIT LẠI)
  const handleAuth = () => {
    if (loading) return;
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).Pi) {
      const Pi = (window as any).Pi;
      
      Pi.authenticate(['username'], (auth: any) => {
        // KHI NHẬN ĐƯỢC DỮ LIỆU TỪ CỬA SỔ TÍM
        const userData = { username: auth.user.username, uid: auth.user.uid };
        localStorage.setItem('pi_id_v6_final', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
      }, (err: any) => {
        console.error("Lỗi xác thực:", err);
        setLoading(false);
        // Nếu lỗi, thử reset lại trạng thái để Boss bấm lại
        alert("Mạch bận, Boss hãy thử bấm lại lần nữa!");
      });
    } else {
      setLoading(false);
      alert("Hãy mở trong Pi Browser!");
    }
  };

  // --- GIAO DIỆN SAU KHI VÀO ĐƯỢC (HIỆN TÊN BOSS) ---
  if (user) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '30px', border: '2px solid #ffcc00', borderRadius: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#ffcc00' }}>XÁC THỰC THÀNH CÔNG ✅</h2>
          <p style={{ fontSize: '28px', margin: '15px 0' }}>@{user.username}</p>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ color: '#555', background: 'none', border: 'none' }}>Đăng xuất</button>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN ĐĂNG NHẬP (GIỐNG ẢNH BOSS GỬI) ---
  return (
    <>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="afterInteractive" />
      <div style={{ height: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '85px', height: '85px', backgroundColor: '#ffcc00', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '45px', fontWeight: 'bold', color: '#000', marginBottom: '30px', boxShadow: '0 0 25px #ffcc00' }}>π</div>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '900', marginBottom: '5px' }}>CONNECT-PI</h1>
        <p style={{ color: '#444', fontSize: '13px', marginBottom: '40px' }}>SUPREME ECOSYSTEM v6.1</p>
        
        <button 
          onClick={handleAuth}
          style={{ width: '100%', maxWidth: '300px', padding: '18px', backgroundColor: loading ? '#333' : '#ffcc00', color: '#000', border: 'none', borderRadius: '50px', fontWeight: '900', fontSize: '16px' }}
        >
          {loading ? 'ĐANG KẾT NỐI...' : 'ĐĂNG NHẬP PI NETWORK 🚀'}
        </button>

        {loading && (
          <p style={{ color: '#ffcc00', marginTop: '20px', fontSize: '14px', textAlign: 'center' }}>
            Vui lòng bấm 'Allow' trên màn hình Pi...<br/>
            <span style={{ fontSize: '11px', color: '#666' }}>(Nếu đã bấm mà vẫn treo, hãy đợi 5s rồi bấm lại nút trên)</span>
          </p>
        )}
      </div>
    </>
  );
                  }
