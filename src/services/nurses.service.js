import supabase from "../config/supabase.js";

//Get all nurses
export const getNurses = async () => {
  const { data, error } = await supabase
    .from("nurses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

//Create nurse
export const createNurse = async (nurse) => {
  const { data, error } = await supabase
    .from("nurses")
    .insert([nurse])
    .select("*")
    .single();
  if (error) throw error;

  return data;
};

//Get nurse by id
export const getNurseById = async (id) => {
  const { data, error } = await supabase
    .from("nurses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
};

//Update nurse
export const updateNurseById = async (id, nurse) => {
  const { data, error } = await supabase
    .from("nurses")
    .update(nurse)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) throw error;

  return data;
};

//Delete nurse
export const deleteNurseById = async (id) => {
  const { data, error } = await supabase
    .from("nurses")
    .delete()
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) throw error;

  return data;
};
