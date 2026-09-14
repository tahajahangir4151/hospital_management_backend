import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export const loginAdmin = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  // Find user by email
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      full_name: true,
      email: true,
      password_hash: true,
      role: true,
    },
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Compare password with bcrypt hash
  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Only admin can access admin panel
  if (user.role !== "admin") {
    const error = new Error("You are not authorized to access the admin panel");
    error.statusCode = 403;
    throw error;
  }

  // Generate JWT
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    },
    session: {
      access_token: accessToken,
    },
  };
};
