import { motion } from "framer-motion";
import { Camera, Upload, ArrowRight } from "lucide-react";

interface HeroProps {
  onAnalyzerClick?: () => void;
}

export default function Hero({ onAnalyzerClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 md:pt-32 pb-20 overflow-hidden bg-white"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 -z-10" />

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-poppins leading-tight mb-4"
                variants={itemVariants}
              >
                AI Digital Twin for <span className="text-primary">Small Farmers</span>
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                variants={itemVariants}
              >
                Detect crop diseases in seconds, optimize farm health with AI-powered insights, and increase yields through intelligent recommendations.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={onAnalyzerClick}
                className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload size={20} />
                Upload Crop Image
              </motion.button>
              <motion.button
                onClick={onAnalyzerClick}
                className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-green-100 transition-all duration-200 border border-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={20} />
                Open Camera
              </motion.button>
            </motion.div>

            {/* Learn More Link */}
            <motion.a
              href="#features"
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              whileHover={{ x: 5 }}
            >
              Learn More <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative w-full h-full"
            >
              <img
                src="/manus-storage/hero-banner_44df5566.png"
                alt="Crop Analysis"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
