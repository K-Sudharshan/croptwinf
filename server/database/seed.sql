-- CropTwin Database Seed Data
-- Sample data for development and testing

-- Insert sample users
INSERT INTO users (email, password, first_name, last_name, role, farm_size, location, phone_number, is_active)
VALUES
  ('farmer1@croptwin.com', '$2a$10$YourHashedPasswordHere', 'Rajesh', 'Kumar', 'farmer', 3.5, 'Karnataka, India', '+91-9876543210', true),
  ('officer1@croptwin.com', '$2a$10$YourHashedPasswordHere', 'Amina', 'Okonkwo', 'officer', 0, 'Lagos, Nigeria', '+234-8123456789', true),
  ('researcher1@croptwin.com', '$2a$10$YourHashedPasswordHere', 'Chen', 'Wei', 'researcher', 0, 'Beijing, China', '+86-13800138000', true),
  ('admin@croptwin.com', '$2a$10$YourHashedPasswordHere', 'Admin', 'User', 'admin', 0, 'Global', '+1-5551234567', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample crops
INSERT INTO crops (user_id, crop_name, crop_type, planted_date, expected_harvest_date, area_in_acres, location, soil_type, irrigation_type, status, notes)
SELECT id, 'Maize Field A', 'Maize', '2026-04-01', '2026-09-15', 2.5, 'Karnataka, India', 'Black Soil', 'Drip Irrigation', 'healthy', 'Primary maize crop'
FROM users WHERE email = 'farmer1@croptwin.com'
ON CONFLICT DO NOTHING;

INSERT INTO crops (user_id, crop_name, crop_type, planted_date, expected_harvest_date, area_in_acres, location, soil_type, irrigation_type, status, notes)
SELECT id, 'Tomato Greenhouse', 'Tomato', '2026-05-01', '2026-10-31', 1.0, 'Karnataka, India', 'Loamy Soil', 'Drip Irrigation', 'diseased', 'Early blight detected'
FROM users WHERE email = 'farmer1@croptwin.com'
ON CONFLICT DO NOTHING;

-- Insert sample analyses
INSERT INTO analyses (crop_id, user_id, image_url, disease_detected, confidence, crop_health_score, recommended_treatment, water_recommendation, fertilizer_recommendation, weather_summary)
SELECT c.id, u.id, 'https://example.com/crop-image-1.jpg', 'Early Blight', 92, 68, 'Apply copper-based fungicide every 7-10 days', 'Reduce watering to 2 times per week', 'Apply NPK 10-10-10 fertilizer', 'Warm, humid conditions favor disease spread'
FROM crops c
JOIN users u ON c.user_id = u.id
WHERE u.email = 'farmer1@croptwin.com' AND c.crop_name = 'Tomato Greenhouse'
ON CONFLICT DO NOTHING;
