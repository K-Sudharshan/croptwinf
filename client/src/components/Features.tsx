import { motion } from "framer-motion";
import { features } from "@/data/mockData";

export default function Features() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-white to-green-50">
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
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">Features</span>
            <div className="w-1 h-8 bg-primary rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            Powerful Tools for Smarter Farming
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CropTwin combines AI, satellite technology, and community intelligence to help you make data-driven decisions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 w-1 h-12 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground font-poppins mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
