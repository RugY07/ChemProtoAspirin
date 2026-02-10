import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle, Info, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSection } from "@/pages/Index";
import LabNavigation from "./LabNavigation";

interface ChemicalShelfProps {
  onComplete: () => void;
  onNavigate: (section: LabSection) => void;
  selectedChemicals: string[];
  setSelectedChemicals: (chemicals: string[]) => void;
}

interface Chemical {
  id: string;
  name: string;
  formula?: string;
  role: string;
  safetyLevel: "safe" | "caution" | "danger";
  safetyNote: string;
  color: string;
  liquidLevel: number;
  order: number;
  containerType: "flask" | "bottle" | "jar" | "reagent";
}

const chemicals: Chemical[] = [
  {
    id: "salicylic-acid",
    name: "Salicylic Acid",
    formula: "C₇H₆O₃",
    role: "Main reactant - provides the phenolic group for esterification",
    safetyLevel: "caution",
    safetyNote: "Skin and eye irritant",
    color: "hsl(40, 10%, 95%)",
    liquidLevel: 45,
    order: 1,
    containerType: "jar",
  },
  {
    id: "acetic-anhydride",
    name: "Acetic Anhydride",
    formula: "(CH₃CO)₂O",
    role: "Acetylating agent - provides the acetyl group",
    safetyLevel: "danger",
    safetyNote: "Corrosive, lachrymator",
    color: "hsl(200, 50%, 85%)",
    liquidLevel: 70,
    order: 2,
    containerType: "bottle",
  },
  {
    id: "sulfuric-acid",
    name: "Sulfuric Acid",
    formula: "H₂SO₄",
    role: "Catalyst - speeds up the esterification reaction",
    safetyLevel: "danger",
    safetyNote: "Highly corrosive, causes severe burns",
    color: "hsl(45, 70%, 75%)",
    liquidLevel: 55,
    order: 3,
    containerType: "reagent",
  },
  {
    id: "distilled-water",
    name: "Distilled Water",
    formula: "H₂O",
    role: "Dilution and washing of product",
    safetyLevel: "safe",
    safetyNote: "Safe to handle",
    color: "hsl(200, 60%, 92%)",
    liquidLevel: 85,
    order: 4,
    containerType: "bottle",
  },
  {
    id: "cold-water",
    name: "Cold Water",
    role: "Promotes crystallization of aspirin",
    safetyLevel: "safe",
    safetyNote: "Safe to handle",
    color: "hsl(195, 70%, 90%)",
    liquidLevel: 80,
    order: 5,
    containerType: "flask",
  },
  {
    id: "ice",
    name: "Ice",
    role: "Cooling for crystallization bath",
    safetyLevel: "safe",
    safetyNote: "Safe to handle",
    color: "hsl(200, 40%, 96%)",
    liquidLevel: 60,
    order: 6,
    containerType: "jar",
  },
  {
    id: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    formula: "NaHCO₃",
    role: "Neutralization of excess acid",
    safetyLevel: "safe",
    safetyNote: "Safe to handle",
    color: "hsl(40, 15%, 98%)",
    liquidLevel: 50,
    order: 7,
    containerType: "jar",
  },
  {
    id: "hcl",
    name: "Diluted Hydrochloric Acid",
    formula: "HCl",
    role: "pH adjustment and purification",
    safetyLevel: "caution",
    safetyNote: "Corrosive, handle with care",
    color: "hsl(180, 25%, 88%)",
    liquidLevel: 65,
    order: 8,
    containerType: "reagent",
  },
  {
    id: "ethyl-acetate",
    name: "Ethyl Acetate",
    formula: "CH₃COOC₂H₅",
    role: "Solvent for purification/extraction",
    safetyLevel: "caution",
    safetyNote: "Flammable, irritant",
    color: "hsl(50, 45%, 90%)",
    liquidLevel: 75,
    order: 9,
    containerType: "bottle",
  },
];

const correctOrder = [
  "salicylic-acid",
  "acetic-anhydride",
  "sulfuric-acid",
  "distilled-water",
  "cold-water",
  "ice",
  "sodium-bicarbonate",
  "hcl",
  "ethyl-acetate",
];

