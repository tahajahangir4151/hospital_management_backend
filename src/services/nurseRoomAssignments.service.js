import prisma from "../config/prisma.js";

// Assign nurse to room
export const createNurseRoomAssignment = async ({ nurse_id, room_id }) => {
  if (!nurse_id || !room_id) {
    const error = new Error("Nurse and room are required");
    error.statusCode = 400;
    throw error;
  }

  // Check nurse exists
  const nurse = await prisma.nurses.findUnique({
    where: {
      id: nurse_id,
    },
    select: {
      id: true,
    },
  });

  if (!nurse) {
    const error = new Error("Nurse not found");
    error.statusCode = 404;
    throw error;
  }

  // Check room exists
  const room = await prisma.rooms.findUnique({
    where: {
      id: room_id,
    },
    select: {
      id: true,
    },
  });

  if (!room) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate assignment
  const existingAssignment = await prisma.nurse_room_assignments.findFirst({
    where: {
      nurse_id,
      room_id,
    },
    select: {
      id: true,
    },
  });

  if (existingAssignment) {
    const error = new Error("Nurse is already assigned to this room");
    error.statusCode = 409;
    throw error;
  }

  // Create assignment
  const assignment = await prisma.nurse_room_assignments.create({
    data: {
      nurse_id,
      room_id,
    },
  });

  return assignment;
};

// Get rooms assigned to nurse
export const getRoomsByNurseId = async (nurseId) => {
  // Check nurse exists
  const nurse = await prisma.nurses.findUnique({
    where: {
      id: nurseId,
    },
    select: {
      id: true,
    },
  });

  if (!nurse) {
    const error = new Error("Nurse not found");
    error.statusCode = 404;
    throw error;
  }

  const assignments = await prisma.nurse_room_assignments.findMany({
    where: {
      nurse_id: nurseId,
    },
    include: {
      rooms: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return assignments.map((assignment) => assignment.rooms);
};

// Remove nurse from room
export const removeNurseRoomAssigment = async (nurseId, roomId) => {
  if (!nurseId || !roomId) {
    const error = new Error("Nurse ID and Room ID are required");
    error.statusCode = 400;
    throw error;
  }

  const result = await prisma.nurse_room_assignments.deleteMany({
    where: {
      nurse_id: nurseId,
      room_id: roomId,
    },
  });

  if (result.count === 0) {
    const error = new Error("Nurse is not assigned to this room");
    error.statusCode = 404;
    throw error;
  }

  return {
    nurse_id: nurseId,
    room_id: roomId,
  };
};
