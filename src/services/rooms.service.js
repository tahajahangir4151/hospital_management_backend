import prisma from "../config/prisma.js";

// Get all rooms
export const getRooms = async () => {
  const rooms = await prisma.rooms.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return rooms;
};

// Create room
export const createRoom = async (room) => {
  const newRoom = await prisma.rooms.create({
    data: {
      room_number: room.room_number,
      type: room.type,
      daily_charge: room.daily_charge,
    },
  });

  return newRoom;
};

// Get room by ID
export const getRoomById = async (id) => {
  const room = await prisma.rooms.findUnique({
    where: {
      id,
    },
  });

  return room;
};

// Update room
export const updateRoomById = async (id, room) => {
  try {
    const updatedRoom = await prisma.rooms.update({
      where: {
        id,
      },
      data: {
        room_number: room.room_number,
        type: room.type,
        daily_charge: room.daily_charge,
      },
    });

    return updatedRoom;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Delete room
export const deleteRoomById = async (id) => {
  try {
    const deletedRoom = await prisma.rooms.delete({
      where: {
        id,
      },
    });

    return deletedRoom;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};
