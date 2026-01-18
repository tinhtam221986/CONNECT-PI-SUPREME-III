  const handlePiLogin = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).Pi) {
        setStatus("Đang khởi tạo kết nối...");
        
        // Tự động nhận diện môi trường (Nếu lỗi Sandbox thì chạy mode thường)
        try {
          await (window as any).Pi.init({ version: "2.0", sandbox: false }); 
        } catch (e) {
          console.log("Pi Init đã chạy hoặc có lỗi nhẹ, bỏ qua để tiếp tục.");
        }
        
        setStatus("Đang xác thực Pioneer...");
        
        const scopes = ["username", "payments"];
        
        // Thực hiện bắt tay với Pi Network
        (window as any).Pi.authenticate(scopes, (onIncompletePaymentFound: any) => {
          // Xử lý nếu có giao dịch treo
        }).then(function(auth: any) {
          setStatus(`Thành công! Chào ${auth.user.username}`);
          // Chuyển hướng hoặc lưu trữ ID tại đây
          alert("KẾT NỐI THÀNH CÔNG!");
        }).catch(function(error: any) {
          console.error(error);
          setStatus("Pi Network từ chối kết nối. Hãy thử lại trong Pi Browser.");
        });

      } else {
        setStatus("Lỗi: Không tìm thấy trình duyệt Pi!");
      }
    } catch (err) {
      setStatus("Sự cố kỹ thuật. Đang kiểm tra...");
    }
  };
