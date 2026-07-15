import { motion } from "framer-motion";
import { howItWorks } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">Process</span>
            <div className="w-1 h-8 bg-primary rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six simple steps to transform your farming with AI-powered insights.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {howItWorks.map((item, index) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              className="relative"
            >
              {/* Card */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border border-green-100 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg font-poppins shadow-lg">
                  {item.step}
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-foreground font-poppins mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Arrow connector (hidden on last item) */}
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="text-primary" size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#crop-analyzer"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
