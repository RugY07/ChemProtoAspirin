import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSection } from "@/pages/Index";
import LabNavigation from "./LabNavigation";
import blockDiagramImage from "@/assets/aspirin-block-diagram.png";
import processFlowImage from "@/assets/aspirin-process-flow-diagram.png";

interface BlockDiagramProps {
  onNavigate: (section: LabSection) => void;
}

const processSteps = [
  { id: 1, label: "Salicylic Acid", sub: "Raw Material" },
  { id: 2, label: "Acetic Anhydride", sub: "Acetylating Agent" },
  { id: 3, label: "H₂SO₄ Catalyst", sub: "Reaction Initiator" },
  { id: 4, label: "Heating (50-60°C)", sub: "Esterification" },
  { id: 5, label: "Water Addition", sub: "Hydrolysis" },
  { id: 6, label: "Ice Bath Cooling", sub: "Crystallization" },
  { id: 7, label: "Neutralization", sub: "NaHCO₃ Treatment" },
  { id: 8, label: "Filtration", sub: "Product Isolation" },
  { id: 9, label: "Aspirin Crystals", sub: "Final Product" },
];

const BlockDiagram = ({ onNavigate }: BlockDiagramProps) => {
  return (
    <div className="min-h-screen bg-[#0B1116]">
      <LabNavigation currentSection="diagrams" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#EAF6F7] mb-2 high-contrast-text">
            Process Flow Diagram
          </h1>
          <p className="text-[#B7C9CC] text-sm">
            Visual representation of the aspirin synthesis process
          </p>
        </motion.div>

        {/* Block Diagram - Full Width with Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-lg font-semibold text-[#EAF6F7] mb-4 text-center">Block Diagram</h2>
          <div className="glass-card border-2 border-[#1E3A40] rounded-xl p-4 md:p-6">
            <div className="bg-[#162A31] rounded-xl p-4 border border-[#1E3A40]">
              <img 
                src={blockDiagramImage} 
                alt="Aspirin Synthesis Block Diagram" 
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#7A8E93] text-center mt-3">
              Fig 1: Block diagram showing the sequential steps in aspirin synthesis
            </p>
          </div>
        </motion.div>

        {/* Process Flow Diagram - Full Width with Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-lg font-semibold text-[#EAF6F7] mb-4 text-center">Process Flow Diagram</h2>
          <div className="glass-card border-2 border-[#1E3A40] rounded-xl p-4 md:p-6">
            <div className="bg-[#162A31] rounded-xl p-4 border border-[#1E3A40]">
              <img 
                src={processFlowImage} 
                alt="Aspirin Synthesis Process Flow Diagram" 
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#7A8E93] text-center mt-3">
              Fig 2: Process flow diagram with equipment symbols for industrial aspirin production
            </p>
          </div>
        </motion.div>

        {/* Interactive Process Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card border border-[#1E3A40] rounded-xl p-6 md:p-8 mb-10"
        >
          <h3 className="text-base font-semibold text-[#EAF6F7] mb-6 text-center">Interactive Process Overview</h3>
          <div className="flex flex-col items-center">
            {/* Input Section */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {processSteps.slice(0, 3).map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-[#39C6D6]/10 border border-[#39C6D6]/30 rounded-xl p-3 min-w-[120px] text-center transition-colors hover:bg-[#39C6D6]/20 neon-hover"
                >
                  <p className="font-medium text-[#39C6D6] text-xs">{step.label}</p>
                  <p className="text-[10px] text-[#B7C9CC] mt-0.5">{step.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Arrow Down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center my-2"
            >
              <div className="w-px h-6 bg-[#1E3A40]" />
              <ArrowDown className="w-4 h-4 text-[#7A8E93]" />
            </motion.div>

            {/* Processing Section */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {processSteps.slice(3, 6).map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : index === 2 ? 20 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-[#6E4BD8]/10 border border-[#6E4BD8]/30 rounded-xl p-3 min-w-[120px] text-center transition-colors hover:bg-[#6E4BD8]/20 neon-hover"
                >
                  <p className="font-medium text-[#6E4BD8] text-xs">{step.label}</p>
                  <p className="text-[10px] text-[#B7C9CC] mt-0.5">{step.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Arrow Down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center my-2"
            >
              <div className="w-px h-6 bg-[#1E3A40]" />
              <ArrowDown className="w-4 h-4 text-[#7A8E93]" />
            </motion.div>

            {/* Purification Section */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {processSteps.slice(6, 8).map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="bg-[#101C22] border border-[#1E3A40] rounded-xl p-3 min-w-[120px] text-center transition-colors hover:bg-[#162A31] neon-hover"
                >
                  <p className="font-medium text-[#EAF6F7] text-xs">{step.label}</p>
                  <p className="text-[10px] text-[#B7C9CC] mt-0.5">{step.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Arrow Down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center my-2"
            >
              <div className="w-px h-6 bg-[#1E3A40]" />
              <ArrowDown className="w-4 h-4 text-[#7A8E93]" />
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
              className="bg-gradient-primary text-[#0B1116] rounded-xl p-4 min-w-[150px] text-center shadow-glow-primary"
            >
              <p className="font-semibold text-sm">{processSteps[8].label}</p>
              <p className="text-xs opacity-80 mt-0.5">{processSteps[8].sub}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="glass-card border border-[#1E3A40] rounded-xl p-5 mb-8"
        >
          <h3 className="font-semibold text-[#EAF6F7] mb-3 text-sm">Diagram Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#39C6D6]/20 border border-[#39C6D6]/40" />
              <span className="text-xs text-[#B7C9CC]">Input Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#6E4BD8]/20 border border-[#6E4BD8]/40" />
              <span className="text-xs text-[#B7C9CC]">Processing Steps</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#101C22] border border-[#1E3A40]" />
              <span className="text-xs text-[#B7C9CC]">Purification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-primary" />
              <span className="text-xs text-[#B7C9CC]">Final Product</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => onNavigate("advantages")}
            className="btn-glow bg-gradient-primary text-[#0B1116] px-6 py-5 text-base font-semibold rounded-xl shadow-glow-primary hover:scale-105"
          >
            View Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockDiagram;
