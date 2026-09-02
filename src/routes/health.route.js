import express from "express";
import supabase from "../config/supabase.js";
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check API health
 *     tags:
 *       - Health
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
 *     responses:
 *       200:
 *         description: Database connection successful
 *       500:
 *         description: Database connection failed
 */

router.get("/database", async (req, res) => {
  try {
    const { error } = await supabase.from("departments").select("id").limit(1);

    if (error) {
      throw error;
    }

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
