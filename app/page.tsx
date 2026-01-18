"use client";
import React, { useState, useEffect } from 'react';

// --- HỆ THỐNG BIỂU TƯỢNG SVG NGUYÊN BẢN (KHÔNG CẦN THƯ VIỆN) ---
const Icons = {
  Search: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  Share: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
  Bookmark: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>,
  Store: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>,
  Cart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
  Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  ChevronDown: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Bot: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
};

export default function SupremeApp() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
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
      } else {
        alert("Mở trong Pi Browser!");
        setIsLoggedIn(true); // Demo mode
      }
    } catch (err) { setIsLoggedIn(true); }
  };

  if (!isClient) return <div style={{backgroundColor:'#000', height:'100vh'}} />;

  if (!isLoggedIn) {
    return (
      <div style={{backgroundColor:'#000', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h1 style={{color:'#ffcc00', fontSize:'40px', fontWeight:'900', marginBottom:'40px'}}>CONNECT PI</h1>
        <button onClick={handlePiLogin} style={{backgroundColor:'#ffcc00', color:'#000', padding:'15px 40px', borderRadius:'30px', fontWeight:'bold', border:'none'}}>ĐĂNG NHẬP VỚI PI</button>
      </div>
    );
  }

  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, onClick, className = "" }: any) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)', position: 'absolute', zIndex: 50, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ position: 'relative', backgroundColor: '#000', height: '100vh', width: '100vw', overflow: 'hidden', color: '#fff' }}>
      
      {/* --- CONTENT LAYER --- */}
      {activeTab === 'feed' && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Node x={27.5} y={37.5}><Icons.Search /></Node>
          <Node x={27.5} y={24}><Icons.Heart /></Node>
          <Node x={27.5} y={19}><Icons.Message /></Node>
          <Node x={27.5} y={14}><Icons.Share /></Node>
          <Node x={27.5} y={9}><Icons.Bookmark /></Node>
          <Node x={27.5} y={4}><Icons.Mail /></Node>

          {/* LEFT INFO */}
          <div style={{ position: 'absolute', bottom: '5%', left: '2.5%', width: '80%', zIndex: 60 }}>
             <button style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'4px', border:'1px solid #ffcc0080', borderRadius:'4px', backgroundColor:'transparent', marginBottom:'12px'}}>
                <Icons.Store />
                <span style={{fontSize:'7px', fontWeight:'bold', color:'#ffcc00'}}>SHOP</span>
             </button>
             <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                <div style={{width:'44px', height:'44px', borderRadius:'50%', border:'2px solid #fff', backgroundColor:'#333'}} onClick={() => setActiveTab('profile')}></div>
                <div>
                   <p style={{fontWeight:'bold', fontSize:'15px'}}>@{username || "pioneer"}</p>
                   <span style={{fontSize:'10px', color:'#ff4444', border:'1px solid #ff4444', padding:'1px 6px', borderRadius:'4px'}}>+ follow</span>
                </div>
             </div>
             <div onClick={() => setCaptionExpanded(!captionExpanded)}>
                <p style={{fontSize:'14px', lineHeight:'1.2'}}>
                  {captionExpanded ? "Connect-Pi: Supreme Web3 Experience 2026. Bản quy hoạch 17 nút bất biến." : "Connect-Pi: Sup..."}
                </p>
             </div>
          </div>
        </div>
      )}

      {/* --- SYSTEM LAYER --- */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px', 
        transition: 'transform 0.3s ease', transform: isNavVisible ? 'translateY(0)' : 'translateY(100px)',
        background: 'linear-gradient(transparent, #000)', zIndex: 90, pointerEvents: 'none'
      }}>
        <Node x={6} y={1.2} onClick={() => setActiveTab('market')}><Icons.Cart /></Node>
        <Node x={11} y={1.2} onClick={() => setActiveTab('market')}><Icons.Store /></Node>
        <Node x={16} y={1.2}><div style={{color:'#ffcc00'}}><Icons.Plus /></div></Node>
        <Node x={21} y={1.2} onClick={() => setActiveTab('feed')}><Icons.Home /></Node>
        <Node x={26} y={1.2}><Icons.Mail /></Node>
      </div>

      {/* MASTER V (#5) */}
      <div 
        style={{ ...getPos(28.5, 0.5), position: 'fixed', zIndex: 100, cursor: 'pointer', transition: 'transform 0.3s' }}
        onClick={() => setIsNavVisible(!isNavVisible)}
      >
        <div style={{ transform: isNavVisible ? 'rotate(0deg)' : 'rotate(180deg)', color: isNavVisible ? '#fff' : '#ffcc00' }}>
          <Icons.ChevronDown />
        </div>
      </div>

      {/* BOT AI (#18) */}
      <div style={{ position: 'fixed', top: '20%', right: '5%', zIndex: 110, backgroundColor: '#0033ff', padding: '12px', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 0 15px #0033ff' }}>
        <Icons.Bot />
      </div>

    </div>
  );
}
  