// Bottle/Container SVG Components
const FlaskContainer = ({ color, liquidLevel, isSelected }: { color: string; liquidLevel: number; isSelected: boolean }) => (
  <svg viewBox="0 0 60 80" className="w-full h-full">
    {/* Flask neck */}
    <rect x="22" y="0" width="16" height="20" fill="hsl(40, 15%, 92%)" stroke="hsl(30, 10%, 75%)" strokeWidth="1" rx="2" />
    {/* Flask body */}
    <path d="M15 20 L22 20 L22 25 L10 55 Q8 60 12 65 L48 65 Q52 60 50 55 L38 25 L38 20 L45 20" fill="hsl(40, 15%, 94%)" stroke="hsl(30, 10%, 70%)" strokeWidth="1.5" />
    {/* Liquid */}
    <clipPath id="flask-clip">
      <path d="M10 55 Q8 60 12 65 L48 65 Q52 60 50 55 L38 25 L22 25 Z" />
    </clipPath>
    <rect x="8" y={65 - (liquidLevel * 0.4)} width="44" height={liquidLevel * 0.4} fill={color} clipPath="url(#flask-clip)" opacity="0.85" />
    {/* Highlight */}
    <ellipse cx="20" cy="50" rx="4" ry="8" fill="white" opacity="0.3" />
    {isSelected && <circle cx="30" cy="45" r="12" fill="#39C6D6" opacity="0.9" />}
    {isSelected && <path d="M24 45 L28 49 L36 41" stroke="#0B1116" strokeWidth="2.5" fill="none" />}
  </svg>
);

const BottleContainer = ({ color, liquidLevel, isSelected }: { color: string; liquidLevel: number; isSelected: boolean }) => (
  <svg viewBox="0 0 50 80" className="w-full h-full">
    {/* Cap */}
    <rect x="17" y="0" width="16" height="8" fill="hsl(25, 30%, 35%)" rx="2" />
    {/* Neck */}
    <rect x="19" y="8" width="12" height="12" fill="hsl(40, 12%, 93%)" stroke="hsl(30, 10%, 75%)" strokeWidth="1" />
    {/* Body */}
    <rect x="8" y="20" width="34" height="55" fill="hsl(40, 12%, 94%)" stroke="hsl(30, 10%, 70%)" strokeWidth="1.5" rx="4" />
    {/* Liquid */}
    <rect x="10" y={75 - (liquidLevel * 0.52)} width="30" height={liquidLevel * 0.52} fill={color} rx="2" opacity="0.85" />
    {/* Label area */}
    <rect x="12" y="30" width="26" height="18" fill="hsl(40, 20%, 97%)" stroke="hsl(30, 15%, 80%)" strokeWidth="0.5" rx="1" />
    {/* Highlight */}
    <rect x="12" y="55" width="4" height="15" fill="white" opacity="0.25" rx="1" />
    {isSelected && <circle cx="25" cy="55" r="10" fill="#39C6D6" opacity="0.9" />}
    {isSelected && <path d="M20 55 L23 58 L30 51" stroke="#0B1116" strokeWidth="2" fill="none" />}
  </svg>
);

const JarContainer = ({ color, liquidLevel, isSelected }: { color: string; liquidLevel: number; isSelected: boolean }) => (
  <svg viewBox="0 0 55 70" className="w-full h-full">
    {/* Lid */}
    <rect x="5" y="0" width="45" height="10" fill="hsl(25, 25%, 40%)" rx="3" />
    {/* Body */}
    <rect x="8" y="10" width="39" height="55" fill="hsl(40, 12%, 94%)" stroke="hsl(30, 10%, 70%)" strokeWidth="1.5" rx="5" />
    {/* Contents (powder/solid look) */}
    <rect x="10" y={65 - (liquidLevel * 0.52)} width="35" height={liquidLevel * 0.52} fill={color} rx="3" opacity="0.9" />
    {/* Texture for powder */}
    <circle cx="18" cy="55" r="2" fill="white" opacity="0.15" />
    <circle cx="28" cy="58" r="1.5" fill="white" opacity="0.1" />
    <circle cx="38" cy="54" r="2" fill="white" opacity="0.12" />
    {/* Label */}
    <rect x="15" y="22" width="25" height="14" fill="hsl(40, 20%, 97%)" stroke="hsl(30, 15%, 80%)" strokeWidth="0.5" rx="1" />
    {isSelected && <circle cx="27.5" cy="48" r="10" fill="#39C6D6" opacity="0.9" />}
    {isSelected && <path d="M22.5 48 L25.5 51 L32.5 44" stroke="#0B1116" strokeWidth="2" fill="none" />}
  </svg>
);

