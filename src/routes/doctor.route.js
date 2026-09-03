import express from "express";
import {
  addDoctor,
  getDoctor,
  getDoctors,
  removeDoctor,
  updateDoctor,
} from "../controllers/doctor.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         full_name:
 *           type: string
 *           example: Dr. Ahmed Khan
 *         specialization:
 *           type: string
 *           example: Cardiologist
 *         years_of_experience:
 *           type: integer
 *           example: 8
 *         contact_number:
 *           type: string
 *           example: "03001234567"
 *         department_id:
 *           type: string
 *           format: uuid
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags:
 *       - Doctors
 *     responses:
 *       200:
 *         description: Doctors fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Failed to fetch doctors
 */
router.get("/", getDoctors);

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags:
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 */
router.get("/:id", getDoctor);

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags:
 *       - Doctors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - specialization
 *               - years_of_experience
 *               - contact_number
 *               - department_id
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Dr. Ahmed Khan
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               years_of_experience:
 *                 type: integer
 *                 example: 8
 *               contact_number:
 *                 type: string
 *                 example: "03001234567"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create doctor
 */
router.post("/", addDoctor);

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update doctor
 *     tags:
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Dr. Ahmed Khan
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               years_of_experience:
 *                 type: integer
 *                 example: 10
 *               contact_number:
 *                 type: string
 *                 example: "03001234567"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 */
router.put("/:id", updateDoctor);

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete doctor
 *     tags:
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 */
router.delete("/:id", removeDoctor);

export default router;
