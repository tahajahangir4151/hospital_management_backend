import express from "express";
import cors from "cors";

import swaggerSpec, { swaggerUiHtml } from "./config/swagger.js";
import healthRoutes from "./routes/health.route.js";
import departmentRoutes from "./routes/department.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import patientRoutes from "./routes/patient.route.js";
import treatmentRoutes from "./routes/treatment.route.js";
import roomRoutes from "./routes/room.route.js";
import admissionRoutes from "./routes/admission.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admissions", admissionRoutes);

// Swagger Documentation
app.get("/api/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/docs", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(swaggerUiHtml);
});

export default app;
