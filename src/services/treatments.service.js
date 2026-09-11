import pool from "../config/database.js";

// Get all treatments
export const getTreatments = async () => {
  const result = await pool.query(`
    SELECT *
    FROM treatments
    ORDER BY created_at DESC
  `);

  return result.rows;
};

// Get treatment by ID
export const getTreatmentById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM treatments
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Create treatment
export const createTreatment = async (treatment) => {
  const result = await pool.query(
    `
      INSERT INTO treatments (
        doctor_id,
        patient_id,
        treatment_date,
        diagnosis,
        medication
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [
      treatment.doctor_id,
      treatment.patient_id,
      treatment.treatment_date,
      treatment.diagnosis,
      treatment.medication,
    ],
  );

  return result.rows[0];
};

// Update treatment
export const updateTreatmentById = async (id, treatment) => {
  const result = await pool.query(
    `
      UPDATE treatments
      SET
        doctor_id = $1,
        patient_id = $2,
        treatment_date = $3,
        diagnosis = $4,
        medication = $5
      WHERE id = $6
      RETURNING *
    `,
    [
      treatment.doctor_id,
      treatment.patient_id,
      treatment.treatment_date,
      treatment.diagnosis,
      treatment.medication,
      id,
    ],
  );

  return result.rows[0] || null;
};

// Delete treatment
export const deleteTreatmentById = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM treatments
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Get all treatments of patient
export const getTreatmentsByPatientId = async (patientId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM treatments
      WHERE patient_id = $1
      ORDER BY treatment_date DESC
    `,
    [patientId],
  );

  return result.rows;
};

// Get all treatments performed by doctor
export const getTreatmentsByDoctorId = async (doctorId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM treatments
      WHERE doctor_id = $1
      ORDER BY treatment_date DESC
    `,
    [doctorId],
  );

  return result.rows;
};
