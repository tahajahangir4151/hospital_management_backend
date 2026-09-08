import express from "express";
import {
  addNurse,
  getAllNurses,
  getNurse,
  removeNurse,
  updateNurse,
} from "../controllers/nurse.controller.js";
import { getNurseRooms } from "../controllers/nurseRoomAssignment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Nurses
 *   description: Nurse management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Nurse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Ayesha Khan
 *         shift_timing:
 *           type: string
 *           example: Morning
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
 * /api/nurses:
 *   get:
 *     summary: Get all nurses
 *     tags:
 *       - Nurses
 *     responses:
 *       200:
 *         description: Nurses fetched successfully
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
 *                     $ref: '#/components/schemas/Nurse'
 *       500:
 *         description: Failed to fetch nurses
 */
router.get("/", getAllNurses);

/**
 * @swagger
 * /api/nurses:
 *   post:
 *     summary: Create a new nurse
 *     tags:
 *       - Nurses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - shift_timing
 *               - contact_number
 *               - department_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ayesha Khan
 *               shift_timing:
 *                 type: string
 *                 example: Morning
 *               contact_number:
 *                 type: string
 *                 example: "03001234567"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 example: 6ffcfcfb-3069-4769-9fd5-31ef94b6bdc1
 *     responses:
 *       201:
 *         description: Nurse created successfully
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
 *                   example: Nurse created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Nurse'
 *       400:
 *         description: Required fields are missing
 *       500:
 *         description: Failed to create nurse
 */
router.post("/", addNurse);

/**
 * @swagger
 * /api/nurses/{id}:
 *   get:
 *     summary: Get nurse by ID
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Nurse ID
 *     responses:
 *       200:
 *         description: Nurse fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Nurse'
 *       404:
 *         description: Nurse not found
 *       500:
 *         description: Failed to fetch nurse
 */
router.get("/:id", getNurse);

/**
 * @swagger
 * /api/nurses/{id}:
 *   put:
 *     summary: Update nurse
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Nurse ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ayesha Khan
 *               shift_timing:
 *                 type: string
 *                 example: Evening
 *               contact_number:
 *                 type: string
 *                 example: "03001234567"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 example: 6ffcfcfb-3069-4769-9fd5-31ef94b6bdc1
 *     responses:
 *       200:
 *         description: Nurse updated successfully
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
 *                   example: Nurse updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Nurse'
 *       404:
 *         description: Nurse not found
 *       500:
 *         description: Failed to update nurse
 */
router.put("/:id", updateNurse);

/**
 * @swagger
 * /api/nurses/{id}:
 *   delete:
 *     summary: Delete nurse
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Nurse ID
 *     responses:
 *       200:
 *         description: Nurse deleted successfully
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
 *                   example: Nurse deleted successfully
 *       404:
 *         description: Nurse not found
 *       500:
 *         description: Failed to delete nurse
 */
router.delete("/:id", removeNurse);

/**
 * @swagger
 * /api/nurses/{id}/rooms:
 *   get:
 *     summary: Get all rooms assigned to a nurse
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Nurse ID
 *     responses:
 *       200:
 *         description: Nurse rooms fetched successfully
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
 *                     $ref: '#/components/schemas/Room'
 *       404:
 *         description: Nurse not found
 *       500:
 *         description: Failed to fetch nurse rooms
 */
router.get("/:id/rooms", getNurseRooms);

export default router;
