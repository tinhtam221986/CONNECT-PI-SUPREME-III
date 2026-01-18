"use client";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [status, setStatus] = useState("Sẵn sàng kết nối");
  const [isClient, setIsClient] = useState(false);

  // Đảm bảo code chỉ chạy sau khi trang đã tải xong trên trình duyệt
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePiLogin = async () => {
    if (!isClient) return;

    try {
      const globalPi = (window as any).Pi;
      if (globalPi) {
        setStatus("Đang khởi tạo...");
        
        // Khởi tạo SDK (Tắt sandbox để chạy trực tiếp trên Pi Browser)
        try {
          await globalPi.init({ version: "2.0", sandbox: false });
        } catch (e) {
          console.log("SDK đã được khởi tạo trước đó.");
        }

        setStatus("Đang xác thực...");
        const scopes = ["username", "payments"];
        
        const auth = await globalPi.authenticate(scopes, (payment: any) => {
          console.log("Payment found", payment);
        });

        setStatus(`Chào Pioneer: ${auth.user.username}`);
        alert("KẾT NỐI THÀNH CÔNG!");
      } else {
        alert("Vui lòng mở trong Pi Browser!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Lỗi kết nối. Hãy thử lại trong Pi Browser.");
    }
  };

  if (!isClient) return <div style={{backgroundColor: '#000', height: '100vh'}} />;

  return (
    <div style={{ 
      backgroundColor: "#000", height: "100vh", 
      display: "flex", flexDirection: "column", 
      alignItems: "center", justifyContent: "center"
    }}>
      <h1 style={{ color: "#FFD700", fontSize: "2.5rem", marginBottom: "10px" }}>CONNECT PI</h1>
      <p style={{ color: "#888", marginBottom: "40px" }}>{status}</p>
      
      <button 
        onClick={handlePiLogin}
        style={{
          backgroundColor: "#FFD700", color: "#000",
          padding: "18px 50px", borderRadius: "35px",
          border: "none", fontWeight: "bold", fontSize: "20px",
          cursor: "pointer", boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)"
        }}
      >
        ĐĂNG NHẬP VỚI PI
      </button>
    </div>
  );
}
