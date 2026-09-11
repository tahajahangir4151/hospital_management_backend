import pool from "../config/database.js";

// Get all doctors
export const getAllDoctors = async () => {
  const result = await pool.query(`
    SELECT *
    FROM doctors
    ORDER BY created_at DESC
  `);

  return result.rows;
};

// Get single doctor
export const getDoctorById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM doctors
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Get doctors by department id
export const getDoctorByDepartmentId = async (departmentId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM doctors
      WHERE department_id = $1
      ORDER BY created_at DESC
    `,
    [departmentId],
  );

  return result.rows;
};

// Create doctor
export const createDoctor = async (doctor) => {
  const result = await pool.query(
    `
      INSERT INTO doctors (
        full_name,
        specialization,
        years_of_experience,
        contact_number,
        department_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [
      doctor.full_name,
      doctor.specialization,
      doctor.years_of_experience,
      doctor.contact_number,
      doctor.department_id,
    ],
  );

  return result.rows[0];
};

// Update doctor
export const updateDoctorById = async (id, doctor) => {
  const result = await pool.query(
    `
      UPDATE doctors
      SET
        full_name = $1,
        specialization = $2,
        years_of_experience = $3,
        contact_number = $4,
        department_id = $5
      WHERE id = $6
      RETURNING *
    `,
    [
      doctor.full_name,
      doctor.specialization,
      doctor.years_of_experience,
      doctor.contact_number,
      doctor.department_id,
      id,
    ],
  );

  return result.rows[0] || null;
};

// Delete doctor
export const deleteDoctor = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM doctors
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};
