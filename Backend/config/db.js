import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    port:3307,
    user: 'root',
    password: 'Theonylakasey1!',
    database: 'artisanhub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;