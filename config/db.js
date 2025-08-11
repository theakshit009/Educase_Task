import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
})

export async function verifyDbConnection() {
console.log("DB config:", {
host: process.env.MYSQLHOST || process.env.DB_HOST,
port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
user: (process.env.MYSQLUSER || process.env.DB_USER) ? "***" : undefined,
database: process.env.MYSQLDATABASE || process.env.DB_NAME,
});

try {
const [rows] = await pool.query("SELECT 1 AS ok");
if (rows && rows && rows.ok === 1) {
console.log("✅ Database connection OK");
return true;
} else {
console.error("⚠️ Database test query returned unexpected result:", rows);
return false;
}
} catch (err) {
console.error("❌ Database connection failed:");
console.error(" code:", err.code);
console.error(" errno:", err.errno);
console.error(" sqlState:", err.sqlState);
console.error(" message:", err.message);
return false;
}
}