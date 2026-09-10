import supabase from "../config/supabase.js";

export const createNurseRoomAssignment = async ({ nurse_id, room_id }) => {
  if (!nurse_id || !room_id) {
    const error = new Error("Nurse and room are required");
    error.statusCode = 400;
    throw error;
  }

  // Check nurse exists
  const { data: nurse, error: nurseError } = await supabase
    .from("nurses")
    .select("*")
    .eq("id", nurse_id)
    .maybeSingle();

  if (nurseError) throw nurseError;

  if (!nurse) {
    const error = new Error("Nurse not found");
    error.statusCode = 404;
    throw error;
  }

  // Check room exists
  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", room_id)
    .maybeSingle();

  if (roomError) throw roomError;

  if (!room) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate assignment
  const { data: existingAssignment, error: existingAssignmentError } =
    await supabase
      .from("nurse_room_assignments")
      .select("*")
      .eq("nurse_id", nurse_id)
      .eq("room_id", room_id)
      .maybeSingle();

  if (existingAssignmentError) {
    throw existingAssignmentError;
  }

  if (existingAssignment) {
    const error = new Error("Nurse is already assigned to this room");
    error.statusCode = 409;
    throw error;
  }

  // Create assignment
  const { data: assignment, error: assignmentError } = await supabase
    .from("nurse_room_assignments")
    .insert([
      {
        nurse_id,
        room_id,
      },
    ])
    .select("*")
    .single();

  if (assignmentError) {
    throw assignmentError;
  }

  return assignment;
};

export const getRoomsByNurseId = async (nurseId) => {
  // Check nurse exists
  const { data: nurse, error: nurseError } = await supabase
    .from("nurses")
    .select("id")
    .eq("id", nurseId)
    .maybeSingle();

  if (nurseError) {
    throw nurseError;
  }

  if (!nurse) {
    const error = new Error("Nurse not found");
    error.statusCode = 404;
    throw error;
  }

  // Get all rooms assigned to this nurse
  const { data: assignments, error: assignmentError } = await supabase
    .from("nurse_room_assignments")
    .select(
      `
        rooms (*)
      `,
    )
    .eq("nurse_id", nurseId)
    .order("created_at", { ascending: false });

  if (assignmentError) {
    throw assignmentError;
  }

  return assignments.map((assignment) => assignment.rooms);
};

//Remove nurse from room
export const removeNurseRoomAssigment = async (nurseId, roomId) => {
  if (!nurseId || !roomId) {
    const error = new Error("Nurse ID and Room ID are required");
    error.statusCode = 400;
    throw error;
  }

  // check if assignment exist
  const { data: assignment, error: assignmentError } = await supabase
    .from("nurse_room_assignments")
    .select("id")
    .eq("nurse_id", nurseId)
    .eq("room_id", roomId)
    .maybeSingle();

  if (assignmentError) return assignmentError;

  if (!assignment) {
    const error = new Error("Nurse is not assigned to this room");
    error.statusCode = 404;
    throw error;
  }
  
  // Remove relationship
  const { error: deleteError } = await supabase
    .from("nurse_room_assignments")
    .delete()
    .eq("id", assignment.id);

  if (deleteError) {
    throw deleteError;
  }

  return assignment;
};
