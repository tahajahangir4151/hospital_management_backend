import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment
} from "../services/departments.service.js";

//Get All Departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await getDepartments();

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
      error: error.message,
    });
  }
};

//Get single Departments
export const getDepartment = async (req, res) => {
  try {
    const department = await getDepartmentById(req.params.id);
    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Department not found",
      error: error.message,
    });
  }
};

//Create any departments
export const addDepartment = async (req, res) => {
  try {
    const { name, location, contact_number } = req.body;

    if (!name || !location || !contact_number) {
      return res.status(400).json({
        success: false,
        message: "Name, location and contact number are required",
      });
    }

    const department = await createDepartment({
      name,
      location,
      contact_number,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create department",
      error: error.message,
    });
  }
};

// Update deparmtnet

export const updateDepartmentById = async (req, res) => {
  try {
    const { name, location, contact_number } = req.body;
    const department = await updateDepartment(req.params.id, {
      name,
      location,
      contact_number,
    });
    res.status(200).json({
      success: true,
      message: "Department update successfully",
      data: department,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Department not found",
      error: error.message,
    });
  }
};

//Delete Department
export const removeDepartment = async (req, res) => {
  try {
    await deleteDepartment(req.params.id);
    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Department not found",
    });
  }
};