const ReagentBottle = ({ color, liquidLevel, isSelected }: { color: string; liquidLevel: number; isSelected: boolean }) => (
  <svg viewBox="0 0 40 85" className="w-full h-full">
    {/* Dropper cap */}
    <rect x="14" y="0" width="12" height="6" fill="hsl(0, 0%, 20%)" rx="1" />
    {/* Dropper bulb */}
    <ellipse cx="20" cy="10" rx="8" ry="6" fill="hsl(0, 0%, 25%)" />
    {/* Neck */}
    <rect x="16" y="16" width="8" height="10" fill="hsl(35, 60%, 45%)" stroke="hsl(30, 50%, 35%)" strokeWidth="0.5" />
    {/* Body */}
    <rect x="6" y="26" width="28" height="54" fill="hsl(35, 60%, 50%)" stroke="hsl(30, 50%, 35%)" strokeWidth="1" rx="2" />
    {/* Liquid inside (visible through amber) */}
    <rect x="8" y={80 - (liquidLevel * 0.52)} width="24" height={liquidLevel * 0.52} fill={color} rx="1" opacity="0.6" />
    {/* Label */}
    <rect x="10" y="35" width="20" height="20" fill="hsl(40, 20%, 97%)" stroke="hsl(30, 15%, 75%)" strokeWidth="0.5" rx="1" />
    {/* Hazard symbol placeholder */}
    <polygon points="20,40 15,48 25,48" fill="hsl(45, 90%, 55%)" stroke="hsl(30, 80%, 30%)" strokeWidth="0.5" />
    {isSelected && <circle cx="20" cy="62" r="9" fill="#39C6D6" opacity="0.9" />}
    {isSelected && <path d="M15 62 L18 65 L25 58" stroke="#0B1116" strokeWidth="2" fill="none" />}
  </svg>
);

