import {
  createNurse,
  deleteNurseById,
  getNurseById,
  getNurses,
  updateNurseById,
} from "../services/nurses.service.js";

// Get all nurses
export const getAllNurses = async (req, res) => {
  try {
    const nurses = await getNurses();

    res.status(200).json({
      success: true,
      data: nurses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch nurses",
      error: error.message,
    });
  }
};

//create nurse
export const addNurse = async (req, res) => {
  try {
    const { name, shift_timing, contact_number, department_id } = req.body;
    if (!name || !shift_timing || !contact_number || !department_id) {
      return res.status(400).json({
        success: false,
        message:
          "Name, shift timing, contact number and department are required",
      });
    }
    const nurse = await createNurse({
      name,
      shift_timing,
      contact_number,
      department_id,
    });
    res.status(201).json({
      success: true,
      message: "Nurse created successfully",
      data: nurse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create nurse",
      error: error.message,
    });
  }
};

//Get Nurse
export const getNurse = async (req, res) => {
  try {
    const nurse = await getNurseById(req.params.id);
    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: "Nurse not found",
      });
    }
    res.status(200).json({
      success: true,
      data: nurse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch nurse",
      error: error.message,
    });
  }
};

//Update Nurse
export const updateNurse = async (req, res) => {
  try {
    const { name, shift_timing, contact_number, department_id } = req.body;

    const nurse = await updateNurseById(req.params.id, {
      name,
      shift_timing,
      contact_number,
      department_id,
    });

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: "Nurse not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse updated successfully",
      data: nurse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update nurse",
      error: error.message,
    });
  }
};

//Delete nurse
export const removeNurse = async (req, res) => {
  try {
    const nurse = await deleteNurseById(req.params.id);

    if (!nurse) {
      return res.status(404).json({
        success: false,
        message: "Nurse not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete nurse",
      error: error.message,
    });
  }
};
