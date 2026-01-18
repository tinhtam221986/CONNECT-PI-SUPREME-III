'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!agreed) return;
    setLoading(true);
    // Sau này sẽ tích hợp Pi SDK thực tế tại đây
    setTimeout(() => {
      alert("Đang kết nối Pi Network... (Hệ thống đang khởi tạo)");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Hiệu ứng ánh sáng tím vàng đặc trưng Connect Pi */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-900/20 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col items-center w-full max-w-sm"
      >
        {/* LOGO & BRAND */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-yellow-600">
            CONNECT
          </h1>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mt-2 rounded-full" />
          <p className="text-yellow-500 font-bold text-[10px] tracking-[0.5em] mt-4 uppercase">
            Supreme Web3 Ecosystem
          </p>
        </div>

        {/* CỤM TƯƠNG TÁC CHÍNH */}
        <div className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] shadow-2xl">
          <div className="flex items-start gap-3 mb-8">
            <input 
              type="checkbox" 
              id="agreement"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-none accent-yellow-500 cursor-pointer"
            />
            <label htmlFor="agreement" className="text-[11px] text-gray-400 leading-tight">
              Tôi xác nhận đã đọc và hoàn toàn đồng ý với 
              <Link href="/whitepaper" className="text-yellow-500 font-bold mx-1 hover:underline">Sách Trắng</Link> 
              và các 
              <Link href="/terms" className="text-yellow-500 font-bold mx-1 hover:underline">Điều khoản dịch vụ</Link> 
              của Connect-Pi.
            </label>
          </div>

          <button 
            onClick={handleLogin}
            disabled={!agreed || loading}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 ${
              agreed 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            {loading ? 'ĐANG KHỞI TẠO...' : 'ĐĂNG NHẬP VỚI PI'}
          </button>
        </div>

        {/* FOOTER PHÁP LÝ */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-medium">
            Phát triển bởi Ban Giám Đốc Connect
          </p>
          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
             <span className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase">Hệ thống đang trực tuyến</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
