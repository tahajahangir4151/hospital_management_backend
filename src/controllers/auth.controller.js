import { loginAdmin } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const result = await loginAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
