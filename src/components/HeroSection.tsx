import { motion } from "framer-motion";
import { Users, Brain, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden gradient-hero py-20 px-6">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(172_66%_40%_/_0.15),_transparent_50%)]" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative max-w-4xl mx-auto text-center"
    >
      <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6">
        <Sparkles className="w-4 h-4 text-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground/90">AI-Powered K-Means Clustering</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground tracking-tight mb-4">
        Smart Study Group
        <br />
        <span className="opacity-80">Formation Agent</span>
      </h1>
      <p className="text-lg md:text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-8">
        Automatically form balanced study groups using unsupervised machine learning.
        Every group gets a mix of strengths in Maths, Programming & Communication.
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/80">
        {[
          { icon: Brain, label: "K-Means Algorithm" },
          { icon: Users, label: "Balanced Groups" },
          { icon: Sparkles, label: "Auto-Optimized" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm font-medium">
            <Icon className="w-5 h-5" />
            {label}
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
