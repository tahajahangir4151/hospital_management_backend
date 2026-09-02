import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";


import swaggerSpec from "./config/swagger.js";
import healthRoutes from "./routes/health.route.js";
import departmentRoutes from "./routes/department.route.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/departments", departmentRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app