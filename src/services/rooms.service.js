import pool from "../config/database.js";

// Get all rooms
export const getRooms = async () => {
  const result = await pool.query(`
    SELECT *
    FROM rooms
    ORDER BY created_at DESC
  `);

  return result.rows;
};

// Create room
export const createRoom = async (room) => {
  const result = await pool.query(
    `
      INSERT INTO rooms (
        room_number,
        type,
        daily_charge
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [room.room_number, room.type, room.daily_charge],
  );

  return result.rows[0];
};

// Get room by ID
export const getRoomById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM rooms
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Update room
export const updateRoomById = async (id, room) => {
  const result = await pool.query(
    `
      UPDATE rooms
      SET
        room_number = $1,
        type = $2,
        daily_charge = $3
      WHERE id = $4
      RETURNING *
    `,
    [room.room_number, room.type, room.daily_charge, id],
  );

  return result.rows[0] || null;
};

// Delete room
export const deleteRoomById = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM rooms
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};
