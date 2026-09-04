import { admitPatient, getAdmissions } from "../services/admissions.service.js";

//Get All admission
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await getAdmissions();

    res.status(200).json({
      success: true,
      data: admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admissions",
      error: error.message,
    });
  }
};

// Create admission
export const addAdmission = async (req, res) => {
  try {
    const admission = await admitPatient(req.body);

    res.status(201).json({
      success: true,
      message: "Patient admitted successfully",
      data: admission,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
