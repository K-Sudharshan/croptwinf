/**
 * Database Configuration
 * Handles database connection setup and configuration
 */

import { Pool, PoolClient } from "pg";

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "croptwin",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let pool: Pool | null = null;

export const initializeDatabase = async (): Promise<Pool> => {
  if (pool) {
    return pool;
  }

  pool = new Pool(databaseConfig);

  pool.on("error", (err: Error) => {
    console.error("Unexpected error on idle client", err);
  });

  try {
    const client = await pool.connect();
    console.log("✓ Database connected successfully");
    client.release();
  } catch (error) {
    console.error("✗ Failed to connect to database:", error);
    throw error;
  }

  return pool;
};

export const getDatabase = (): Pool => {
  if (!pool) {
    throw new Error("Database not initialized. Call initializeDatabase first.");
  }
  return pool;
};

export const closeDatabase = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("✓ Database connection closed");
  }
};

export default databaseConfig;
