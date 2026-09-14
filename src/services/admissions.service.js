import prisma from "../config/prisma.js";

// Get all admissions
export const getAdmissions = async () => {
  const admissions = await prisma.room_assignments.findMany({
    orderBy: {
      admission_date: "desc",
    },
  });

  return admissions;
};

// Admit patient
export const admitPatient = async ({
  patient_id,
  room_id,
  admission_date,
}) => {
  if (!patient_id || !room_id) {
    const error = new Error("Patient and room are required");
    error.statusCode = 400;
    throw error;
  }

  // Check patient exists
  const patient = await prisma.patients.findUnique({
    where: {
      id: patient_id,
    },
    select: {
      id: true,
    },
  });

  if (!patient) {
    const error = new Error("Patient not found");
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
      room_number: true,
      type: true,
    },
  });

  if (!room) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  // Check patient does not already have an active admission
  const activePatientAdmission =
    await prisma.room_assignments.findFirst({
      where: {
        patient_id,
        discharge_date: null,
      },
      select: {
        id: true,
        room_id: true,
      },
    });

  if (activePatientAdmission) {
    const error = new Error(
      "Patient already has an active room assignment",
    );
    error.statusCode = 409;
    throw error;
  }

  // Count active patients in selected room
  const activeRoomAdmissions =
    await prisma.room_assignments.count({
      where: {
        room_id,
        discharge_date: null,
      },
    });

  // General rooms can contain multiple patients.
  // Other room types can have only one active patient.
  if (
    room.type?.toLowerCase() !== "general" &&
    activeRoomAdmissions > 0
  ) {
    const error = new Error("Room is currently occupied");
    error.statusCode = 409;
    throw error;
  }

  // Create admission
  const admission = await prisma.room_assignments.create({
    data: {
      patient_id,
      room_id,

      // If no date is provided, PostgreSQL/Prisma uses
      // the default value defined in the database.
      ...(admission_date && {
        admission_date: new Date(admission_date),
      }),
    },
  });

  return admission;
};

// Discharge patient
export const dischargePatient = async (admissionId) => {
  const admissions =
    await prisma.room_assignments.updateManyAndReturn({
      where: {
        id: admissionId,
        discharge_date: null,
      },
      data: {
        discharge_date: new Date(),
      },
    });

  if (admissions.length === 0) {
    const error = new Error("Active admission not found");
    error.statusCode = 404;
    throw error;
  }

  return admissions[0];
};

// Get admission history for patient
export const getAdmissionsByPatientId = async (patientId) => {
  const admissions = await prisma.room_assignments.findMany({
    where: {
      patient_id: patientId,
    },
    orderBy: {
      admission_date: "desc",
    },
  });

  return admissions;
};

// Get admission history for room
export const getAdmissionsByRoomId = async (roomId) => {
  const admissions = await prisma.room_assignments.findMany({
    where: {
      room_id: roomId,
    },
    orderBy: {
      admission_date: "desc",
    },
  });

  return admissions;
};

// Get current room occupants
export const getRoomOccupants = async (roomId) => {
  const occupants = await prisma.room_assignments.findMany({
    where: {
      room_id: roomId,
      discharge_date: null,
    },
    orderBy: {
      admission_date: "desc",
    },
  });

  return occupants;
};