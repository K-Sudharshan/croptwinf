/**
 * Crop Model
 * Defines the Crop data structure and database operations
 */

import { getDatabase } from "../config/database";

export interface Crop {
  id: string;
  userId: string;
  cropName: string;
  cropType: string;
  plantedDate: Date;
  expectedHarvestDate: Date;
  areaInAcres: number;
  location: string;
  soilType: string;
  irrigationType: string;
  status: "healthy" | "diseased" | "recovering" | "harvested";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCropInput {
  userId: string;
  cropName: string;
  cropType: string;
  plantedDate: Date;
  expectedHarvestDate: Date;
  areaInAcres: number;
  location: string;
  soilType: string;
  irrigationType: string;
  notes?: string;
}

export class CropModel {
  static async create(cropData: CreateCropInput): Promise<Crop> {
    const db = getDatabase();
    const query = `
      INSERT INTO crops (user_id, crop_name, crop_type, planted_date, expected_harvest_date, area_in_acres, location, soil_type, irrigation_type, status, notes, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'healthy', $10, NOW(), NOW())
      RETURNING id, user_id as "userId", crop_name as "cropName", crop_type as "cropType", planted_date as "plantedDate", expected_harvest_date as "expectedHarvestDate", area_in_acres as "areaInAcres", location, soil_type as "soilType", irrigation_type as "irrigationType", status, notes, created_at as "createdAt", updated_at as "updatedAt"
    `;
    const values = [
      cropData.userId,
      cropData.cropName,
      cropData.cropType,
      cropData.plantedDate,
      cropData.expectedHarvestDate,
      cropData.areaInAcres,
      cropData.location,
      cropData.soilType,
      cropData.irrigationType,
      cropData.notes || null,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id: string): Promise<Crop | null> {
    const db = getDatabase();
    const query = `
      SELECT id, user_id as "userId", crop_name as "cropName", crop_type as "cropType", planted_date as "plantedDate", expected_harvest_date as "expectedHarvestDate", area_in_acres as "areaInAcres", location, soil_type as "soilType", irrigation_type as "irrigationType", status, notes, created_at as "createdAt", updated_at as "updatedAt"
      FROM crops WHERE id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByUserId(userId: string, limit = 10, offset = 0): Promise<Crop[]> {
    const db = getDatabase();
    const query = `
      SELECT id, user_id as "userId", crop_name as "cropName", crop_type as "cropType", planted_date as "plantedDate", expected_harvest_date as "expectedHarvestDate", area_in_acres as "areaInAcres", location, soil_type as "soilType", irrigation_type as "irrigationType", status, notes, created_at as "createdAt", updated_at as "updatedAt"
      FROM crops WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3
    `;

    const result = await db.query(query, [userId, limit, offset]);
    return result.rows;
  }

  static async update(id: string, cropData: Partial<Crop>): Promise<Crop | null> {
    const db = getDatabase();
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    Object.entries(cropData).forEach(([key, value]) => {
      if (key !== "id" && key !== "createdAt") {
        const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        fields.push(`${dbKey} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE crops SET ${fields.join(", ")} WHERE id = $${paramCount}
      RETURNING id, user_id as "userId", crop_name as "cropName", crop_type as "cropType", planted_date as "plantedDate", expected_harvest_date as "expectedHarvestDate", area_in_acres as "areaInAcres", location, soil_type as "soilType", irrigation_type as "irrigationType", status, notes, created_at as "createdAt", updated_at as "updatedAt"
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const db = getDatabase();
    const query = "DELETE FROM crops WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export default CropModel;
