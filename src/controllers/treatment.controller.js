import {
  createTreatment,
  deleteTreatmentById,
  getTreatmentById,
  getTreatments,
  getTreatmentsByDoctorId,
  getTreatmentsByPatientId,
  updateTreatmentById,
} from "../services/treatments.service.js";

//Get treatments
export const getAllTreatments = async (req, res) => {
  try {
    const treatments = await getTreatments();
    res.status(200).json({
      success: true,
      data: treatments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch treatments",
      error: error.message,
    });
  }
};

//Get treatment by id
export const getTreatment = async (req, res) => {
  try {
    const treatment = await getTreatmentById(req.params.id);
    res.status(200).json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Treatment not found",
      error: error.message,
    });
  }
};

//Create treatment
export const addTreatment = async (req, res) => {
  try {
    const { doctor_id, patient_id, treatment_date, diagnosis, medication } =
      req.body;

    if (!doctor_id || !patient_id || !treatment_date || !diagnosis) {
      return res.status(400).json({
        success: false,
        message: "Doctor, patient, treatment date and diagnosis are required",
      });
    }

    const treatment = await createTreatment({
      doctor_id,
      patient_id,
      treatment_date,
      diagnosis,
      medication,
    });
    res.status(201).json({
      success: true,
      message: "Treatment created successfully",
      data: treatment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create treatment",
      error: error.message,
    });
  }
};

//Update treatment By id
export const updateTreatment = async (req, res) => {
  try {
    const { doctor_id, patient_id, treatment_date, diagnosis, medication } =
      req.body;

    const treatment = await updateTreatmentById(req.params.id, {
      doctor_id,
      patient_id,
      treatment_date,
      diagnosis,
      medication,
    });

    res.status(200).json({
      success: true,
      message: "Treatment updated successfully",
      data: treatment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Treatment not found",
      error: error.message,
    });
  }
};

//Delete Treamtnet
export const removeTreatment = async (req, res) => {
  try {
    await deleteTreatmentById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Treatment deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Treatment not found",
      error: error.message,
    });
  }
};

//Get patient treatments
export const getPatientTreatments = async (req, res) => {
  try {
    const treatments = await getTreatmentsByPatientId(req.params.id);

    res.status(200).json({
      success: true,
      data: treatments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patient treatments",
      error: error.message,
    });
  }
};

//Get doctor treatments
export const getDoctorTreatments = async (req, res) => {
  try {
    const treatments = await getTreatmentsByDoctorId(req.params.id);

    res.status(200).json({
      success: true,
      data: treatments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor treatments",
      error: error.message,
    });
  }
};
