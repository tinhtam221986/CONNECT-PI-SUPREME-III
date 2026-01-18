"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Search, 
  ShoppingCart, Home, PlusSquare, Mail, ChevronDown, 
  Store, Bot, Volume2, VolumeX, Plus, Play, Loader2, Check, Infinity, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupremeApp() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  // LOGIC HỆ THỐNG (SYSTEM LAYER)
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('feed'); // feed, profile, market, inbox
  
  // LOGIC NỘI TẠI (CONTENT LAYER)
  const [isMuted, setIsMuted] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [followStatus, setFollowStatus] = useState('none');

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
        alert("Vui lòng mở trong Pi Browser!");
        setIsLoggedIn(true); // Demo mode for development
      }
    } catch (err) { setIsLoggedIn(true); }
  };

  if (!isClient) return <div className="bg-black h-screen" />;

  // 1. GIAO DIỆN ĐĂNG NHẬP
  if (!isLoggedIn) {
    return (
      <div className="bg-black h-screen flex flex-col items-center justify-center">
        <h1 className="text-[#ffcc00] text-4xl font-black mb-10 tracking-tighter">CONNECT PI</h1>
        <button onClick={handlePiLogin} className="bg-[#ffcc00] text-black px-10 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,204,0,0.5)]">
          ĐĂNG NHẬP VỚI PI
        </button>
      </div>
    );
  }

  // HÀM TÍNH TỌA ĐỘ CHUẨN 30x40
  const getPos = (gridX: number, gridY: number) => ({
    left: `${(gridX / 30) * 100}%`,
    bottom: `${(gridY / 40) * 100}%`,
  });

  const Node = ({ x, y, children, onClick, className = "" }: any) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className={`absolute pointer-events-auto flex flex-col items-center justify-center z-50 cursor-pointer ${className}`}
      style={{ ...getPos(x, y), transform: 'translate(-50%, 0%)' }}
    >
      {children}
    </div>
  );

  return (
    <div className="relative bg-black h-screen w-screen overflow-hidden text-white select-none">
      
      {/* --- LỚP NỘI DUNG (CONTENT LAYER - TAB: FEED) --- */}
      {activeTab === 'feed' && (
        <div className="absolute inset-0 z-0">
          {/* #17 Kính lúp */}
          <Node x={27.5} y={37.5}><Search size={24} className="drop-shadow-lg text-[#ffcc00]" /></Node>
          
          {/* Cụm Tương tác Phải */}
          <Node x={27.5} y={24}><Heart size={28} strokeWidth={1.5} /></Node>
          <Node x={27.5} y={19}><MessageCircle size={28} strokeWidth={1.5} /></Node>
          <Node x={27.5} y={14}><Share2 size={28} strokeWidth={1.5} /></Node>
          <Node x={27.5} y={9}><Bookmark size={28} strokeWidth={1.5} /></Node>

          {/* #11 Loa Đa Năng */}
          <Node x={27.5} y={4} onClick={() => setShowAudioMenu(!showAudioMenu)}>
            <div className="relative">
              {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
              <AnimatePresence>
                {showAudioMenu && (
                  <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:-140 }} exit={{ opacity:0 }}
                    className="absolute top-[-100px] bg-black/90 border border-[#ffcc00]/30 rounded-xl w-36 flex flex-col overflow-hidden">
                    <button className="p-3 text-[10px] border-b border-white/10" onClick={() => setIsMuted(!isMuted)}>MỞ/TẮT ÂM</button>
                    <button className="p-3 text-[10px] border-b border-white/10">LƯU ÂM THANH</button>
                    <button className="p-3 text-[10px] text-[#ffcc00]">DÙNG ÂM THANH</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Node>

          {/* Cụm Thông tin Trái (#12, #13, #14) */}
          <div className="absolute bottom-[5%] left-[2.5%] w-[80%] flex flex-col gap-3 pointer-events-auto">
             {/* #14 Shop Khách */}
             <button className="w-fit flex flex-col items-center p-1 border border-[#ffcc00]/50 rounded bg-black/20">
                <Store size={18} className="text-[#ffcc00]" />
                <span className="text-[7px] font-bold text-[#ffcc00]">SHOP</span>
             </button>

             {/* #13 Avatar & Username */}
             <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-full border-2 border-white bg-gray-600 overflow-hidden" 
                     onClick={() => setActiveTab('profile')}></div>
                <div>
                   <p className="font-bold text-[15px]">@{username || "pioneer"}</p>
                   <button className="text-[10px] text-red-500 border border-red-500 px-2 rounded-md">+ follow</button>
                </div>
             </div>

             {/* #12 Caption (Thu gọn 15 ký tự) */}
             <div onClick={() => setCaptionExpanded(!captionExpanded)}>
                <p className="text-[14px]">
                  {captionExpanded ? "Connect-Pi: Supreme Web3 Experience 2026. Một tầm nhìn mới của đội ngũ R&D." : "Connect-Pi: Sup..."}
                </p>
             </div>
          </div>
        </div>
      )}

      {/* --- LỚP HỆ THỐNG (SYSTEM LAYER - FIXED) --- */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent z-[90] pointer-events-none">
            {/* #10 Cart */}
            <Node x={6} y={1.2} onClick={() => setActiveTab('market')}><ShoppingCart size={26} /></Node>
            {/* #9 Market */}
            <Node x={11} y={1.2} onClick={() => setActiveTab('market')}><Store size={26} /></Node>
            {/* #8 Plus */}
            <Node x={16} y={1.2}><PlusSquare size={30} className="text-[#ffcc00]" /></Node>
            {/* #7 Home/Back */}
            <Node x={21} y={1.2} onClick={() => activeTab === 'profile' ? setActiveTab('feed') : setActiveTab('profile')}>
               {activeTab === 'profile' ? <ArrowLeft size={28} /> : <Home size={28} />}
            </Node>
            {/* #6 Inbox */}
            <Node x={26} y={1.2}><Mail size={26} /></Node>
          </motion.div>
        )}
      </AnimatePresence>

      {/* #5 MASTER V - CÔNG TẮC TỔNG */}
      <div className="fixed z-[100] cursor-pointer pointer-events-auto" 
           style={{ ...getPos(28.5, 0.5), transform: 'translate(-50%, 0%)' }}
           onClick={() => setIsNavVisible(!isNavVisible)}>
        <ChevronDown size={30} className={`transition-transform duration-300 ${isNavVisible ? "" : "rotate-180 text-[#ffcc00]"}`} />
      </div>

      {/* #18 BOT AI (THE GUARDIAN) - KÉO THẢ */}
      <motion.div drag dragMomentum={false} className="fixed z-[110] pointer-events-auto cursor-pointer" style={{ top: '20%', right: '5%' }}>
        <div className="bg-[#0033ff] p-3 rounded-full border-2 border-white shadow-[0_0_15px_#0033ff]">
          <Bot size={28} color="white" />
        </div>
      </motion.div>

    </div>
  );
          }
        
