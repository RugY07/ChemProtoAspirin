import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSection } from "@/pages/Index";
import LabNavigation from "./LabNavigation";

interface AdvantagesDisadvantagesProps {
  onNavigate: (section: LabSection) => void;
}

const advantages = [
  "Enhances conceptual understanding of organic synthesis",
  "Demonstrates effect of experimental parameters visually",
  "Improves safety awareness before real lab work",
  "Reduces chemical wastage and environmental impact",
  "Useful for pre-lab preparation and training",
  "Allows repeated practice without material costs",
  "Provides immediate feedback on decisions",
  "Accessible anytime, anywhere with internet",
];

const disadvantages = [
  "Cannot replace hands-on laboratory experience",
  "Limited to predefined experimental conditions",
  "Requires device and internet access",
  "May not capture all real-world variables",
  "Lacks tactile and sensory feedback",
];

const AdvantagesDisadvantages = ({ onNavigate }: AdvantagesDisadvantagesProps) => {
  return (
    <div className="min-h-screen bg-[#0B1116]">
      <LabNavigation currentSection="advantages" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#EAF6F7] mb-2 high-contrast-text">
            Analysis
          </h1>
          <p className="text-[#B7C9CC]">
            Advantages and limitations of virtual laboratory simulation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Advantages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-[#EAF6F7]">Advantages</h2>
            </div>

            <div className="space-y-3">
              {advantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-colors border border-[#1E3A40]/30 hover:border-green-500/20"
                >
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#EAF6F7]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Disadvantages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-[#EAF6F7]">Limitations</h2>
            </div>

            <div className="space-y-3">
              {disadvantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-red-500/5 transition-colors border border-[#1E3A40]/30 hover:border-red-500/20"
                >
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#EAF6F7]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <h3 className="font-semibold text-[#EAF6F7] mb-3">Summary</h3>
          <p className="text-[#B7C9CC] leading-relaxed">
            Virtual laboratory simulations serve as valuable complementary tools for 
            chemistry education. While they cannot fully replace the hands-on experience 
            of real laboratory work, they provide a safe and cost-effective environment 
            for students to understand experimental procedures, make decisions, and 
            observe the effects of different parameters before conducting actual experiments.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => onNavigate("conclusion")}
            className="btn-glow bg-gradient-primary text-[#0B1116] px-8 py-6 text-lg font-semibold rounded-xl shadow-glow-primary hover:scale-105"
          >
            View Conclusion
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvantagesDisadvantages;
