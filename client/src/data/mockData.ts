/* Mock Data for CropTwin */

export const features = [
  {
    id: 1,
    title: "AI Disease Detection",
    description: "Instantly identify crop diseases with 95% accuracy using advanced AI models trained on thousands of crop images.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Digital Twin Simulation",
    description: "Create a virtual model of your farm and simulate different scenarios to optimize growth and yield.",
    icon: "🌱",
  },
  {
    id: 3,
    title: "Satellite Monitoring",
    description: "Track your fields with real-time satellite imagery and get alerts for anomalies and weather patterns.",
    icon: "🛰️",
  },
  {
    id: 4,
    title: "Smart Irrigation",
    description: "Receive data-driven recommendations for optimal watering schedules based on soil moisture and weather.",
    icon: "💧",
  },
  {
    id: 5,
    title: "Weather Prediction",
    description: "Get accurate 14-day weather forecasts with specific crop impact analysis for your location.",
    icon: "⛅",
  },
  {
    id: 6,
    title: "Community Intelligence",
    description: "Share insights with other farmers and learn from collective farm data and best practices.",
    icon: "👥",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Upload Crop Image",
    description: "Take a photo of your crop or upload from your gallery. Our AI analyzes the image instantly.",
  },
  {
    step: 2,
    title: "Capture Live Photo",
    description: "Optional: Use your device camera for real-time analysis with environmental context.",
  },
  {
    step: 3,
    title: "AI Disease Detection",
    description: "Our models identify diseases, pests, and nutritional deficiencies with confidence scores.",
  },
  {
    step: 4,
    title: "Digital Twin Simulation",
    description: "Simulate treatment options and see predicted outcomes before implementation.",
  },
  {
    step: 5,
    title: "Personalized Recommendations",
    description: "Receive tailored treatment plans, fertilizer schedules, and irrigation advice.",
  },
  {
    step: 6,
    title: "Improve Crop Health",
    description: "Track progress over time and adjust strategies based on real-time feedback.",
  },
];

export const mockAnalysisResult = {
  diseaseDetected: "Early Blight",
  confidence: 92,
  cropHealthScore: 68,
  recommendedTreatment: "Apply copper-based fungicide every 7-10 days. Remove infected leaves.",
  waterRecommendation: "Reduce watering to 2 times per week. Water early morning to minimize leaf wetness.",
  fertilizerRecommendation: "Apply balanced NPK (10-10-10) fertilizer. Increase potassium for disease resistance.",
  weatherSummary: "Warm, humid conditions favor disease spread. Monitor closely over next 5 days.",
};

export const dashboardWidgets = [
  {
    id: 1,
    title: "Crop Health",
    value: "78%",
    status: "Good",
    color: "bg-green-100",
    icon: "🌿",
  },
  {
    id: 2,
    title: "Soil Moisture",
    value: "65%",
    status: "Optimal",
    color: "bg-blue-100",
    icon: "💧",
  },
  {
    id: 3,
    title: "Temperature",
    value: "28°C",
    status: "Ideal",
    color: "bg-yellow-100",
    icon: "🌡️",
  },
  {
    id: 4,
    title: "Humidity",
    value: "72%",
    status: "High",
    color: "bg-cyan-100",
    icon: "💨",
  },
  {
    id: 5,
    title: "Satellite Status",
    value: "Active",
    status: "Monitoring",
    color: "bg-purple-100",
    icon: "🛰️",
  },
  {
    id: 6,
    title: "AI Recommendations",
    value: "3 New",
    status: "Pending",
    color: "bg-green-100",
    icon: "📋",
  },
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Smallholder Farmer",
    quote: "CropTwin helped me identify a disease early and save my entire harvest. The recommendations are spot-on!",
    location: "Karnataka, India",
  },
  {
    name: "Amina Okonkwo",
    role: "Agricultural Officer",
    quote: "This platform makes it easy to advise farmers on disease management. The AI is incredibly accurate.",
    location: "Lagos, Nigeria",
  },
  {
    name: "Dr. Chen Wei",
    role: "Agricultural Researcher",
    quote: "CropTwin's digital twin simulation is revolutionizing how we test farming strategies.",
    location: "Beijing, China",
  },
];
