import prisma from "../config/prisma.js";

// Get all doctors
export const getAllDoctors = async () => {
  const getDoctors = await prisma.doctors.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return getDoctors;
};

// Get single doctor
export const getDoctorById = async (id) => {
  const getSingleDoctor = await prisma.doctors.findUnique({
    where: {
      id,
    },
  });
  return getSingleDoctor;
};

// Get doctors by department id
export const getDoctorByDepartmentId = async (departmentId) => {
  const doctors = await prisma.doctors.findMany({
    where: {
      department_id: departmentId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return doctors;
};

// Create doctor
export const createDoctor = async (doctor) => {
  const newDoctor = await prisma.doctors.create({
    data: {
      full_name: doctor.full_name,
      specialization: doctor.specialization,
      years_of_experience: doctor.years_of_experience,
      contact_number: doctor.contact_number,
      department_id: doctor.department_id,
    },
  });

  return newDoctor;
};

// Update doctor
export const updateDoctorById = async (id, doctor) => {
  try {
    const updatedDoctor = await prisma.doctors.update({
      where: {
        id,
      },
      data: {
        full_name: doctor.full_name,
        specialization: doctor.specialization,
        years_of_experience: doctor.years_of_experience,
        contact_number: doctor.contact_number,
        department_id: doctor.department_id,
      },
    });

    return updatedDoctor;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Delete doctor
export const deleteDoctor = async (id) => {
  try {
    const deletedDoctor = await prisma.doctors.delete({
      where: {
        id,
      },
    });

    return deletedDoctor;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};
