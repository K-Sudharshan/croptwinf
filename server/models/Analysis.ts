/**
 * Analysis Model
 * Defines the Crop Analysis data structure and database operations
 */

import { getDatabase } from "../config/database";

export interface Analysis {
  id: string;
  cropId: string;
  userId: string;
  imageUrl: string;
  diseaseDetected: string;
  confidence: number;
  cropHealthScore: number;
  recommendedTreatment: string;
  waterRecommendation: string;
  fertilizerRecommendation: string;
  weatherSummary: string;
  analysisDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnalysisInput {
  cropId: string;
  userId: string;
  imageUrl: string;
  diseaseDetected: string;
  confidence: number;
  cropHealthScore: number;
  recommendedTreatment: string;
  waterRecommendation: string;
  fertilizerRecommendation: string;
  weatherSummary: string;
}

export class AnalysisModel {
  static async create(analysisData: CreateAnalysisInput): Promise<Analysis> {
    const db = getDatabase();
    const query = `
      INSERT INTO analyses (crop_id, user_id, image_url, disease_detected, confidence, crop_health_score, recommended_treatment, water_recommendation, fertilizer_recommendation, weather_summary, analysis_date, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), NOW())
      RETURNING id, crop_id as "cropId", user_id as "userId", image_url as "imageUrl", disease_detected as "diseaseDetected", confidence, crop_health_score as "cropHealthScore", recommended_treatment as "recommendedTreatment", water_recommendation as "waterRecommendation", fertilizer_recommendation as "fertilizerRecommendation", weather_summary as "weatherSummary", analysis_date as "analysisDate", created_at as "createdAt", updated_at as "updatedAt"
    `;
    const values = [
      analysisData.cropId,
      analysisData.userId,
      analysisData.imageUrl,
      analysisData.diseaseDetected,
      analysisData.confidence,
      analysisData.cropHealthScore,
      analysisData.recommendedTreatment,
      analysisData.waterRecommendation,
      analysisData.fertilizerRecommendation,
      analysisData.weatherSummary,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id: string): Promise<Analysis | null> {
    const db = getDatabase();
    const query = `
      SELECT id, crop_id as "cropId", user_id as "userId", image_url as "imageUrl", disease_detected as "diseaseDetected", confidence, crop_health_score as "cropHealthScore", recommended_treatment as "recommendedTreatment", water_recommendation as "waterRecommendation", fertilizer_recommendation as "fertilizerRecommendation", weather_summary as "weatherSummary", analysis_date as "analysisDate", created_at as "createdAt", updated_at as "updatedAt"
      FROM analyses WHERE id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByCropId(cropId: string, limit = 10, offset = 0): Promise<Analysis[]> {
    const db = getDatabase();
    const query = `
      SELECT id, crop_id as "cropId", user_id as "userId", image_url as "imageUrl", disease_detected as "diseaseDetected", confidence, crop_health_score as "cropHealthScore", recommended_treatment as "recommendedTreatment", water_recommendation as "waterRecommendation", fertilizer_recommendation as "fertilizerRecommendation", weather_summary as "weatherSummary", analysis_date as "analysisDate", created_at as "createdAt", updated_at as "updatedAt"
      FROM analyses WHERE crop_id = $1 ORDER BY analysis_date DESC LIMIT $2 OFFSET $3
    `;

    const result = await db.query(query, [cropId, limit, offset]);
    return result.rows;
  }

  static async findByUserId(userId: string, limit = 10, offset = 0): Promise<Analysis[]> {
    const db = getDatabase();
    const query = `
      SELECT id, crop_id as "cropId", user_id as "userId", image_url as "imageUrl", disease_detected as "diseaseDetected", confidence, crop_health_score as "cropHealthScore", recommended_treatment as "recommendedTreatment", water_recommendation as "waterRecommendation", fertilizer_recommendation as "fertilizerRecommendation", weather_summary as "weatherSummary", analysis_date as "analysisDate", created_at as "createdAt", updated_at as "updatedAt"
      FROM analyses WHERE user_id = $1 ORDER BY analysis_date DESC LIMIT $2 OFFSET $3
    `;

    const result = await db.query(query, [userId, limit, offset]);
    return result.rows;
  }

  static async delete(id: string): Promise<boolean> {
    const db = getDatabase();
    const query = "DELETE FROM analyses WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export default AnalysisModel;
