import {
  createPatient,
  deletePatientById,
  getPatientById,
  getPatients,
  updatePatientById,
} from "../services/patients.service.js";

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await getPatients();
    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
};

//Get single patient
export const getPatient = async (req, res) => {
  try {
    const patient = await getPatientById(req.params.id);
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Patient not found",
      error: error.message,
    });
  }
};

//Create oatient
export const addPatient = async (req, res) => {
  try {
    const { name, date_of_birth, gender, address, phone_number } = req.body;
    if (!name || !date_of_birth || !gender || !address || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const patient = await createPatient({
      name,
      date_of_birth,
      gender,
      address,
      phone_number,
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create patient",
      error: error.message,
    });
  }
};

//Update patient
export const updatePatient = async (req, res) => {
  try {
    const { name, date_of_birth, gender, address, phone_number } = req.body;

    const patient = await updatePatientById(req.params.id, {
      name,
      date_of_birth,
      gender,
      address,
      phone_number,
    });

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Patient not found",
      error: error.message,
    });
  }
};

export const removePatient = async (req, res) => {
  try {
    await deletePatientById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Patient not found",
      error: error.message,
    });
  }
};
