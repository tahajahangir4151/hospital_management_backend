import supabase from "../config/supabase.js";

//Get All Departments
export const getDepartments = async () => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

//Get Single Department via id
export const getDepartmentById = async (id) => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

//Create Deparmtent
export const createDepartment = async (department) => {
  const { data, error } = await supabase
    .from("departments")
    .insert([department])
    .select()
    .single();

  if (error) throw error;

  return data;
};

//Updae department
export const updateDepartment = async (id, department) => {
  const { data, error } = await supabase
    .from("departments")
    .update(department)
    .eq("id", id)
    .select()
    .single();
  if (error) return error;
  return data;
};

//Delete any department
export const deleteDepartment = async (id) => {
  const { data, error } = await supabase
    .from("departments")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) return error;
  return data;
};
