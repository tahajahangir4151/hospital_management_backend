import prisma from "../config/prisma.js";

// Get all patients
export const getPatients = async () => {
  const patients = await prisma.patients.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return patients;
};

// Get patient by ID
export const getPatientById = async (id) => {
  const patient = await prisma.patients.findUnique({
    where: {
      id,
    },
  });

  return patient;
};

// Create patient
export const createPatient = async (patient) => {
  const newPatient = await prisma.patients.create({
    data: {
      name: patient.name,
      date_of_birth: new Date(patient.date_of_birth),
      gender: patient.gender,
      address: patient.address,
      phone_number: patient.phone_number,
    },
  });

  return newPatient;
};

// Update patient
export const updatePatientById = async (id, patient) => {
  try {
    const updatedPatient = await prisma.patients.update({
      where: {
        id,
      },
      data: {
        name: patient.name,
        date_of_birth: new Date(patient.date_of_birth),
        gender: patient.gender,
        address: patient.address,
        phone_number: patient.phone_number,
      },
    });

    return updatedPatient;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Delete patient
export const deletePatientById = async (id) => {
  try {
    const deletedPatient = await prisma.patients.delete({
      where: {
        id,
      },
    });

    return deletedPatient;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};
