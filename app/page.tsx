'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#fbbf24', fontSize: '3rem', fontStyle: 'italic' }}>CONNECT PI</h1>
      <p style={{ color: '#9ca3af', fontSize: '12px', letterSpacing: '2px' }}>SUPREME WEB3 ECOSYSTEM</p>
      
      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #374151', borderRadius: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <input type="checkbox" onChange={(e) => setAgreed(e.target.checked)} />
          <span style={{ fontSize: '10px', marginLeft: '10px' }}>Tôi đồng ý với Sách Trắng và Điều khoản.</span>
        </div>
        
        <button 
          disabled={!agreed}
          style={{ 
            padding: '15px 40px', 
            borderRadius: '10px', 
            backgroundColor: agreed ? '#fbbf24' : '#374151',
            color: 'black',
            fontWeight: 'bold',
            border: 'none'
          }}
        >
          ĐĂNG NHẬP VỚI PI
        </button>
      </div>
    </div>
  );
}
