import {
  createRoom,
  deleteRoomById,
  getRoomById,
  getRooms,
  updateRoomById,
} from "../services/rooms.service.js";

//Get All rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await getRooms();
    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};

//Create room
export const addRoom = async (req, res) => {
  try {
    const { room_number, type, daily_charge } = req.body;
    if (!room_number || !type || daily_charge === undefined) {
      return res.status(400).json({
        success: false,
        message: "Room number, type and daily charge are required",
      });
    }
    const room = await createRoom({
      room_number,
      type,
      daily_charge,
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create room",
      error: error.message,
    });
  }
};

//Get Room by id
export const getRoom = async (req, res) => {
  try {
    const room = await getRoomById(req.params.id);

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Room not found",
      error: error.message,
    });
  }
};

//Update room
export const updateRoom = async (req, res) => {
  try {
    const { room_number, type, daily_charge } = req.body;

    const room = await updateRoomById(req.params.id, {
      room_number,
      type,
      daily_charge,
    });

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Room not found",
      error: error.message,
    });
  }
};

//Delete Room
export const removeRoom = async (req, res) => {
  try {
    await deleteRoomById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Room not found",
      error: error.message,
    });
  }
};
