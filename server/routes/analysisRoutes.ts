/**
 * Analysis Routes
 * Defines all crop analysis endpoints
 */

import { Router } from "express";
import AnalysisController from "../controllers/analysisController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// All analysis routes require authentication
router.use(authenticateToken);

/**
 * POST /api/analyses
 * Perform crop analysis
 */
router.post("/", AnalysisController.performAnalysis);

/**
 * GET /api/analyses/user/all
 * Get all analyses for authenticated user
 */
router.get("/user/all", AnalysisController.getUserAnalyses);

/**
 * GET /api/analyses/crop/:cropId
 * Get all analyses for a specific crop
 */
router.get("/crop/:cropId", AnalysisController.getCropAnalyses);

/**
 * GET /api/analyses/:id
 * Get a specific analysis by ID
 */
router.get("/:id", AnalysisController.getAnalysis);

/**
 * DELETE /api/analyses/:id
 * Delete an analysis
 */
router.delete("/:id", AnalysisController.deleteAnalysis);

export default router;
