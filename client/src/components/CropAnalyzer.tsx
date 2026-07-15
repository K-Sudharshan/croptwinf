import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, CheckCircle, AlertCircle } from "lucide-react";
import { mockAnalysisResult } from "@/data/mockData";

export default function CropAnalyzer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<typeof mockAnalysisResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setShowResult(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult);
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setShowResult(false);
    setAnalysisResult(null);
  };

  const handleAnalyzeAnother = () => {
    setUploadedImage(null);
    setShowResult(false);
  };

  return (
    <section id="crop-analyzer" className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            Analyze Your Crop
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image of your crop and get instant AI-powered disease detection and recommendations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Upload Area */}
            {!uploadedImage ? (
              <motion.label
                className="relative border-2 border-dashed border-primary/30 rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Drag and drop your crop image
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse
                    </p>
                  </div>
                </div>
              </motion.label>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={uploadedImage}
                  alt="Uploaded crop"
                  className="w-full h-auto object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin mx-auto mb-3" />
                      <p className="font-semibold">Analyzing...</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              {uploadedImage && !showResult && (
                <>
                  <motion.button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Crop"}
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    className="w-full bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition-all duration-200 border border-primary/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Upload Different Image
                  </motion.button>
                </>
              )}
            </div>

            {/* Alternative Upload Methods */}
            {!uploadedImage && (
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Camera size={18} />
                  <span className="hidden sm:inline">Camera</span>
                </motion.button>
                <motion.button
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload size={18} />
                  <span className="hidden sm:inline">Gallery</span>
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {showResult && analysisResult && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Result Card */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground font-poppins mb-2">
                        Analysis Results
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        AI-powered crop health assessment
                      </p>
                    </div>
                    <CheckCircle className="text-primary" size={32} />
                  </div>

                  {/* Disease Detection */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-orange-500" size={20} />
                      <span className="text-sm font-semibold text-muted-foreground uppercase">
                        Disease Detected
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground font-poppins">
                      {analysisResult.diseaseDetected}
                    </p>
                    <div className="mt-3 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-orange-900">
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* Health Score */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                      Crop Health Score
                    </p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-bold text-primary font-poppins">
                        {analysisResult.cropHealthScore}%
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-emerald-400"
                          style={{ width: `${analysisResult.cropHealthScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                        Treatment Recommendation
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {analysisResult.recommendedTreatment}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                        Water Recommendation
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {analysisResult.waterRecommendation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                        Fertilizer Recommendation
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {analysisResult.fertilizerRecommendation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                        Weather Summary
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {analysisResult.weatherSummary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={handleAnalyzeAnother}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 active:scale-95"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Analyze Another Image
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
