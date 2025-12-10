// app/attractions/[id]/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // เพิ่มบรรทัดนี้

// แก้ชื่อฟังก์ชันจาก page เป็น Page (ตัว P ใหญ่)
export default function Page() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttraction() {
      const res = await fetch(`/api/attractions/${id}`);
      const data = await res.json();
      if (res.ok) setAttraction(data);
      setLoading(false);
    }
    fetchAttraction();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!attraction) return <div>Not found.</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>{attraction.name}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={attraction.coverimage} alt={attraction.name} className="img-hero" />
      <p style={{ marginTop: 12 }}>{attraction.detail}</p>
      <p>Latitude: {attraction.latitude}</p>
      <p>Longitude: {attraction.longitude}</p>
      {/* เปลี่ยน <a> เป็น <Link> */}
      <Link href='/attractions'>Back</Link>
    </div>
  );
}