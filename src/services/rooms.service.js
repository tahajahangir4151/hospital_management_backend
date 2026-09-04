import supabase from "../config/supabase.js";

//Get All roooms
export const getRooms = async () => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

//Create room
export const createRoom = async (room) => {
  const { data, error } = await supabase
    .from("rooms")
    .insert([room])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Get room by ID
export const getRoomById = async (id) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// Update room
export const updateRoomById = async (id, room) => {
  const { data, error } = await supabase
    .from("rooms")
    .update(room)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Delete room
export const deleteRoomById = async (id) => {
  const { data, error } = await supabase
    .from("rooms")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};
