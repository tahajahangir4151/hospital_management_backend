import supabase from "../config/supabase.js";

//Get all patients
export const getPatients = async () => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Get patient by ID
export const getPatientById = async (id) => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;

  return data;
};

//Create Patients
export const createPatient = async (patient) => {
  const { data, error } = await supabase
    .from("patients")
    .insert([patient])
    .select()
    .single();

  if (error) return error;
  return data;
};

// Update patient
export const updatePatientById = async (id, patient) => {
  const { data, error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  return data;
};

// Delete patient
export const deletePatientById = async (id) => {
  const { data, error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  return data;
};
