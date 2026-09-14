import prisma from "./src/config/prisma.js";

try {
  const departments = await prisma.departments.findMany();

  console.log("Departments:");
  console.log(departments);
} catch (error) {
  console.error("Prisma error:", error);
} finally {
  await prisma.$disconnect();
}
