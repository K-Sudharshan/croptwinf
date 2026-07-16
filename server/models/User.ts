/**
 * User Model
 * Defines the User data structure and database operations
 */

import { getDatabase } from "../config/database";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "farmer" | "officer" | "researcher" | "admin";
  farmSize: number; // in acres
  location: string;
  phoneNumber: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  farmSize: number;
  location: string;
  phoneNumber: string;
}

export class UserModel {
  static async create(userData: CreateUserInput): Promise<User> {
    const db = getDatabase();
    const query = `
      INSERT INTO users (email, password, first_name, last_name, role, farm_size, location, phone_number, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW(), NOW())
      RETURNING id, email, password, first_name as "firstName", last_name as "lastName", role, farm_size as "farmSize", location, phone_number as "phoneNumber", is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
    `;
    const values = [
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.role,
      userData.farmSize,
      userData.location,
      userData.phoneNumber,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id: string): Promise<User | null> {
    const db = getDatabase();
    const query = `
      SELECT id, email, password, first_name as "firstName", last_name as "lastName", role, farm_size as "farmSize", location, phone_number as "phoneNumber", profile_image as "profileImage", is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
      FROM users WHERE id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const db = getDatabase();
    const query = `
      SELECT id, email, password, first_name as "firstName", last_name as "lastName", role, farm_size as "farmSize", location, phone_number as "phoneNumber", profile_image as "profileImage", is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
      FROM users WHERE email = $1
    `;

    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  }

  static async update(id: string, userData: Partial<User>): Promise<User | null> {
    const db = getDatabase();
    const fields: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    Object.entries(userData).forEach(([key, value]) => {
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
      UPDATE users SET ${fields.join(", ")} WHERE id = $${paramCount}
      RETURNING id, email, password, first_name as "firstName", last_name as "lastName", role, farm_size as "farmSize", location, phone_number as "phoneNumber", profile_image as "profileImage", is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const db = getDatabase();
    const query = "DELETE FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async findAll(limit = 10, offset = 0): Promise<User[]> {
    const db = getDatabase();
    const query = `
      SELECT id, email, password, first_name as "firstName", last_name as "lastName", role, farm_size as "farmSize", location, phone_number as "phoneNumber", profile_image as "profileImage", is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
      FROM users LIMIT $1 OFFSET $2
    `;

    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }
}

export default UserModel;
