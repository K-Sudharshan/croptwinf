/**
 * Crop Service
 * Handles crop management business logic
 */

import { CropModel, CreateCropInput, Crop } from "../models/Crop";
import { createError } from "../middleware/errorHandler";

export class CropService {
  static async createCrop(cropData: CreateCropInput): Promise<Crop> {
    // Validate crop data
    if (cropData.areaInAcres <= 0) {
      throw createError("Area in acres must be greater than 0", 400);
    }

    if (cropData.plantedDate > cropData.expectedHarvestDate) {
      throw createError(
        "Planted date must be before expected harvest date",
        400
      );
    }

    const crop = await CropModel.create(cropData);
    return crop;
  }

  static async getCropById(id: string): Promise<Crop | null> {
    const crop = await CropModel.findById(id);
    return crop;
  }

  static async getCropsByUserId(
    userId: string,
    limit = 10,
    offset = 0
  ): Promise<Crop[]> {
    const crops = await CropModel.findByUserId(userId, limit, offset);
    return crops;
  }

  static async updateCrop(
    id: string,
    cropData: Partial<Crop>
  ): Promise<Crop | null> {
    const existingCrop = await CropModel.findById(id);
    if (!existingCrop) {
      throw createError("Crop not found", 404);
    }

    // Validate dates if provided
    if (
      cropData.plantedDate &&
      cropData.expectedHarvestDate &&
      cropData.plantedDate > cropData.expectedHarvestDate
    ) {
      throw createError(
        "Planted date must be before expected harvest date",
        400
      );
    }

    const updatedCrop = await CropModel.update(id, cropData);
    return updatedCrop;
  }

  static async deleteCrop(id: string): Promise<void> {
    const crop = await CropModel.findById(id);
    if (!crop) {
      throw createError("Crop not found", 404);
    }

    await CropModel.delete(id);
  }

  static async getCropHealthStatus(cropId: string): Promise<{
    cropId: string;
    status: string;
    healthScore: number;
    lastAnalysis: Date | null;
  }> {
    const crop = await CropModel.findById(cropId);
    if (!crop) {
      throw createError("Crop not found", 404);
    }

    return {
      cropId: crop.id,
      status: crop.status,
      healthScore: 85, // This would be calculated from analyses
      lastAnalysis: crop.updatedAt,
    };
  }
}

export default CropService;
