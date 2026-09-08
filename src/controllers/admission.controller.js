import {
  admitPatient,
  dischargePatient,
  getAdmissions,
  getAdmissionsByPatientId,
  getAdmissionsByRoomId,
  getRoomOccupants,
} from "../services/admissions.service.js";

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

//Dishcarge admission
export const dischargeAdmission = async (req, res) => {
  try {
    const admission = await dischargePatient(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient discharged successfully",
      data: admission,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get admission history
export const getPatientAdmissions = async (req, res) => {
  try {
    const admissions = await getAdmissionsByPatientId(req.params.id);

    res.status(200).json({
      success: true,
      data: admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patient admission history",
      error: error.message,
    });
  }
};

//Get room admission history
export const getRoomAdmissions = async (req, res) => {
  try {
    const admissions = await getAdmissionsByRoomId(req.params.id);

    res.status(200).json({
      success: true,
      data: admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch room admission history",
      error: error.message,
    });
  }
};

//Get current room occupants
export const getRoomCurrentOccupants = async (req, res) => {
  try {
    const occupants = await getRoomOccupants(req.params.id);

    res.status(200).json({
      success: true,
      data: occupants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch current room occupants",
      error: error.message,
    });
  }
};
