import express from "express";

import {
  addPatient,
  getAllPatients,
  getPatient,
  removePatient,
  updatePatient,
} from "../controllers/patient.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Ali Khan
 *         date_of_birth:
 *           type: string
 *           format: date
 *           example: "1995-05-20"
 *         gender:
 *           type: string
 *           example: Male
 *         address:
 *           type: string
 *           example: Lahore, Pakistan
 *         phone_number:
 *           type: string
 *           example: "03001234567"
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: Patients fetched successfully
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
 *                     $ref: '#/components/schemas/Patient'
 *       500:
 *         description: Failed to fetch patients
 */
router.get("/", getAllPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Patient fetched successfully
 *       404:
 *         description: Patient not found
 */
router.get("/:id", getPatient);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags:
 *       - Patients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date_of_birth
 *               - gender
 *               - address
 *               - phone_number
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ali Khan
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: "1995-05-20"
 *               gender:
 *                 type: string
 *                 example: Male
 *               address:
 *                 type: string
 *                 example: Lahore, Pakistan
 *               phone_number:
 *                 type: string
 *                 example: "03001234567"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create patient
 */
router.post("/", addPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update patient
 *     tags:
 *       - Patients
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
 *               name:
 *                 type: string
 *                 example: Ali Khan
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: "1995-05-20"
 *               gender:
 *                 type: string
 *                 example: Male
 *               address:
 *                 type: string
 *                 example: Islamabad, Pakistan
 *               phone_number:
 *                 type: string
 *                 example: "03001234567"
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 */
router.put("/:id", updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete patient
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */
router.delete("/:id", removePatient);

export default router;
