import pool from "../config/database.js";

// Assign nurse to room
export const createNurseRoomAssignment = async ({ nurse_id, room_id }) => {
  if (!nurse_id || !room_id) {
    const error = new Error("Nurse and room are required");
    error.statusCode = 400;
    throw error;
  }

  // Check nurse exists
  const nurseResult = await pool.query(
    `
      SELECT id
      FROM nurses
      WHERE id = $1
    `,
    [nurse_id],
  );

  if (nurseResult.rows.length === 0) {
    const error = new Error("Nurse not found");
    error.statusCode = 404;
    throw error;
  }

  // Check room exists
  const roomResult = await pool.query(
    `
      SELECT id
      FROM rooms
      WHERE id = $1
    `,
    [room_id],
  );

  if (roomResult.rows.length === 0) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate assignment
  const existingResult = await pool.query(
    `
      SELECT id
      FROM nurse_room_assignments
      WHERE nurse_id = $1
        AND room_id = $2
    `,
    [nurse_id, room_id],
  );

  if (existingResult.rows.length > 0) {
    const error = new Error("Nurse is already assigned to this room");
    error.statusCode = 409;
    throw error;
  }

  // Create assignment
  const result = await pool.query(
    `
      INSERT INTO nurse_room_assignments (
        nurse_id,
        room_id
      )
      VALUES ($1, $2)
      RETURNING *
    `,
    [nurse_id, room_id],
  );

  return result.rows[0];
};

// Get rooms assigned to nurse
export const getRoomsByNurseId = async (nurseId) => {
  // Check nurse exists
  const nurseResult = await pool.query(
    `
      SELECT id
      FROM nurses
      WHERE id = $1
    `,
    [nurseId],
  );

  if (nurseResult.rows.length === 0) {
    const error = new Error("Nurse not found");
    error.statusCode = 404;
    throw error;
  }

  const result = await pool.query(
    `
      SELECT rooms.*
      FROM nurse_room_assignments
      INNER JOIN rooms
        ON rooms.id = nurse_room_assignments.room_id
      WHERE nurse_room_assignments.nurse_id = $1
      ORDER BY nurse_room_assignments.created_at DESC
    `,
    [nurseId],
  );

  return result.rows;
};

// Remove nurse from room
export const removeNurseRoomAssigment = async (nurseId, roomId) => {
  if (!nurseId || !roomId) {
    const error = new Error("Nurse ID and Room ID are required");
    error.statusCode = 400;
    throw error;
  }

  const result = await pool.query(
    `
      DELETE FROM nurse_room_assignments
      WHERE nurse_id = $1
        AND room_id = $2
      RETURNING *
    `,
    [nurseId, roomId],
  );

  if (result.rows.length === 0) {
    const error = new Error("Nurse is not assigned to this room");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};
