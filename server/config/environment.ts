/**
 * Environment Configuration
 * Loads and validates environment variables
 */

import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001"),
  API_URL: process.env.API_URL || "http://localhost:3001",

  // Database
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_NAME: process.env.DB_NAME || "croptwin",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",

  // File Upload
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "5242880"), // 5MB
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads",

  // AI/ML Services
  YOLO_API_URL: process.env.YOLO_API_URL || "http://localhost:5000",
  TENSORFLOW_API_URL: process.env.TENSORFLOW_API_URL || "http://localhost:5001",

  // Email
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
  SMTP_FROM: process.env.SMTP_FROM || "noreply@croptwin.com",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};

export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTesting = env.NODE_ENV === "testing";

export default env;
