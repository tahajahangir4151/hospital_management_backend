import "dotenv/config";
import pool from "./src/config/database.js";

try {
  const result = await pool.query(`SELECT  current_database(),
      current_user,
      NOW() AS connected_at`);
  console.log("PostgreSQL connected successfully!");
  console.log(result.rows[0]);
} catch (error) {
  console.error("PostgreSQL connection failed:");
  console.error(error.message);
} finally {
  await pool.end();
}
