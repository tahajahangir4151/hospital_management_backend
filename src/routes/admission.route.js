import express from "express";

import { addAdmission, getAllAdmissions } from "../controllers/admission.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admissions
 *   description: Patient room admission management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         patient_id:
 *           type: string
 *           format: uuid
 *         room_id:
 *           type: string
 *           format: uuid
 *         admission_date:
 *           type: string
 *           format: date-time
 *         discharge_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/admissions:
 *   get:
 *     summary: Get all admissions
 *     tags:
 *       - Admissions
 *     responses:
 *       200:
 *         description: Admissions fetched successfully
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
 *                     $ref: '#/components/schemas/Admission'
 *       500:
 *         description: Failed to fetch admissions
 */
router.get("/", getAllAdmissions);

/**
 * @swagger
 * /api/admissions:
 *   post:
 *     summary: Admit a patient to a room
 *     tags:
 *       - Admissions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - room_id
 *             properties:
 *               patient_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *               room_id:
 *                 type: string
 *                 format: uuid
 *                 example: 6ffcfcfb-3069-4769-9fd5-31ef94b6bdc1
 *               admission_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-04T10:00:00Z"
 *     responses:
 *       201:
 *         description: Patient admitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Patient admitted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Admission'
 *       400:
 *         description: Patient and room are required
 *       404:
 *         description: Patient or room not found
 *       409:
 *         description: Patient already admitted or room occupied
 *       500:
 *         description: Failed to admit patient
 */
router.post("/", addAdmission);

export default router;
