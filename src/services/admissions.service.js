import pool from "../config/database.js";

// Get all admissions
export const getAdmissions = async () => {
  const result = await pool.query(`
    SELECT *
    FROM room_assignments
    ORDER BY admission_date DESC
  `);

  return result.rows;
};

// Admit patient
export const admitPatient = async ({ patient_id, room_id, admission_date }) => {
  if (!patient_id || !room_id) {
    const error = new Error("Patient and room are required");
    error.statusCode = 400;
    throw error;
  }

  // Check patient exists
  const patientResult = await pool.query(
    `
      SELECT id
      FROM patients
      WHERE id = $1
    `,
    [patient_id],
  );

  if (patientResult.rows.length === 0) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  // Check room exists
  const roomResult = await pool.query(
    `
      SELECT id, room_number, type
      FROM rooms
      WHERE id = $1
    `,
    [room_id],
  );

  const room = roomResult.rows[0];

  if (!room) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  // Check patient does not already have an active admission
  const activePatientResult = await pool.query(
    `
      SELECT id, room_id
      FROM room_assignments
      WHERE patient_id = $1
        AND discharge_date IS NULL
      LIMIT 1
    `,
    [patient_id],
  );

  if (activePatientResult.rows.length > 0) {
    const error = new Error("Patient already has an active room assignment");
    error.statusCode = 409;
    throw error;
  }

  // Get active admissions for selected room
  const activeRoomResult = await pool.query(
    `
      SELECT id
      FROM room_assignments
      WHERE room_id = $1
        AND discharge_date IS NULL
    `,
    [room_id],
  );

  // General room can contain multiple patients.
  // Other room types can have only one active patient.
  if (
    room.type?.toLowerCase() !== "general" &&
    activeRoomResult.rows.length > 0
  ) {
    const error = new Error("Room is currently occupied");
    error.statusCode = 409;
    throw error;
  }

  let result;

  // If admin provides admission date
  if (admission_date) {
    result = await pool.query(
      `
        INSERT INTO room_assignments (
          patient_id,
          room_id,
          admission_date
        )
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [patient_id, room_id, admission_date],
    );
  } else {
    // Let PostgreSQL use the default admission_date
    result = await pool.query(
      `
        INSERT INTO room_assignments (
          patient_id,
          room_id
        )
        VALUES ($1, $2)
        RETURNING *
      `,
      [patient_id, room_id],
    );
  }

  return result.rows[0];
};

// Discharge patient
export const dischargePatient = async (admissionId) => {
  const result = await pool.query(
    `
      UPDATE room_assignments
      SET discharge_date = NOW()
      WHERE id = $1
        AND discharge_date IS NULL
      RETURNING *
    `,
    [admissionId],
  );

  if (result.rows.length === 0) {
    const error = new Error("Active admission not found");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

// Get admission history for patient
export const getAdmissionsByPatientId = async (patientId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM room_assignments
      WHERE patient_id = $1
      ORDER BY admission_date DESC
    `,
    [patientId],
  );

  return result.rows;
};

// Get admission history for room
export const getAdmissionsByRoomId = async (roomId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM room_assignments
      WHERE room_id = $1
      ORDER BY admission_date DESC
    `,
    [roomId],
  );

  return result.rows;
};

// Get current room occupants
export const getRoomOccupants = async (roomId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM room_assignments
      WHERE room_id = $1
        AND discharge_date IS NULL
      ORDER BY admission_date DESC
    `,
    [roomId],
  );

  return result.rows;
};
