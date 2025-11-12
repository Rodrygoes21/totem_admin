import mysql from 'mysql2/promise';

async function checkNotifications() {
  const connection = await mysql.createConnection({
    host: 'turntable.proxy.rlwy.net',
    port: 45450,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'railway'
  });

  try {
    const [rows] = await connection.execute('SELECT DISTINCT tipo FROM Notificacion');
    console.log('Tipos de notificación encontrados:', rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

checkNotifications().catch(console.error);