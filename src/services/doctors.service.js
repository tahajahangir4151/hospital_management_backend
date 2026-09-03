import supabase from "../config/supabase.js";

//Get all doctors
export const getAllDoctors = async () => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

//Get single doctor
export const getDoctorById = async (id) => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

//Get doctor by department id
export const getDoctorByDepartmentId = async (departmentId) => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("department_id", departmentId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

//Create doctor
export const createDoctor = async (doctor) => {
  const { data, error } = await supabase
    .from("doctors")
    .insert([doctor])
    .select()
    .single();

  if (error) throw error;
  return data;
};

//Update doctor
export const updateDoctorById = async (id, doctor) => {
  const { data, error } = await supabase
    .from("doctors")
    .update(doctor)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

//Delete doctor
export const deleteDoctor = async (id) => {
  const { data, error } = await supabase
    .from("doctors")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
