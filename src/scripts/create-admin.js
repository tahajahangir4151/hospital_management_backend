import "dotenv/config";
import bcrypt from "bcrypt";
import pool from "../config/database.js";

const email = "admin@hospital.com";
const password = "pwd@13245*";
const fullName = "Hospital Admin";

try {
  const passwordHash = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `
      INSERT INTO users (
        full_name,
        email,
        password_hash,
        role
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        full_name,
        email,
        role,
        created_at
    `,
    [fullName, email.toLowerCase(), passwordHash, "admin"],
  );

  console.log("Admin created successfully:");
  console.log(result.rows[0]);
} catch (error) {
  console.error("Failed to create admin:");
  console.error(error.message);
} finally {
  await pool.end();
}
