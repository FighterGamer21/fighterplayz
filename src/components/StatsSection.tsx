import { motion } from "framer-motion";

const stats = [
  { label: "Years Experience", value: "6+", icon: "⏰" },
  { label: "Servers Built", value: "10+", icon: "🏰" },
  { label: "Languages", value: "6", icon: "💻" },
  { label: "Lines of Code", value: "100K+", icon: "📝" },
];

const StatsSection = () => {
  return (
    <section className="py-16 px-4 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 block-grid opacity-20" />
      <div className="max-w-4xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="inventory-slot p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-pixel text-lg md:text-xl text-primary glow-text">{stat.value}</div>
              <div className="font-body text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
