import express from "express";

import { addNurseRoomAssignment, removeNurseFromRoom } from "../controllers/nurseRoomAssignment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Nurse Room Assignments
 *   description: Nurse and room assignment APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NurseRoomAssignment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nurse_id:
 *           type: string
 *           format: uuid
 *         room_id:
 *           type: string
 *           format: uuid
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/nurse-room-assignments:
 *   post:
 *     summary: Assign a nurse to a room
 *     tags:
 *       - Nurse Room Assignments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nurse_id
 *               - room_id
 *             properties:
 *               nurse_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *               room_id:
 *                 type: string
 *                 format: uuid
 *                 example: 6ffcfcfb-3069-4769-9fd5-31ef94b6bdc1
 *     responses:
 *       201:
 *         description: Nurse assigned to room successfully
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
 *                   example: Nurse assigned to room successfully
 *                 data:
 *                   $ref: '#/components/schemas/NurseRoomAssignment'
 *       400:
 *         description: Nurse and room are required
 *       404:
 *         description: Nurse or room not found
 *       409:
 *         description: Nurse already assigned to this room
 *       500:
 *         description: Failed to assign nurse to room
 */
router.post("/", addNurseRoomAssignment);

/**
 * @swagger
 * /api/nurse-room-assignments/nurse/{nurseId}/room/{roomId}:
 *   delete:
 *     summary: Remove a nurse from an assigned room
 *     tags:
 *       - Nurse Room Assignments
 *     parameters:
 *       - in: path
 *         name: nurseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Nurse ID
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Nurse removed from room successfully
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
 *                   example: Nurse removed from room successfully
 *       400:
 *         description: Nurse ID and Room ID are required
 *       404:
 *         description: Nurse is not assigned to this room
 *       500:
 *         description: Failed to remove nurse from room
 */
router.delete("/nurse/:nurseId/room/:roomId", removeNurseFromRoom);

export default router;
