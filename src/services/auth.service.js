import supabase from "../config/supabase.js";
import supabaseAuth from "../config/supabaseAuth.js";

export const loginAdmin = async ({ email, password }) => {
  // Validate required fields
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  // Login through Supabase Auth
  const { data: authData, error: authError } =
    await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const user = authData.user;
  const session = authData.session;

  // Get application profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  if (!profile) {
    const error = new Error("User profile not found");
    error.statusCode = 404;
    throw error;
  }

  // For now only admins can access the application
  if (profile.role !== "admin") {
    const error = new Error("You are not authorized to access the admin panel");
    error.statusCode = 403;
    throw error;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: profile.full_name,
      role: profile.role,
    },

    session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
    },
  };
};
