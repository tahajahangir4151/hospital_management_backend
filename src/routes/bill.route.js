import express from "express";
import { authenticateAdmin } from "../middlewares/auth.middleware.js";
import { addBill, getBill, getBills, removeBill, updateBill } from "../controllers/bill.controller.js";


const router = express.Router();

router.use(authenticateAdmin);

/**
 * @swagger
 * tags:
 *   name: Bills
 *   description: Patient billing management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Bill:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         bill_number:
 *           type: string
 *           example: BILL-1725972000000
 *         patient_id:
 *           type: string
 *           format: uuid
 *         total_amount:
 *           type: number
 *           example: 25000
 *         payment_status:
 *           type: string
 *           enum:
 *             - pending
 *             - paid
 *             - unpaid
 *         date_issued:
 *           type: string
 *           format: date
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/bills:
 *   get:
 *     summary: Get all bills
 *     tags:
 *       - Bills
 *     responses:
 *       200:
 *         description: Bills fetched successfully
 */
router.get("/", getBills);

/**
 * @swagger
 * /api/bills/{id}:
 *   get:
 *     summary: Get bill by ID
 *     tags:
 *       - Bills
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bill fetched successfully
 *       404:
 *         description: Bill not found
 */
router.get("/:id", getBill);

/**
 * @swagger
 * /api/bills:
 *   post:
 *     summary: Create a new patient bill
 *     tags:
 *       - Bills
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - total_amount
 *               - payment_status
 *             properties:
 *               patient_id:
 *                 type: string
 *                 format: uuid
 *               total_amount:
 *                 type: number
 *                 example: 25000
 *               payment_status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - paid
 *                   - unpaid
 *                 example: pending
 *               date_issued:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-10"
 *     responses:
 *       201:
 *         description: Bill created successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Patient not found
 */
router.post("/", addBill);

/**
 * @swagger
 * /api/bills/{id}:
 *   put:
 *     summary: Update a bill
 *     tags:
 *       - Bills
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
 *               total_amount:
 *                 type: number
 *                 example: 30000
 *               payment_status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - paid
 *                   - unpaid
 *               date_issued:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Bill updated successfully
 *       404:
 *         description: Bill not found
 */
router.put("/:id", updateBill);

/**
 * @swagger
 * /api/bills/{id}:
 *   delete:
 *     summary: Delete a bill
 *     tags:
 *       - Bills
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 *       404:
 *         description: Bill not found
 */
router.delete("/:id", removeBill);

export default router;
