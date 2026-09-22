import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

const createAdmin = async () => {
  try {
    const fullName = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!fullName || !email || !password) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required",
      );
    }

    // Check whether user already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingUser) {
      console.log("Admin user already exists");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.users.create({
      data: {
        full_name: fullName,
        email,
        password_hash: passwordHash,
        role: "admin",
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        role: true,
      },
    });

    console.log("Admin created successfully:");
    console.log(admin);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();