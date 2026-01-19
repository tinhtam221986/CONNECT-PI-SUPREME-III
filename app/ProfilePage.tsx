"use client";
import React, { useState } from 'react';
import { SupremeIcon } from './SupremeIcons'; // Import tháp Icon đã lưu

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#000', color: '#fff', paddingBottom: '80px' }}>
      
      {/* HEADER: COVER & IDENTITY */}
      <div style={{ position: 'relative', height: '200px', background: 'linear-gradient(180deg, #1a1a1a 0%, #000 100%)' }}>
        {/* Nút quay lại hoặc cài đặt */}
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <SupremeIcon name="search" size={24} color="#aaa" />
        </div>

        <div style={{ position: 'absolute', bottom: '-45px', left: '20px', display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
          {/* AVATAR BOSS - VIỀN VÀNG ĐỊNH DANH */}
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ffcc00', 
            backgroundColor: '#111', padding: '3px', boxShadow: '0 0 20px rgba(255,204,0,0.2)'
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(45deg, #222, #444)' }} />
          </div>
          <div style={{ paddingBottom: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Boss Pi 🫡</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '13px', color: '#ffcc00' }}>@supreme_connect</span>
              <div style={{ backgroundColor: '#ffcc00', width: '12px', height: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: '#000', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHỈ SỐ MẠCH MÁU DỮ LIỆU */}
      <div style={{ marginTop: '60px', padding: '0 25px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>1.5M</div>
          <div style={{ fontSize: '11px', color: '#777' }}>Người theo</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>342</div>
          <div style={{ fontSize: '11px', color: '#777' }}>Đang theo</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>9.9</div>
          <div style={{ fontSize: '11px', color: '#777' }}>Uy tín Web3</div>
        </div>
      </div>

      {/* WEB3 WALLET & BIO */}
      <div style={{ padding: '20px 25px' }}>
        <div style={{ 
          backgroundColor: '#111', padding: '10px 15px', borderRadius: '10px', 
          border: '0.5px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontSize: '12px', color: '#aaa', fontFamily: 'monospace' }}>GDKS...9XRT...PI_WALLET</span>
          <span style={{ fontSize: '10px', color: '#ffcc00' }}>SAO CHÉP</span>
        </div>
        <p style={{ fontSize: '14px', color: '#ddd', marginTop: '15px', lineHeight: '1.5' }}>
          👑 Người dẫn đầu hệ sinh thái Connect-Pi. <br/>
          🌍 Tầm nhìn số hóa vạn vật trên chuỗi khối Pi. <br/>
          🤝 Kết nối bền vững - Dữ liệu minh bạch.
        </p>
      </div>

      {/* TAB NAVIGATION */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #222', marginTop: '10px' }}>
        {['videos', 'shop', 'badges'].map((tab) => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              flex: 1, textAlign: 'center', padding: '15px 0', fontSize: '13px', fontWeight: 'bold',
              color: activeTab === tab ? '#fff' : '#555',
              borderBottom: activeTab === tab ? '2px solid #fff' : 'none',
              transition: '0.3s'
            }}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* NỘI DUNG GRID (DỮ LIỆU MẠCH MÁU) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', padding: '1.5px' }}>
        {[1,2,3,4,5,6,7,8,9].map((i) => (
          <div key={i} style={{ aspectRatio: '9/16', backgroundColor: '#0a0a0a', border: '0.1px solid #1a1a1a' }}>
             {/* Thumbnail video sẽ ở đây */}
          </div>
        ))}
      </div>
    </div>
  );
      }
