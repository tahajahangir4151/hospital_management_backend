import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorByDepartmentId,
  getDoctorById,
  updateDoctorById,
} from "../services/doctors.service.js";

//Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

//Get single doctor
export const getDoctor = async (req, res) => {
  try {
    const doctor = await getDoctorById(req.params.id);
    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
      error: error.message,
    });
  }
};

//Get dcotor by departmentId
export const getDepartmentDoctors = async (req, res) => {
  try {
    const doctors = await getDoctorByDepartmentId(req.params.id);
    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch department doctors",
      error: error.message,
    });
  }
};

//Create doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      full_name,
      specialization,
      years_of_experience,
      contact_number,
      department_id,
    } = req.body;

    if (
      !full_name ||
      !specialization ||
      years_of_experience === undefined ||
      !contact_number ||
      !department_id
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const doctor = await createDoctor({
      full_name,
      specialization,
      years_of_experience,
      contact_number,
      department_id,
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

//Updarte doctor
export const updateDoctor = async (req, res) => {
  try {
    const {
      full_name,
      specialization,
      years_of_experience,
      contact_number,
      department_id,
    } = req.body;
    const doctor = await updateDoctorById(req.params.id, {
      full_name,
      specialization,
      years_of_experience,
      contact_number,
      department_id,
    });

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
      error: error.message,
    });
  }
};

//Remove doctor
export const removeDoctor = async (req, res) => {
  try {
    await deleteDoctor(req.params.id);
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
      error: error.message,
    });
  }
};
