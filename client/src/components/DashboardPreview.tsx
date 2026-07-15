import { motion } from "framer-motion";
import { dashboardWidgets } from "@/data/mockData";

export default function DashboardPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section className="py-20 md:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-4">
            Dashboard Preview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor all your farm metrics in one beautiful, intuitive dashboard.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dashboardWidgets.map((widget) => (
            <motion.div
              key={widget.id}
              variants={itemVariants}
              className={`${widget.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    {widget.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground font-poppins">
                    {widget.value}
                  </p>
                </div>
                <span className="text-3xl">{widget.icon}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-medium text-gray-600">
                  {widget.status}
                </span>
              </div>
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
          <p className="text-muted-foreground mb-6">
            Get real-time insights and make data-driven farming decisions.
          </p>
          <button className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl">
            Access Full Dashboard
          </button>
        </motion.div>
      </div>
    </section>
  );
}
