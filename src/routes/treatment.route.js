import express from "express";
import {
  addTreatment,
  getAllTreatments,
  getTreatment,
  removeTreatment,
  updateTreatment,
} from "../controllers/treatment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Treatments
 *   description: Treatment management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Treatment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         doctor_id:
 *           type: string
 *           format: uuid
 *         patient_id:
 *           type: string
 *           format: uuid
 *         treatment_date:
 *           type: string
 *           format: date
 *           example: "2026-09-04"
 *         diagnosis:
 *           type: string
 *           example: High fever
 *         medication:
 *           type: string
 *           example: Paracetamol
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/treatments:
 *   get:
 *     summary: Get all treatments
 *     tags:
 *       - Treatments
 *     responses:
 *       200:
 *         description: Treatments fetched successfully
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
 *                     $ref: '#/components/schemas/Treatment'
 *       500:
 *         description: Failed to fetch treatments
 */
router.get("/", getAllTreatments);

/**
 * @swagger
 * /api/treatments/{id}:
 *   get:
 *     summary: Get treatment by ID
 *     tags:
 *       - Treatments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Treatment ID
 *     responses:
 *       200:
 *         description: Treatment fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Treatment'
 *       404:
 *         description: Treatment not found
 *       500:
 *         description: Failed to fetch treatment
 */
router.get("/:id", getTreatment);

/**
 * @swagger
 * /api/treatments:
 *   post:
 *     summary: Create a new treatment
 *     tags:
 *       - Treatments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_id
 *               - patient_id
 *               - treatment_date
 *               - diagnosis
 *             properties:
 *               doctor_id:
 *                 type: string
 *                 format: uuid
 *               patient_id:
 *                 type: string
 *                 format: uuid
 *               treatment_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-04"
 *               diagnosis:
 *                 type: string
 *                 example: High fever
 *               medication:
 *                 type: string
 *                 example: Paracetamol
 *     responses:
 *       201:
 *         description: Treatment created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create treatment
 */
router.post("/", addTreatment);

/**
 * @swagger
 * /api/treatments/{id}:
 *   put:
 *     summary: Update treatment
 *     tags:
 *       - Treatments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Treatment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *               patient_id:
 *                 type: string
 *                 format: uuid
 *                 example: 6ffcfcfb-3069-4769-9fd5-31ef94b6bdc1
 *               treatment_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-04"
 *               diagnosis:
 *                 type: string
 *                 example: High fever
 *               medication:
 *                 type: string
 *                 example: Paracetamol
 *     responses:
 *       200:
 *         description: Treatment updated successfully
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
 *                   example: Treatment updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Treatment'
 *       404:
 *         description: Treatment not found
 *       500:
 *         description: Failed to update treatment
 */
router.put("/:id", updateTreatment);

/**
 * @swagger
 * /api/treatments/{id}:
 *   delete:
 *     summary: Delete treatment
 *     tags:
 *       - Treatments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Treatment ID
 *     responses:
 *       200:
 *         description: Treatment deleted successfully
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
 *                   example: Treatment deleted successfully
 *       404:
 *         description: Treatment not found
 *       500:
 *         description: Failed to delete treatment
 */
router.delete("/:id", removeTreatment);

export default router;
