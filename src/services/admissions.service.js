import supabase from "../config/supabase.js";

//Get All admissions
export const getAdmissions = async () => {
  const { data, error } = await supabase
    .from("room_assignments")
    .select("*")
    .order("admission_date", { ascending: "false" });
  if (error) throw error;
  return data;
};

//Admit Patient
export const admitPatient = async ({ patient_id, room_id, admission_date }) => {
  if (!patient_id || !room_id) {
    const error = new Error("Patient and room are required");
    error.statusCode = 400;
    throw error;
  }

  //Patient existnece check
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("id")
    .eq("id", patient_id)
    .maybeSingle();

  if (patientError) throw patientError;

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  //Room existence check
  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("id", "room_number", "type")
    .eq("id", room_id)
    .maybeSingle();

  if (roomError) throw roomError;
  if (!room) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  //check patient donot have an already active admission
  const { data: activePatientAdmission, error: activePatientError } =
    await supabase
      .from("room_assignments")
      .select("id", "room_id")
      .eq("patient_id", patient_id)
      .is("discharge_date", null)
      .maybeSingle();

  if (activePatientError) throw activePatientError;

  if (activePatientAdmission) {
    const error = new Error("Patient already has an active room assignment");
    error.statusCode = 409;
    throw error;
  }

  // Get active admissions for selected room
  const { data: activeRoomAdmissions, error: activeRoomError } = await supabase
    .from("room_assignments")
    .select("id")
    .eq("room_id", room_id)
    .is("discharge_date", null);

  if (activeRoomError) throw activeRoomError;

  // General rooms can contain multiple patients.
  // Private / ICU / other room types can only have one active patient.
  if (
    room.type?.toLowerCase() !== "general" &&
    activeRoomAdmissions.length > 0
  ) {
    const error = new Error("Room is currently occupied");
    error.statusCode = 409;
    throw error;
  }

  // Prepare admission data
  const admissionData = {
    patient_id,
    room_id,
  };

  if (admission_date) {
    admissionData.admission_date = admission_date;
  }

  // Create room assignment
  const { data: admission, error: admissionError } = await supabase
    .from("room_assignments")
    .insert([admissionData])
    .select()
    .single();

  if (admissionError) {
    throw admissionError;
  }

  return admission;
};
