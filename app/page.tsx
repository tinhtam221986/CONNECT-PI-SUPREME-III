"use client";
import React, { useState, useEffect } from 'react';

// --- HỆ THỐNG BIỂU TƯỢNG SVG CHUẨN R&D ---
const SvgIcon = ({ name, size = 24 }: { name: string, size?: number }) => {
  const icons: any = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    comment: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    share: <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    search: <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />,
    store: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />,
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    cart: <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />,
    mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />,
    plus: <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />,
    chevron: <polyline points="6 9 12 15 18 9" />,
    bot: <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" />
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

export default function SupremeApp() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [captionExpanded, setCaptionExpanded] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const handlePiLogin = async () => {
    try {
      const globalPi = (window as any).Pi;
      if (globalPi) {
        await globalPi.init({ version: "2.0", sandbox: false });
        const auth = await globalPi.authenticate(["username"], (p: any) => {});
        setUsername(auth.user.username);
        setIsLoggedIn(true);
      } else { setIsLoggedIn(true); } // Demo mode
    } catch (err) { setIsLoggedIn(true); }
  };

  if (!isClient) return <div style={{ backgroundColor: '#000', height: '100vh' }} />;

  // 1. MÀN HÌNH ĐĂNG NHẬP
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#ffcc00', fontSize: '42px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '40px' }}>CONNECT PI</h1>
        <button onClick={handlePiLogin} style={{ backgroundColor: '#ffcc00', color: '#000', padding: '16px 48px', borderRadius: '40px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(255, 204, 0, 0.4)' }}>
          ĐĂNG NHẬP VỚI PI
        </button>
      </div>
    );
  }

  // HÀM TÍNH TỌA ĐỘ CHUẨN 30x40 THEO R&D
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  // COMPONENT NÚT (NODE) VỚI STYLE "SUPREME"
  const Node = ({ x, y, children, onClick, active = false }: any) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      style={{ 
        ...getPos(x, y), 
        position: 'absolute', transform: 'translate(-50%, 0%)', 
        zIndex: 50, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
        color: active ? '#ffcc00' : '#fff',
        filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))'
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ position: 'relative', backgroundColor: '#000', height: '100vh', width: '100vw', overflow: 'hidden', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* --- LỚP NỘI DUNG (CONTENT LAYER) --- */}
      <div style={{ position: 'absolute', inset: 0 }}>
        
        {/* RIGHT ACTION BAR - TỌA ĐỘ CHUẨN 27.5 */}
        <Node x={27.5} y={37.5}><SvgIcon name="search" /></Node>
        <Node x={27.5} y={24}><SvgIcon name="heart" /></Node>
        <Node x={27.5} y={19}><SvgIcon name="comment" /></Node>
        <Node x={27.5} y={14}><SvgIcon name="share" /></Node>
        <Node x={27.5} y={9}><SvgIcon name="bookmark" /></Node>
        <Node x={27.5} y={4}><SvgIcon name="mail" /></Node>

        {/* LEFT INFO CLUSTER (#12, #13, #14, #15) */}
        <div style={{ position: 'absolute', bottom: '4.5%', left: '2.5%', width: '85%', zIndex: 60, pointerEvents: 'auto' }}>
           
           {/* #14 SHOP KHÁCH */}
           <button style={{ 
             display:'flex', flexDirection:'column', alignItems:'center', padding:'6px', 
             border:'1px solid rgba(255, 204, 0, 0.5)', borderRadius:'8px', 
             backgroundColor:'rgba(0,0,0,0.3)', marginBottom:'10px', cursor:'pointer' 
           }}>
              <div style={{color: '#ffcc00'}}><SvgIcon name="store" size={20} /></div>
              <span style={{fontSize:'8px', fontWeight:'bold', color:'#ffcc00', marginTop:'2px'}}>SHOP</span>
           </button>

           {/* #13 AVATAR & #15 FOLLOW */}
           <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
              <div style={{ 
                width:'48px', height:'48px', borderRadius:'50%', 
                border:'2px solid #fff', backgroundColor:'#222', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)' 
              }}></div>
              <div style={{ display:'flex', flexDirection:'column' }}>
                 <p style={{ fontWeight:'bold', fontSize:'16px', textShadow:'0 1px 3px rgba(0,0,0,1)' }}>@{username || "pioneer"}</p>
                 <span style={{ 
                   fontSize:'10px', color:'#ff4444', border:'1px solid #ff4444', 
                   padding:'1px 8px', borderRadius:'6px', width:'fit-content', marginTop:'2px' 
                 }}>+ follow</span>
              </div>
           </div>

           {/* #12 CAPTION (TRẠNG THÁI THU GỌN 15 KÝ TỰ) */}
           <div onClick={() => setCaptionExpanded(!captionExpanded)} style={{ cursor:'pointer' }}>
              <p style={{ fontSize:'15px', fontWeight:'500', lineHeight:'1.3', textShadow:'0 1px 2px rgba(0,0,0,0.8)' }}>
                {captionExpanded ? "Connect-Pi: Supreme Web3 Experience 2026. Một bản quy hoạch 17 nút bất biến cho kỷ nguyên mới." : "Connect-Pi: Sup..."}
              </p>
           </div>
        </div>
      </div>

      {/* --- LỚP HỆ THỐNG (SYSTEM LAYER) --- */}
      {/* Cụm Nav Đáy (#6 - #10) - TỌA ĐỘ Y: 1.2 */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '90px', 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
        transform: isNavVisible ? 'translateY(0)' : 'translateY(100px)',
        opacity: isNavVisible ? 1 : 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', zIndex: 90, pointerEvents: 'none'
      }}>
        <Node x={6} y={1.2}><SvgIcon name="cart" size={26} /></Node>
        <Node x={11} y={1.2}><SvgIcon name="store" size={26} /></Node>
        <Node x={16} y={1.2} active><div style={{ color: '#ffcc00' }}><SvgIcon name="plus" size={32} /></div></Node>
        <Node x={21} y={1.2}><SvgIcon name="home" size={26} /></Node>
        <Node x={26} y={1.2}><SvgIcon name="mail" size={26} /></Node>
      </div>

      {/* #5 MASTER V (CỐ ĐỊNH) - TỌA ĐỘ 27.5, 0.5 */}
      <div 
        style={{ 
          ...getPos(28.5, 0.5), position: 'fixed', zIndex: 100, cursor: 'pointer', 
          transition: 'transform 0.3s ease', pointerEvents: 'auto'
        }}
        onClick={() => setIsNavVisible(!isNavVisible)}
      >
        <div style={{ 
          transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)', 
          color: isNavVisible ? '#fff' : '#ffcc00',
          filter: 'drop-shadow(0 0 5px rgba(255,204,0,0.5))'
        }}>
          <SvgIcon name="chevron" size={28} />
        </div>
      </div>

      {/* #18 BOT AI (THE GUARDIAN) - KÉO THẢ */}
      <div style={{ 
        position: 'fixed', top: '20%', right: '5%', zIndex: 110, 
        backgroundColor: '#0044ff', padding: '14px', borderRadius: '50%', 
        border: '2px solid #fff', boxShadow: '0 0 20px rgba(0, 68, 255, 0.6)',
        cursor: 'grab'
      }}>
        <div style={{ color: '#fff' }}><SvgIcon name="bot" size={28} /></div>
      </div>

    </div>
  );
    }
    
