import prisma from "../config/prisma.js";

// Get all treatments
export const getTreatments = async () => {
  const treatments = await prisma.treatments.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return treatments;
};

// Get treatment by ID
export const getTreatmentById = async (id) => {
  const treatment = await prisma.treatments.findUnique({
    where: {
      id,
    },
  });

  return treatment;
};

// Create treatment
export const createTreatment = async (treatment) => {
  const newTreatment = await prisma.treatments.create({
    data: {
      doctor_id: treatment.doctor_id,
      patient_id: treatment.patient_id,
      treatment_date: new Date(treatment.treatment_date),
      diagnosis: treatment.diagnosis,
      medication: treatment.medication,
    },
  });

  return newTreatment;
};

// Update treatment
export const updateTreatmentById = async (id, treatment) => {
  try {
    const updatedTreatment = await prisma.treatments.update({
      where: {
        id,
      },
      data: {
        doctor_id: treatment.doctor_id,
        patient_id: treatment.patient_id,
        treatment_date: new Date(treatment.treatment_date),
        diagnosis: treatment.diagnosis,
        medication: treatment.medication,
      },
    });

    return updatedTreatment;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Delete treatment
export const deleteTreatmentById = async (id) => {
  try {
    const deletedTreatment = await prisma.treatments.delete({
      where: {
        id,
      },
    });

    return deletedTreatment;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Get all treatments of patient
export const getTreatmentsByPatientId = async (patientId) => {
  const treatments = await prisma.treatments.findMany({
    where: {
      patient_id: patientId,
    },
    orderBy: {
      treatment_date: "desc",
    },
  });

  return treatments;
};

// Get all treatments performed by doctor
export const getTreatmentsByDoctorId = async (doctorId) => {
  const treatments = await prisma.treatments.findMany({
    where: {
      doctor_id: doctorId,
    },
    orderBy: {
      treatment_date: "desc",
    },
  });

  return treatments;
};
