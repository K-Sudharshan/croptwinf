/**
 * Crop Routes
 * Defines all crop management endpoints
 */

import { Router } from "express";
import CropController from "../controllers/cropController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// All crop routes require authentication
router.use(authenticateToken);

/**
 * POST /api/crops
 * Create a new crop
 */
router.post("/", CropController.createCrop);

/**
 * GET /api/crops
 * Get all crops for authenticated user
 */
router.get("/", CropController.getUserCrops);

/**
 * GET /api/crops/:id
 * Get a specific crop by ID
 */
router.get("/:id", CropController.getCrop);

/**
 * PUT /api/crops/:id
 * Update a crop
 */
router.put("/:id", CropController.updateCrop);

/**
 * DELETE /api/crops/:id
 * Delete a crop
 */
router.delete("/:id", CropController.deleteCrop);

/**
 * GET /api/crops/:id/health
 * Get crop health status
 */
router.get("/:id/health", CropController.getCropHealth);

export default router;
