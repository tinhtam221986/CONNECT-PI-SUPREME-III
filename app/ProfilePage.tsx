"use client";
/* CONNECT-PI SUPREME III - CORE DATA LINE v1.0.1 
   TRIGGER: INITIAL IDENTIFICATION FOR THE BOSS 🚀
*/
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; 

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('videos');

  // --- DỮ LIỆU ĐỊNH DANH (Dòng mạch máu dữ liệu chính) ---
  const bossID = {
    name: "Hùng Connect-Pi 🫡",
    username: "@tinhtam221986",
    wallet: "GD-PI-CONNECT-7HUNG-221986-XXXX", // Mã định danh ví Pi
    reputation: "9.99",
    followers: "1.5M",
    following: "342",
    bio: "👑 Tầm nhìn Connect-Pi: Dữ liệu là mạch máu - Kết nối là sức mạnh. Xây dựng đế chế Web3 trên nền tảng Pi Network."
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#000', color: '#fff', paddingBottom: '80px', overflowY: 'auto' }}>
      
      {/* 1. HEADER: COVER & IDENTITY */}
      <div style={{ position: 'relative', height: '220px', background: 'linear-gradient(180deg, #1a1a1a 0%, #000 100%)' }}>
        <div style={{ position: 'absolute', top: '25px', right: '20px' }}>
          <SupremeIcon name="search" size={26} color="#aaa" />
        </div>

        <div style={{ position: 'absolute', bottom: '-40px', left: '20px', display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
          {/* AVATAR ĐỊNH DANH SIÊU CẤP */}
          <div style={{ 
            width: '105px', height: '105px', borderRadius: '50%', border: '2.5px solid #ffcc00', 
            backgroundColor: '#111', padding: '3px', boxShadow: '0 0 25px rgba(255,204,0,0.25)'
          }}>
            <div style={{ 
              width: '100%', height: '100%', borderRadius: '50%', 
              background: 'linear-gradient(45deg, #222, #444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               <SupremeIcon name="store" size={40} color="#ffcc00" />
            </div>
          </div>
          <div style={{ paddingBottom: '10px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}>
              {bossID.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', color: '#ffcc00', fontWeight: '500' }}>{bossID.username}</span>
              <div style={{ backgroundColor: '#ffcc00', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '6px', height: '6px', backgroundColor: '#000', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHỈ SỐ MẠCH MÁU DỮ LIỆU */}
      <div style={{ marginTop: '65px', padding: '0 25px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '19px', fontWeight: 'bold' }}>{bossID.followers}</div>
          <div style={{ fontSize: '11px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Người theo</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '19px', fontWeight: 'bold' }}>{bossID.following}</div>
          <div style={{ fontSize: '11px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Đang theo</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '19px', fontWeight: 'bold', color: '#ffcc00' }}>{bossID.reputation}</div>
          <div style={{ fontSize: '11px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Uy tín Web3</div>
        </div>
      </div>

      {/* 3. WEB3 WALLET ID & BIO */}
      <div style={{ padding: '25px 25px 15px 25px' }}>
        <div style={{ 
          backgroundColor: '#0a0a0a', padding: '12px 18px', borderRadius: '12px', 
          border: '0.8px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{bossID.wallet}</span>
          <span style={{ fontSize: '10px', color: '#ffcc00', fontWeight: 'bold' }}>COPY</span>
        </div>
        <p style={{ fontSize: '14px', color: '#eee', marginTop: '18px', lineHeight: '1.6', opacity: 0.9 }}>
          {bossID.bio}
        </p>
      </div>

      {/* 4. HÀNH ĐỘNG CHỦ CHỐT */}
      <div style={{ padding: '0 25px 20px 25px', display: 'flex', gap: '10px' }}>
        <button style={{ flex: 3, padding: '12px', borderRadius: '8px', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', border: 'none', fontSize: '14px' }}>
          Chỉnh sửa hồ sơ
        </button>
        <button style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#222', border: '0.8px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SupremeIcon name="share" size={20} />
        </button>
      </div>

      {/* 5. TAB NAVIGATION */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #222' }}>
        {['videos', 'shop', 'badges'].map((tab) => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              flex: 1, textAlign: 'center', padding: '15px 0', fontSize: '13px', fontWeight: 'bold',
              color: activeTab === tab ? '#fff' : '#555',
              borderBottom: activeTab === tab ? '2.5px solid #fff' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* 6. KHU VỰC DỮ LIỆU ĐỔ VỀ (GRID) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', padding: '1.5px' }}>
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} style={{ aspectRatio: '9/16', backgroundColor: '#0a0a0a', position: 'relative' }}>
             <div style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <SupremeIcon name="heart" size={12} color="#fff" />
                <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{i}0.5K</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
      }

