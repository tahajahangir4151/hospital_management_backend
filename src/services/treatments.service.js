import supabase from "../config/supabase.js";

//Get All treatments
export const getTreatments = async () => {
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

//Get Treatment by ID
export const getTreatmentById = async (id) => {
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

//Create Treatment
export const createTreatment = async (treatment) => {
  const { data, error } = await supabase
    .from("treatments")
    .insert([treatment])
    .select()
    .single();
  if (error) throw error;
  return data;
};

//Update treatment
export const updateTreatmentById = async (id, treatment) => {
  const { data, error } = await supabase
    .from("treatments")
    .update(treatment)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

//Delete treatment
export const deleteTreatmentById = async (id) => {
  const { data, error } = await supabase
    .from("treatments")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

//Get all treatments of patient
export const getTreatmentsByPatientId = async (patientId) => {
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .eq("patient_id", patientId)
    .order("treatment_date", { ascending: false });

  if (error) throw error;
  return data;
};

//Get all treamtnets performed by doctor
export const getTreatmentsByDoctorId = async (doctorId) => {
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .eq("doctor_id", doctorId)
    .order("treatment_date", { ascending: false });

  if (error) throw error;

  return data;
};
