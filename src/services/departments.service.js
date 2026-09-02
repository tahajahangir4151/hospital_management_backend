import supabase from "../config/supabase.js";

export const getDepartments = async () => {
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const createDepartment = async (department) => {
  const { data, error } = await supabase
    .from("departments")
    .insert([department])
    .select()
    .single();

  if (error) throw error;

  return data;
};
