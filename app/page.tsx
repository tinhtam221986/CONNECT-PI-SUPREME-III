  const handlePiLogin = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).Pi) {
        // THÊM DÒNG NÀY ĐỂ KHỞI TẠO SDK
        await (window as any).Pi.init({ version: "2.0", sandbox: false }); 
        
        setStatus("Đang gọi Pi SDK...");
        
        const scopes = ["username", "payments"];
        const auth = await (window as any).Pi.authenticate(scopes, (onIncompletePaymentFound: any) => {
          console.log("Tìm thấy thanh toán chưa hoàn tất");
        });

        setStatus(`Xin chào: ${auth.user.username}`);
        alert("Đăng nhập thành công!");
      } else {
        alert("Vui lòng mở trong Pi Browser!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Lỗi kết nối (Cần kiểm tra Sandbox hoặc Dev Portal).");
    }
  };

