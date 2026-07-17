-- CropTwin Database Schema
-- PostgreSQL database setup for CropTwin application

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('farmer', 'officer', 'researcher', 'admin')),
  farm_size DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  profile_image VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop_name VARCHAR(100) NOT NULL,
  crop_type VARCHAR(100) NOT NULL,
  planted_date DATE NOT NULL,
  expected_harvest_date DATE NOT NULL,
  area_in_acres DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  soil_type VARCHAR(100) NOT NULL,
  irrigation_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'healthy' CHECK (status IN ('healthy', 'diseased', 'recovering', 'harvested')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  disease_detected VARCHAR(255),
  confidence DECIMAL(5, 2),
  crop_health_score DECIMAL(5, 2),
  recommended_treatment TEXT,
  water_recommendation TEXT,
  fertilizer_recommendation TEXT,
  weather_summary TEXT,
  analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indices for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_crops_user_id ON crops(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_status ON crops(status);
CREATE INDEX IF NOT EXISTS idx_analyses_crop_id ON analyses(crop_id);
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_analysis_date ON analyses(analysis_date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (idempotent way)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
        CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_crops_updated_at') THEN
        CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_analyses_updated_at') THEN
        CREATE TRIGGER update_analyses_updated_at BEFORE UPDATE ON analyses
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
