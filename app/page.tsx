'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a002e' }}>
      <h1 style={{ color: '#fbbf24', fontSize: '40px', marginBottom: '10px' }}>CONNECT PI</h1>
      <p style={{ color: '#fbbf24', fontSize: '10px', letterSpacing: '4px', marginBottom: '40px' }}>SUPREME WEB3</p>
      
      <div style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ width: '20px', height: '20px' }} />
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '10px' }}>Tôi đồng ý với Sách Trắng & Điều khoản</p>
        </div>
        
        <button 
          onClick={() => alert('Đang kết nối Pi SDK...')}
          disabled={!agreed}
          style={{ 
            padding: '15px 50px', 
            borderRadius: '15px', 
            backgroundColor: agreed ? '#fbbf24' : '#374151',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            cursor: agreed ? 'pointer' : 'not-allowed'
          }}
        >
          ĐĂNG NHẬP VỚI PI
        </button>
      </div>
    </div>
  );
}
