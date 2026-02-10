import { motion } from "framer-motion";
import { Award, FlaskConical, GraduationCap, BookOpen, Home, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSection } from "@/pages/Index";
import LabNavigation from "./LabNavigation";

interface ConclusionProps {
  onNavigate: (section: LabSection) => void;
}

const Conclusion = ({ onNavigate }: ConclusionProps) => {
  const keyLearnings = [
    "Esterification reaction mechanism",
    "Role of catalyst in synthesis",
    "Crystallization techniques",
    "Product purification methods",
  ];

  return (
    <div className="min-h-screen bg-[#0B1116]">
      <LabNavigation currentSection="conclusion" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header with Award */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-5 rounded-xl bg-[#39C6D6]/10 border border-[#39C6D6]/30 flex items-center justify-center glow-primary"
            >
              <Award className="w-8 h-8 text-[#39C6D6]" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#EAF6F7] mb-2 high-contrast-text">
              Experiment Complete
            </h1>
            <p className="text-[#B7C9CC] text-sm">
              Virtual Chemical Prototyping Lab
            </p>
          </motion.div>

          {/* Main Conclusion Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card border border-[#1E3A40] rounded-xl p-6 md:p-8 mb-8 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#39C6D6]/30 via-[#6E4BD8]/30 to-[#39C6D6]/30" />
            <BookOpen className="w-6 h-6 text-[#6E4BD8] mx-auto mb-4" />
            <p className="text-base md:text-lg text-[#EAF6F7] leading-relaxed font-medium">
              "This virtual chemical prototyping lab demonstrates how chemical 
              experiments can be understood through interactive visualization, 
              controlled decision-making, and safe simulation before real 
              laboratory execution."
            </p>
          </motion.div>

          {/* Key Learnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card border border-[#1E3A40] rounded-xl p-5 mb-8"
          >
            <h3 className="font-semibold text-[#EAF6F7] mb-4 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6E4BD8]" />
              Key Learnings
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {keyLearnings.map((learning, index) => (
                <motion.div
                  key={learning}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-[#B7C9CC]"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  {learning}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Takeaways Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
            <div className="glass-card border border-[#1E3A40] rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl bg-[#39C6D6]/10 flex items-center justify-center mb-3 border border-[#39C6D6]/30">
                <FlaskConical className="w-5 h-5 text-[#39C6D6]" />
              </div>
              <h3 className="font-semibold text-[#EAF6F7] mb-2 text-sm">
                Understanding Synthesis
              </h3>
              <p className="text-xs text-[#B7C9CC] leading-relaxed">
                The esterification reaction between salicylic acid and acetic 
                anhydride produces aspirin through a controlled catalytic process.
              </p>
            </div>

            <div className="glass-card border border-[#1E3A40] rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl bg-[#6E4BD8]/10 flex items-center justify-center mb-3 border border-[#6E4BD8]/30">
                <GraduationCap className="w-5 h-5 text-[#6E4BD8]" />
              </div>
              <h3 className="font-semibold text-[#EAF6F7] mb-2 text-sm">
                Learning by Doing
              </h3>
              <p className="text-xs text-[#B7C9CC] leading-relaxed">
                Interactive decision-making helps students understand how 
                experimental choices affect reaction outcomes and product quality.
              </p>
            </div>
          </motion.div>

          {/* Product Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-card border border-[#1E3A40] rounded-xl p-5 mb-8"
          >
            <h3 className="font-semibold text-[#EAF6F7] mb-4 text-sm text-center">
              Product Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#101C22]/60 backdrop-blur-sm rounded-xl p-3 text-center border border-[#1E3A40]">
                <p className="text-[10px] text-[#7A8E93] mb-0.5 uppercase tracking-wide">Product Name</p>
                <p className="font-semibold text-[#EAF6F7] text-sm">Aspirin</p>
              </div>
              <div className="bg-[#101C22]/60 backdrop-blur-sm rounded-xl p-3 text-center border border-[#1E3A40]">
                <p className="text-[10px] text-[#7A8E93] mb-0.5 uppercase tracking-wide">Chemical Name</p>
                <p className="font-semibold text-[#EAF6F7] text-sm">Acetylsalicylic Acid</p>
              </div>
              <div className="bg-[#101C22]/60 backdrop-blur-sm rounded-xl p-3 text-center border border-[#1E3A40]">
                <p className="text-[10px] text-[#7A8E93] mb-0.5 uppercase tracking-wide">Molecular Formula</p>
                <p className="font-semibold text-[#EAF6F7] font-mono text-sm">C₉H₈O₄</p>
              </div>
              <div className="bg-[#101C22]/60 backdrop-blur-sm rounded-xl p-3 text-center border border-[#1E3A40]">
                <p className="text-[10px] text-[#7A8E93] mb-0.5 uppercase tracking-wide">Appearance</p>
                <p className="font-semibold text-[#EAF6F7] text-sm">White Crystals</p>
              </div>
            </div>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center text-xs text-[#7A8E93] mb-8 space-y-1"
          >
            <p>
              Thank you for exploring this virtual laboratory simulation.
            </p>
            <p className="font-medium text-[#B7C9CC]">
              Department of Chemistry
            </p>
            <p>
              MIT Academy of Engineering, Alandi, Pune
            </p>
          </motion.div>

          {/* Return to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => onNavigate("home")}
              variant="outline"
              className="px-6 py-5 text-base font-semibold rounded-xl border-2 border-[#1E3A40] hover:bg-[#162A31] hover:border-[#39C6D6]/30 transition-colors text-[#EAF6F7]"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
