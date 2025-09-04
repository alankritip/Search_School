import mysql from "mysql2/promise";

const {
  MYSQL_HOST = "localhost",
  MYSQL_PORT = "3306",
  MYSQL_DATABASE = "schoolsdb",
  MYSQL_USER = "root",
  MYSQL_PASSWORD = "hQ5#oUz5F99"
} = process.env;

console.log("DB env:", {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  passLen: MYSQL_PASSWORD?.length
});
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "schoolsdb",
  connectionLimit: 10
});

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      contact VARCHAR(20) NOT NULL,
      image VARCHAR(255) NOT NULL,
      email_id VARCHAR(255) NOT NULL
    )
  `);
}
