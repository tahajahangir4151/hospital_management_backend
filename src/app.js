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
import nurseRoutes from "./routes/nurse.route.js";
import nurseRoomAssignmentRoutes from "./routes/nurseRoomAssignment.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/nurses", nurseRoutes);
app.use("/api/nurse-room-assignments", nurseRoomAssignmentRoutes);
app.use("/api/auth", authRoutes);

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
