'use client'; // ใช้ Client Component เพื่อดึงข้อมูล

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // ใช้ดึงค่า ID จาก URL
import Link from 'next/link';

export default function MemberDetail() {
  const params = useParams(); // ดึงค่า id จาก URL (เช่น /member/1 ก็จะได้ id=1)
  const id = params.id;
  
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลเมื่อมี id
    if (id) {
      fetch(`/api/members/${id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
          setMember(data);
          setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>กำลังโหลดข้อมูล...</div>;
  if (!member || member.error) return <div style={{ padding: '20px', textAlign: 'center' }}>ไม่พบข้อมูลสมาชิก</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* ปุ่มย้อนกลับ */}
      <Link href="/">
        <button style={{ 
          marginBottom: '20px', 
          padding: '8px 16px', 
          cursor: 'pointer',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}>
          ← ย้อนกลับ
        </button>
      </Link>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        padding: '30px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
            <img 
              src={member.coverimage || 'https://via.placeholder.com/400x400?text=No+Image'} 
              alt={member.name} 
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                borderRadius: '10px',
                marginBottom: '20px' 
              }} 
            />
        </div>
        
        <h1 style={{ color: '#0070f3', textAlign: 'center' }}>{member.name}</h1>
        <h3 style={{ color: '#555', textAlign: 'center', marginBottom: '20px' }}>ตำแหน่ง: {member.role}</h3>
        
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />
        
        <div>
          <h4 style={{ marginBottom: '10px' }}>📄 ประวัติและรายละเอียด:</h4>
          <p style={{ lineHeight: '1.6', color: '#333' }}>
            {member.detail}
          </p>
        </div>
      </div>
    </div>
  );
}