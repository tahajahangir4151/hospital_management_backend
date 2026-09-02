import { createDepartment, getDepartments } from "../services/departments.service.js";

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
