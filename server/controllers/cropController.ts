/**
 * Crop Controller
 * Handles crop management HTTP requests
 */

import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import CropService from "../services/cropService";
import { asyncHandler, createError } from "../middleware/errorHandler";

export class CropController {
  static createCrop = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const {
        cropName,
        cropType,
        plantedDate,
        expectedHarvestDate,
        areaInAcres,
        location,
        soilType,
        irrigationType,
        notes,
      } = req.body;

      if (
        !cropName ||
        !cropType ||
        !plantedDate ||
        !expectedHarvestDate ||
        !areaInAcres ||
        !location ||
        !soilType ||
        !irrigationType
      ) {
        throw createError("All required fields must be provided", 400);
      }

      const crop = await CropService.createCrop({
        userId: req.userId,
        cropName,
        cropType,
        plantedDate: new Date(plantedDate),
        expectedHarvestDate: new Date(expectedHarvestDate),
        areaInAcres,
        location,
        soilType,
        irrigationType,
        notes,
      });

      res.status(201).json({
        success: true,
        data: crop,
      });
    }
  );

  static getCrop = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.params;

      const crop = await CropService.getCropById(id);

      if (!crop) {
        throw createError("Crop not found", 404);
      }

      res.status(200).json({
        success: true,
        data: crop,
      });
    }
  );

  static getUserCrops = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const crops = await CropService.getCropsByUserId(
        req.userId,
        limit,
        offset
      );

      res.status(200).json({
        success: true,
        data: crops,
        pagination: { limit, offset },
      });
    }
  );

  static updateCrop = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCrop = await CropService.updateCrop(id, updateData);

      if (!updatedCrop) {
        throw createError("Failed to update crop", 500);
      }

      res.status(200).json({
        success: true,
        data: updatedCrop,
      });
    }
  );

  static deleteCrop = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.params;

      await CropService.deleteCrop(id);

      res.status(200).json({
        success: true,
        message: "Crop deleted successfully",
      });
    }
  );

  static getCropHealth = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.params;

      const healthStatus = await CropService.getCropHealthStatus(id);

      res.status(200).json({
        success: true,
        data: healthStatus,
      });
    }
  );
}

export default CropController;
