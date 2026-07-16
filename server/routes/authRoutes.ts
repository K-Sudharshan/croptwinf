/**
 * Authentication Routes
 * Defines all authentication-related endpoints
 */

import { Router } from "express";
import AuthController from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", AuthController.register);

/**
 * POST /api/auth/login
 * Login user and get JWT token
 */
router.post("/login", AuthController.login);

/**
 * GET /api/auth/profile
 * Get authenticated user's profile
 */
router.get("/profile", authenticateToken, AuthController.getProfile);

/**
 * PUT /api/auth/profile
 * Update authenticated user's profile
 */
router.put("/profile", authenticateToken, AuthController.updateProfile);

/**
 * POST /api/auth/change-password
 * Change user's password
 */
router.post("/change-password", authenticateToken, AuthController.changePassword);

export default router;
