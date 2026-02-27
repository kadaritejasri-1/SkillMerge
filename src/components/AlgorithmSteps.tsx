import { motion } from "framer-motion";

const steps = [
  { step: 1, title: "Choose K", desc: "Select number of study groups to form" },
  { step: 2, title: "Place Centroids", desc: "Initialize cluster centers randomly" },
  { step: 3, title: "Assign Students", desc: "Each student goes to nearest centroid" },
  { step: 4, title: "Recompute", desc: "Update centroids from group averages" },
  { step: 5, title: "Converge", desc: "Repeat until assignments stabilize" },
];

const AlgorithmSteps = () => (
  <div className="bg-card rounded-xl shadow-card border p-6">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
      How K-Means Works
    </h3>
    <div className="flex flex-col sm:flex-row gap-3">
      {steps.map(({ step, title, desc }, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex-1 relative p-4 rounded-lg bg-muted/50 border border-border"
        >
          <div className="text-xs font-mono text-accent font-semibold mb-1">Step {step}</div>
          <div className="font-semibold text-sm mb-1">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AlgorithmSteps;
