import prisma from "../config/prisma.js";

// Get all nurses
export const getNurses = async () => {
  const nurses = await prisma.nurses.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return nurses;
};

// Create nurse
export const createNurse = async (nurse) => {
  const newNurse = await prisma.nurses.create({
    data: {
      name: nurse.name,
      shift_timing: nurse.shift_timing,
      contact_number: nurse.contact_number,
      department_id: nurse.department_id,
    },
  });

  return newNurse;
};

// Get nurse by ID
export const getNurseById = async (id) => {
  const nurse = await prisma.nurses.findUnique({
    where: {
      id,
    },
  });

  return nurse;
};

// Update nurse
export const updateNurseById = async (id, nurse) => {
  try {
    const updatedNurse = await prisma.nurses.update({
      where: {
        id,
      },
      data: {
        name: nurse.name,
        shift_timing: nurse.shift_timing,
        contact_number: nurse.contact_number,
        department_id: nurse.department_id,
      },
    });

    return updatedNurse;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Delete nurse
export const deleteNurseById = async (id) => {
  try {
    const deletedNurse = await prisma.nurses.delete({
      where: {
        id,
      },
    });

    return deletedNurse;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};
