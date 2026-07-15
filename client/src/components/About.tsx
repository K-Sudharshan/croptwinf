import { motion } from "framer-motion";
import { testimonials } from "@/data/mockData";
import { Star } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white to-green-50">
      <div className="container">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-poppins mb-6">
            About CropTwin
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            CropTwin is an AI-powered agricultural platform designed to empower smallholder farmers with enterprise-grade crop monitoring and disease detection technology. We believe that advanced technology should be accessible to everyone, regardless of farm size or location.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our mission is to help farmers make smarter decisions, reduce crop losses, and increase yields through intelligent data analysis and personalized recommendations.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20 py-12 border-y border-gray-200"
        >
          {[
            { label: "Active Farmers", value: "50K+" },
            { label: "Crops Analyzed", value: "500K+" },
            { label: "Disease Detection Accuracy", value: "95%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary font-poppins mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-foreground font-poppins mb-4">
            What Users Say
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from farmers, agricultural officers, and researchers using CropTwin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground mb-1">
                  {testimonial.role}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
