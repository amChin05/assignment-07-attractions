// app/attractions/page.js
"use client"
import React, { useEffect, useState } from 'react'

export default function page() {
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
            <img src={item.coverimage} alt={item.name} className="img-thumb" />
            <p style={{ marginTop: 8 }}>{item.detail}</p>
            <a href={`/attractions/${item.id}`}>Read More</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
