"use client";
import React, { useEffect, useState } from "react";

// COMPONENT NÚT BẤM - GIỮ NGUYÊN KIỂU DÁNG 3 THÁNG NGHIÊN CỨU
const NavButton = ({ id, label, onClick, isHome }: any) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      aspectRatio: '1/1', // Đảm bảo nút vuông tuyệt đối
      backgroundColor: '#000',
      border: isHome ? '2px solid #ffcc00' : '1px solid #ffcc00',
      borderRadius: '15px', // Bo góc chuẩn R&D
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: isHome ? '0 0 15px rgba(255, 204, 0, 0.3)' : 'none',
      transition: 'all 0.2s ease',
    }}
  >
    <span style={{ color: '#ffcc00', fontSize: '10px', opacity: 0.7 }}>#{id}</span>
    <span style={{ 
      color: '#ffcc00', 
      fontSize: '12px', 
      fontWeight: 'bold', 
      marginTop: '5px',
      textAlign: 'center' 
    }}>
      {label}
    </span>
  </button>
);

export default function ConnectApp() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePiLogin = async () => {
    try {
      const globalPi = (window as any).Pi;
      if (globalPi) {
        await globalPi.init({ version: "2.0", sandbox: false });
        const auth = await globalPi.authenticate(["username"], (p: any) => {});
        setUsername(auth.user.username);
        setIsLoggedIn(true);
      } else {
        alert("Vui lòng mở trong Pi Browser!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối SDK!");
    }
  };

  if (!isClient) return <div style={{ backgroundColor: "#000", height: "100vh" }} />;

  // MÀN HÌNH ĐĂNG NHẬP (GIỮ STYLE BAN ĐẦU)
  if (!isLoggedIn) {
    return (
      <div style={{ 
        backgroundColor: "#000", height: "100vh", display: "flex", 
        flexDirection: "column", alignItems: "center", justifyContent: "center" 
      }}>
        <h1 style={{ color: "#ffcc00", fontSize: "2.5rem", marginBottom: "30px" }}>CONNECT PI</h1>
        <button 
          onClick={handlePiLogin}
          style={{
            backgroundColor: "#ffcc00", color: "#000", padding: "15px 40px", 
            borderRadius: "30px", border: "none", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer"
          }}
        >
          ĐĂNG NHẬP VỚI PI
        </button>
      </div>
    );
  }

  // MÀN HÌNH CHÍNH - BẢO TỒN 17 NÚT ĐÚNG VỊ TRÍ (4 CỘT)
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: '#ffcc00', fontWeight: 'bold' }}>CONNECT PI</span>
        <span style={{ color: '#888' }}>ID: {username}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Đúng layout 4 cột chuẩn R&D
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {Array.from({ length: 17 }, (_, i) => {
          const id = i + 1;
          const isHome = id === 7;
          return (
            <NavButton 
              key={id} 
              id={id} 
              label={isHome ? "HOME" : "MENU"} 
              isHome={isHome}
              onClick={() => isHome ? setShowProfile(true) : alert(`Nút #${id} sắp ra mắt`)}
            />
          );
        })}
      </div>

      {/* #7.1 PROFILE - NƠI LÀM VIỆC CỦA ÔNG CHỦ */}
      {showProfile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div style={{
            width: '85%', backgroundColor: '#111', border: '1px solid #ffcc00',
            borderRadius: '20px', padding: '30px', textAlign: 'center'
          }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ffcc00', 
              margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#000', fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              {username.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ color: '#ffcc00', marginBottom: '10px' }}>PROFILE #7.1</h2>
            <p style={{ color: '#fff', fontSize: '1.1rem' }}>Chào mừng Ông chủ: <b>{username}</b></p>
            <div style={{ margin: '20px 0', borderTop: '1px solid #333', paddingTop: '15px' }}>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>Vị thế: Pioneer chiến lược</p>
            </div>
            <button 
              onClick={() => setShowProfile(false)}
              style={{ backgroundColor: '#ffcc00', color: '#000', padding: '10px 30px', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}
            >
              QUAY LẠI
            </button>
          </div>
        </div>
      )}
    </div>
  );
          }
