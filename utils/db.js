import mysql from 'mysql2';

export const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,      // ให้รับค่า Host จาก Vercel
  user: process.env.DB_USER,      // ให้รับค่า User จาก Vercel
  password: process.env.DB_PASSWORD, // ให้รับค่า Password จาก Vercel
  database: process.env.DB_NAME,  // ให้รับค่า Database Name จาก Vercel
  port: 4000,                     // TiDB ใช้พอร์ต 4000 เสมอ
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});