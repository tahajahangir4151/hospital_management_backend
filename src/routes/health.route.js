import express from "express";
import pool from "../config/database.js";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health
 *     tags:
 *       - Health
 *     security: []
 *     responses:
 *       200:
 *         description: API is running successfully
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
 *                   example: Hospital Management API is running
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management System API is running",
  });
});

/**
 * @swagger
 * /api/health/database:
 *   get:
 *     summary: Check database connection
 *     tags:
 *       - Health
 *     security: []
 *     responses:
 *       200:
 *         description: Database connection successful
 *       500:
 *         description: Database connection failed
 */
router.get("/database", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "Database connected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

export default router;
