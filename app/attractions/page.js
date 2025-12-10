// app/attractions/page.js
"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link' // เพิ่มบรรทัดนี้

// แก้ชื่อฟังก์ชันจาก page เป็น Page (ตัว P ใหญ่)
export default function Page() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      const res = await fetch(`/api/attractions`);
      const data = await res.json();
      setAttractions(data);
      setLoading(false);
    }
    fetchAttractions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 16px" }}>
      <h1>Attractions</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {attractions.map((item) => (
          <li key={item.id} className="card">
            <h2 style={{ marginBottom: 8 }}>{item.name}</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.coverimage} alt={item.name} className="img-thumb" />
            <p style={{ marginTop: 8 }}>{item.detail}</p>
            {/* เปลี่ยน <a> เป็น <Link> */}
            <Link href={`/attractions/${item.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}