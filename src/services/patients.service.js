import pool from "../config/database.js";

// Get all patients
export const getPatients = async () => {
  const result = await pool.query(`
    SELECT *
    FROM patients
    ORDER BY created_at DESC
  `);

  return result.rows;
};

// Get patient by ID
export const getPatientById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM patients
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Create patient
export const createPatient = async (patient) => {
  const result = await pool.query(
    `
      INSERT INTO patients (
        name,
        date_of_birth,
        gender,
        address,
        phone_number
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [
      patient.name,
      patient.date_of_birth,
      patient.gender,
      patient.address,
      patient.phone_number,
    ],
  );

  return result.rows[0];
};

// Update patient
export const updatePatientById = async (id, patient) => {
  const result = await pool.query(
    `
      UPDATE patients
      SET
        name = $1,
        date_of_birth = $2,
        gender = $3,
        address = $4,
        phone_number = $5
      WHERE id = $6
      RETURNING *
    `,
    [
      patient.name,
      patient.date_of_birth,
      patient.gender,
      patient.address,
      patient.phone_number,
      id,
    ],
  );

  return result.rows[0] || null;
};

// Delete patient
export const deletePatientById = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM patients
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};
