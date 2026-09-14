import prisma from "../config/prisma.js";

//Get All Departments
export const getDepartments = async () => {
  const departments = await prisma.departments.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return departments;
};

//Get Single Department via id
export const getDepartmentById = async (id) => {
  const department = await prisma.departments.findUnique({
    where: {
      id,
    },
  });
  return department;
};

//Create Deparmtent
export const createDepartment = async (department) => {
  const newDepartment = await prisma.departments.create({
    data: {
      name: department.name,
      location: department.location,
      contact_number: department.contact_number,
    },
  });

  return newDepartment;
};

//Updae department
export const updateDepartment = async (id, department) => {
  const updatedDepartment = await prisma.departments.update({
    where: {
      id,
    },
    data: {
      name: department.name,
      location: department.location,
      contact_number: department.contact_number,
    },
  });
  return updatedDepartment;
};

//Delete any department
export const deleteDepartment = async (id) => {
  const deletedDepartment = await prisma.departments.delete({
    where: { id },
  });
  return deletedDepartment;
};
