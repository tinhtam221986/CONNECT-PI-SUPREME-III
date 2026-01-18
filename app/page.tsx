"use client";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [status, setStatus] = useState("Sẵn sàng kết nối");

  const handlePiLogin = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).Pi) {
        setStatus("Đang gọi Pi SDK...");
        
        // Khởi tạo và yêu cầu quyền truy cập ID người dùng
        const scopes = ["username", "payments"];
        
        const auth = await (window as any).Pi.authenticate(scopes, (onIncompletePaymentFound: any) => {
          console.log("Tìm thấy thanh toán chưa hoàn tất");
        });

        // Đăng nhập thành công
        setStatus(`Xin chào: ${auth.user.username}`);
        
        // Lưu ID vào hệ thống để bắt đầu tính điểm uy tín
        localStorage.setItem("pi_user", JSON.stringify(auth.user));
        
        // Điều hướng vào bên trong App (Sau này chúng ta sẽ làm trang Dashboard)
        alert("Đăng nhập thành công! Chào mừng Pioneer.");
        
      } else {
        alert("Vui lòng mở ứng dụng trong Pi Browser!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Lỗi kết nối. Vui lòng thử lại.");
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#000", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ color: "#FFD700", marginBottom: "20px" }}>CONNECT PI</h1>
      <p style={{ color: "#888", marginBottom: "30px" }}>{status}</p>
      
      <button 
        onClick={handlePiLogin}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          padding: "15px 40px",
          borderRadius: "30px",
          border: "none",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)"
        }}
      >
        ĐĂNG NHẬP VỚI PI
      </button>
    </div>
  );
}
