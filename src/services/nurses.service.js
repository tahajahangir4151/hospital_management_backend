import pool from "../config/database.js";

// Get all nurses
export const getNurses = async () => {
  const result = await pool.query(`
    SELECT *
    FROM nurses
    ORDER BY created_at DESC
  `);

  return result.rows;
};

// Create nurse
export const createNurse = async (nurse) => {
  const result = await pool.query(
    `
      INSERT INTO nurses (
        name,
        shift_timing,
        contact_number,
        department_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [nurse.name, nurse.shift_timing, nurse.contact_number, nurse.department_id],
  );

  return result.rows[0];
};

// Get nurse by ID
export const getNurseById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM nurses
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Update nurse
export const updateNurseById = async (id, nurse) => {
  const result = await pool.query(
    `
      UPDATE nurses
      SET
        name = $1,
        shift_timing = $2,
        contact_number = $3,
        department_id = $4
      WHERE id = $5
      RETURNING *
    `,
    [
      nurse.name,
      nurse.shift_timing,
      nurse.contact_number,
      nurse.department_id,
      id,
    ],
  );

  return result.rows[0] || null;
};

// Delete nurse
export const deleteNurseById = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM nurses
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};
