"use client";
import React, { useState, useRef, useEffect } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function SupremeMasterApp() {
  // 1. MẠCH DỮ LIỆU TỰ ĐỘNG (KHÔNG GÁN TÊN TRONG CODE)
  const [piUser, setPiUser] = useState<{username: string, uid: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm gọi dữ liệu thật từ Pi Browser
    const connectPi = async () => {
      try {
        if (typeof window !== 'undefined' && (window as any).Pi) {
          const Pi = (window as any).Pi;
          // Gọi KYC và xác thực danh tính thật
          const auth = await Pi.authenticate(['username', 'payments']);
          setPiUser({
            username: `@${auth.user.username}`, // Tự động lấy ID từ Pi Network
            uid: auth.user.uid
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Lỗi kết nối Pi Network:", err);
        setLoading(false);
      }
    };
    connectPi();
  }, []);

  const [view, setView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. LOGIC ĐIỀU KHIỂN VẬT LÝ (FIX NÚT #5)
  const handleVControl = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', color: '#fff' }}>
      
      {/* CONTENT LAYER */}
      {view === 'feed' && (
        <>
          <video 
            autoPlay loop muted={isMuted} playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }}
            src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4"
          />

          {/* CỘT PHẢI (Z-90): NÂNG NÚT #5 LÊN CAO ĐỂ DỄ BẤM */}
          <div style={{ position: 'absolute', right: '10px', bottom: '50px', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center', zIndex: 90 }}>
            <div onClick={() => setLiked(!liked)} style={{ cursor: 'pointer' }}><SupremeIcon name="heart" size={30} color={liked ? "#ff4444" : "#fff"} /></div>
            <SupremeIcon name="comment" size={28} />
            <SupremeIcon name="share" size={28} />
            <SupremeIcon name="save" size={28} />
            <div onClick={() => setIsMuted(!isMuted)} style={{ cursor: 'pointer' }}><SupremeIcon name="volume" size={28} flip color={isMuted ? "#ff4444" : "#fff"} /></div>
            
            {/* NÚT V #5: NÂNG CAO 50PX TRÁNH DÍNH THANH ĐIỀU HƯỚNG */}
            <div onClick={handleVControl} style={{ cursor: 'pointer', padding: '12px', marginTop: '10px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%' }}>
              <SupremeIcon name="chevron" size={28} color="#ffcc00" />
            </div>
          </div>

          {/* CỤM TRÁI: HIỂN THỊ TÊN LẤY TỪ PI SDK */}
          <div style={{ position: 'absolute', bottom: '70px', left: '12px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SupremeIcon name="store" size={28} color="#ffcc00" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => setView('profile')} style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #fff', backgroundColor: '#222' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>
                  {loading ? "Đang xác thực..." : (piUser?.username || "@guest")} 
                </div>
                {/* FIX NÚT FOLLOW CHUẨN TỶ LỆ */}
                <div style={{ fontSize: '10px', color: '#ff4444', border: '1px solid #ff4444', padding: '1px 8px', borderRadius: '3px', marginTop: '4px', fontWeight: 'bold', display: 'inline-block' }}>
                  FOLLOW
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MÀN HÌNH PROFILE #7.1: TÊN TỰ ĐỘNG KHỚP 100% VỚI PI APP */}
      {view === 'profile' && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 200, padding: '40px 20px', textAlign: 'center' }}>
          <div onClick={() => setView('feed')} style={{ textAlign: 'left', marginBottom: '30px' }}><SupremeIcon name="chevron" size={26} color="#ffcc00" /></div>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', margin: '0 auto', backgroundColor: '#222' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>{piUser?.username || "Chưa đăng nhập"}</h2>
          <p style={{ color: '#888', fontSize: '12px' }}>UID: {piUser?.uid || "N/A"}</p>
          <div style={{ marginTop: '50px', padding: '15px', border: '1px solid #333', borderRadius: '12px' }}>
             DỮ LIỆU ĐƯỢC XÁC THỰC QUA PI KYC 🛡️
          </div>
        </div>
      )}

      {/* NAV ĐÁY: GIỮ NGUYÊN VỊ TRÍ 5PX THEO CHUẨN */}
      <div style={{ 
        position: 'fixed', bottom: isNavVisible ? '5px' : '-70px', 
        width: '100%', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        transition: 'bottom 0.4s ease', zIndex: 1000 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 25px', borderRadius: '30px', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <SupremeIcon name="cart" size={22} />
          <SupremeIcon name="global" size={22} />
          <div onClick={() => setView('upload')} style={{ width: '32px', height: '22px', borderRadius: '6px', border: '1.5px solid #ffcc00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SupremeIcon name="plus" size={16} color="#ffcc00" />
          </div>
          <div onClick={() => setView('profile')} style={{ cursor: 'pointer' }}><SupremeIcon name="home" size={22} /></div>
          <SupremeIcon name="mail" size={22} />
        </div>
      </div>
    </div>
  );
                             }
