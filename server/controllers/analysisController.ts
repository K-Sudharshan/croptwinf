/**
 * Analysis Controller
 * Handles crop analysis HTTP requests
 */

import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import AnalysisService from "../services/analysisService";
import { asyncHandler, createError } from "../middleware/errorHandler";

export class AnalysisController {
  static performAnalysis = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const { cropId, imageUrl } = req.body;

      if (!cropId || !imageUrl) {
        throw createError("Crop ID and image URL are required", 400);
      }

      const analysis = await AnalysisService.performAnalysis({
        cropId,
        userId: req.userId,
        imageUrl,
      });

      res.status(201).json({
        success: true,
        data: analysis,
      });
    }
  );

  static getAnalysis = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.params;

      const analysis = await AnalysisService.getAnalysisById(id);

      if (!analysis) {
        throw createError("Analysis not found", 404);
      }

      res.status(200).json({
        success: true,
        data: analysis,
      });
    }
  );

  static getCropAnalyses = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { cropId } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const analyses = await AnalysisService.getAnalysisByCropId(
        cropId,
        limit,
        offset
      );

      res.status(200).json({
        success: true,
        data: analyses,
        pagination: { limit, offset },
      });
    }
  );

  static getUserAnalyses = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.userId) {
        throw createError("User not authenticated", 401);
      }

      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const analyses = await AnalysisService.getAnalysisByUserId(
        req.userId,
        limit,
        offset
      );

      res.status(200).json({
        success: true,
        data: analyses,
        pagination: { limit, offset },
      });
    }
  );

  static deleteAnalysis = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      const { id } = req.params;

      await AnalysisService.deleteAnalysis(id);

      res.status(200).json({
        success: true,
        message: "Analysis deleted successfully",
      });
    }
  );
}

export default AnalysisController;