const ChemicalShelf = ({
  onComplete,
  onNavigate,
  selectedChemicals,
  setSelectedChemicals,
}: ChemicalShelfProps) => {
  const [activeChemical, setActiveChemical] = useState<Chemical | null>(null);
  const [showWarning, setShowWarning] = useState<string | null>(null);

  const handleChemicalClick = (chemical: Chemical) => {
    if (selectedChemicals.includes(chemical.id)) {
      return;
    }

    const expectedNext = correctOrder[selectedChemicals.length];
    
    if (chemical.id === expectedNext) {
      setSelectedChemicals([...selectedChemicals, chemical.id]);
      setShowWarning(null);
    } else {
      setShowWarning(
        `Consider the order of operations! ${chemical.name} is typically added later in the process.`
      );
      setTimeout(() => setShowWarning(null), 3000);
    }
  };

  const isComplete = selectedChemicals.length === correctOrder.length;

  const renderContainer = (chemical: Chemical, isSelected: boolean) => {
    const props = { color: chemical.color, liquidLevel: chemical.liquidLevel, isSelected };
    switch (chemical.containerType) {
      case "flask": return <FlaskContainer {...props} />;
      case "bottle": return <BottleContainer {...props} />;
      case "jar": return <JarContainer {...props} />;
      case "reagent": return <ReagentBottle {...props} />;
      default: return <BottleContainer {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1116] relative">
      <LabNavigation currentSection="chemicals" onNavigate={onNavigate} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#EAF6F7] mb-2 high-contrast-text">
            Chemical Reagents & Apparatus
          </h1>
          <p className="text-[#B7C9CC] text-sm">
            Select chemicals in the correct order for the synthesis
          </p>
          
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-2 w-40 bg-[#162A31] rounded-full overflow-hidden border border-[#1E3A40]">
              <motion.div
                className="h-full bg-gradient-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(selectedChemicals.length / correctOrder.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-[#7A8E93]">
              {selectedChemicals.length}/{correctOrder.length}
            </span>
          </div>
        </motion.div>

        {/* Warning Toast */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-card border border-[#FFA500]/30 rounded-xl p-4 flex items-center gap-3 shadow-glow-accent"
            >
              <AlertTriangle className="w-5 h-5 text-[#FFA500]" />
              <span className="text-sm text-[#EAF6F7]">{showWarning}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shelf Background with Chemicals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-xl overflow-hidden mb-8 glass-section border border-[#1E3A40]"
        >
          {/* Shelf boards */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[32%] left-0 right-0 h-2 bg-gradient-to-b from-[#1E3A40]/80 to-[#162A31]/90 shadow-lg" />
            <div className="absolute top-[64%] left-0 right-0 h-2 bg-gradient-to-b from-[#1E3A40]/80 to-[#162A31]/90 shadow-lg" />
          </div>

          {/* Chemical Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-4 p-4 md:p-6 relative z-10">
            {chemicals.map((chemical, index) => {
              const isSelected = selectedChemicals.includes(chemical.id);
              const expectedNext = correctOrder[selectedChemicals.length];
              const isNext = chemical.id === expectedNext;
              
              return (
                <motion.div
                  key={chemical.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`chemical-container p-2 md:p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#39C6D6]/20 ring-2 ring-[#39C6D6]/50 glow-primary"
                      : isNext
                      ? "bg-[#6E4BD8]/10 ring-2 ring-[#6E4BD8]/30 hover:ring-[#6E4BD8]/60 neon-hover"
                      : "bg-[#162A31]/30 hover:bg-[#162A31]/50 border border-[#1E3A40]/30 hover:border-[#39C6D6]/30"
                  }`}
                  onClick={() => handleChemicalClick(chemical)}
                  onMouseEnter={() => setActiveChemical(chemical)}
                  onMouseLeave={() => setActiveChemical(null)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {/* Container Visual */}
                  <div className="relative mx-auto w-12 h-16 md:w-14 md:h-20 mb-2">
                    {renderContainer(chemical, isSelected)}
                    
                    {/* Safety indicator */}
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-[#1E3A40] ${
                        chemical.safetyLevel === "danger"
                          ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                          : chemical.safetyLevel === "caution"
                          ? "bg-[#FFA500] shadow-[0_0_8px_rgba(255,165,0,0.6)]"
                          : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      }`}
                    />
                  </div>

                  {/* Chemical Name */}
                  <h3 className="text-[10px] md:text-xs font-medium text-[#EAF6F7] text-center line-clamp-2 leading-tight">
                    {chemical.name}
                  </h3>
                  {chemical.formula && (
                    <p className="text-[9px] md:text-[10px] text-center mt-0.5 text-[#B7C9CC]">
                      {chemical.formula}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Chemical Info Panel */}
        <AnimatePresence>
          {activeChemical && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 glass-card border border-[#1E3A40] rounded-xl p-5 max-w-md w-[90%] shadow-glow-primary"
            >
              <div className="flex items-start gap-4">
                <Info className="w-5 h-5 text-[#6E4BD8] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#EAF6F7] mb-1">
                    {activeChemical.name}
                    {activeChemical.formula && (
                      <span className="ml-2 text-[#B7C9CC] font-normal">
                        ({activeChemical.formula})
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-[#B7C9CC] mb-2">
                    {activeChemical.role}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                      activeChemical.safetyLevel === "danger"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : activeChemical.safetyLevel === "caution"
                        ? "bg-[#FFA500]/10 text-[#FFA500] border border-[#FFA500]/20"
                        : "bg-green-500/10 text-green-400 border border-green-500/20"
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {activeChemical.safetyNote}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        >
          <Button
            onClick={onComplete}
            disabled={!isComplete}
            size="lg"
            className={`px-6 py-5 text-base font-semibold rounded-xl transition-all duration-300 ${
              isComplete
                ? "btn-glow bg-gradient-primary text-[#0B1116] shadow-glow-primary hover:scale-105"
                : "bg-[#162A31] text-[#7A8E93] border border-[#1E3A40] cursor-not-allowed"
            }`}
          >
            <FlaskConical className="w-4 h-4 mr-2" />
            {isComplete ? "Begin Experiment" : "Select All Chemicals"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChemicalShelf;
