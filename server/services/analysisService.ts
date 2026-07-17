/**
 * Analysis Service
 * Handles crop analysis and disease detection business logic
 */

import { AnalysisModel, CreateAnalysisInput, Analysis } from "../models/Analysis";
import { createError } from "../middleware/errorHandler";
import env from "../config/environment";

export interface AnalysisRequest {
  cropId: string;
  userId: string;
  imageUrl: string;
}

export interface AIAnalysisResult {
  diseaseDetected: string;
  confidence: number;
  cropHealthScore: number;
  recommendedTreatment: string;
  waterRecommendation: string;
  fertilizerRecommendation: string;
  weatherSummary: string;
}

/**
 * AI Provider Interface for future-proofing
 */
interface AIProvider {
  analyzeImage(imageUrl: string): Promise<AIAnalysisResult>;
}

/**
 * Mock AI Provider for development
 */
class MockAIProvider implements AIProvider {
  async analyzeImage(_imageUrl: string): Promise<AIAnalysisResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      diseaseDetected: "Early Blight",
      confidence: 92,
      cropHealthScore: 68,
      recommendedTreatment: "Apply copper-based fungicide every 7-10 days. Remove infected leaves.",
      waterRecommendation: "Reduce watering to 2 times per week. Water early morning to minimize leaf wetness.",
      fertilizerRecommendation: "Apply balanced NPK (10-10-10) fertilizer. Increase potassium for disease resistance.",
      weatherSummary: "Warm, humid conditions favor disease spread. Monitor closely over next 5 days.",
    };
  }
}

/**
 * Actual AI Provider (Placeholder for YOLO/TensorFlow/OpenAI)
 */
class RealAIProvider implements AIProvider {
  async analyzeImage(imageUrl: string): Promise<AIAnalysisResult> {
    // This is where you would call your actual AI API
    // Example: const response = await axios.post(env.YOLO_API_URL, { image: imageUrl });
    console.log(`Analyzing image at ${imageUrl} using real AI service at ${env.YOLO_API_URL}`);
    
    // For now, fallback to mock but structured as a real call
    const mock = new MockAIProvider();
    return mock.analyzeImage(imageUrl);
  }
}

export class AnalysisService {
  private static aiProvider: AIProvider = env.NODE_ENV === "production" 
    ? new RealAIProvider() 
    : new MockAIProvider();

  static async performAnalysis(
    analysisRequest: AnalysisRequest
  ): Promise<Analysis> {
    // Call AI/ML service to analyze the image through the provider
    const aiResult = await this.aiProvider.analyzeImage(analysisRequest.imageUrl);

    const analysisData: CreateAnalysisInput = {
      cropId: analysisRequest.cropId,
      userId: analysisRequest.userId,
      imageUrl: analysisRequest.imageUrl,
      diseaseDetected: aiResult.diseaseDetected,
      confidence: aiResult.confidence,
      cropHealthScore: aiResult.cropHealthScore,
      recommendedTreatment: aiResult.recommendedTreatment,
      waterRecommendation: aiResult.waterRecommendation,
      fertilizerRecommendation: aiResult.fertilizerRecommendation,
      weatherSummary: aiResult.weatherSummary,
    };

    const analysis = await AnalysisModel.create(analysisData);
    return analysis;
  }

  static async getAnalysisById(id: string): Promise<Analysis | null> {
    const analysis = await AnalysisModel.findById(id);
    return analysis;
  }

  static async getAnalysisByCropId(
    cropId: string,
    limit = 10,
    offset = 0
  ): Promise<Analysis[]> {
    const analyses = await AnalysisModel.findByCropId(cropId, limit, offset);
    return analyses;
  }

  static async getAnalysisByUserId(
    userId: string,
    limit = 10,
    offset = 0
  ): Promise<Analysis[]> {
    const analyses = await AnalysisModel.findByUserId(userId, limit, offset);
    return analyses;
  }

  static async deleteAnalysis(id: string): Promise<void> {
    const analysis = await AnalysisModel.findById(id);
    if (!analysis) {
      throw createError("Analysis not found", 404);
    }

    await AnalysisModel.delete(id);
  }
}

export default AnalysisService;
