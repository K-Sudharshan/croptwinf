/**
 * Authentication Controller
 * Handles authentication-related HTTP requests
 */

import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import AuthService from "../services/authService";
import { asyncHandler, createError } from "../middleware/errorHandler";

export class AuthController {
  static register = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const {
        email,
        password,
        firstName,
        lastName,
        role,
        farmSize,
        location,
        phoneNumber,
      } = req.body;

      // Validate required fields
      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !role ||
        !farmSize ||
        !location ||
        !phoneNumber
      ) {
        throw createError("All fields are required", 400);
      }

      const result = await AuthService.register({
        email,
        password,
        firstName,
        lastName,
        role,
        farmSize,
        location,
        phoneNumber,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    }
  );

  static login = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { email, password } = req.body;

      if (!email || !password) {
        throw createError("Email and password are required", 400);
      }

      const result = await AuthService.login({ email, password });

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );

  static getProfile = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const user = await AuthService.getUserById(req.userId);

      if (!user) {
        throw createError("User not found", 404);
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    }
  );

  static updateProfile = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const { firstName, lastName, location, phoneNumber, farmSize } = req.body;

      const updatedUser = await AuthService.updateUser(req.userId, {
        firstName,
        lastName,
        location,
        phoneNumber,
        farmSize,
      });

      if (!updatedUser) {
        throw createError("Failed to update user", 500);
      }

      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    }
  );

  static changePassword = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        throw createError("All password fields are required", 400);
      }

      if (newPassword !== confirmPassword) {
        throw createError("New passwords do not match", 400);
      }

      await AuthService.changePassword(req.userId, oldPassword, newPassword);

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    }
  );
}

export default AuthController;
