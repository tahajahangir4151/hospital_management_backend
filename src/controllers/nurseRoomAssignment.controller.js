import { createNurseRoomAssignment, getRoomsByNurseId } from "../services/nurseRoomAssignments.service.js";

export const addNurseRoomAssignment = async (req, res) => {
  try {
    const assignment = await createNurseRoomAssignment(req.body);

    res.status(201).json({
      success: true,
      message: "Nurse assigned to room successfully",
      data: assignment,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNurseRooms = async (req, res) => {
  try {
    const rooms = await getRoomsByNurseId(req.params.id);

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
