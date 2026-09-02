import express from "express"
import { addDepartment, getAllDepartments } from "../controllers/department.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management APIs
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Departments fetched successfully
 */
router.get("/", getAllDepartments);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags:
 *       - Departments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - contact_number
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cardiology
 *               location:
 *                 type: string
 *                 example: First Floor
 *               contact_number:
 *                 type: string
 *                 example: "0421234567"
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", addDepartment);

export default router;
