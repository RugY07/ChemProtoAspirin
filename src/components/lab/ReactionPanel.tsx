import { motion } from "framer-motion";
import { AlertTriangle, Beaker, ThermometerSun, Droplets, Sparkles, FlaskConical, Filter } from "lucide-react";

interface ReactionPanelProps {
  currentStep: number;
  decisions: Record<string, string>;
  stepCompleted: boolean;
}

const stepInfo = [
  {
    equation: "C₇H₆O₃ + (CH₃CO)₂O → C₉H₈O₄ + CH₃COOH",
    reactants: "Salicylic Acid + Acetic Anhydride",
    products: "Aspirin + Acetic Acid",
    conditions: "H₂SO₄ catalyst, stirring",
    icon: Beaker,
  },
  {
    equation: "Esterification in progress",
    reactants: "Reaction mixture",
    products: "Forming acetyl ester bonds",
    conditions: "Controlled heating, 50-60°C",
    icon: ThermometerSun,
  },
  {
    equation: "Hydrolysis of excess anhydride",
    reactants: "Unreacted (CH₃CO)₂O + H₂O",
    products: "2 CH₃COOH (Acetic Acid)",
    conditions: "Slow addition, stirring",
    icon: Droplets,
  },
  {
    equation: "Crystallization",
    reactants: "Dissolved aspirin in solution",
    products: "Aspirin crystals (precipitate)",
    conditions: "Ice bath, 0-5°C",
    icon: Sparkles,
  },
  {
    equation: "NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑",
    reactants: "Sodium bicarbonate + Excess acid",
    products: "Sodium acetate + Water + CO₂",
    conditions: "Effervescence observed",
    icon: FlaskConical,
  },
  {
    equation: "Vacuum filtration",
    reactants: "Aspirin suspension",
    products: "Pure Aspirin crystals",
    conditions: "Filter paper, cold wash",
    icon: Filter,
  },
];

const ReactionPanel = ({ currentStep, decisions, stepCompleted }: ReactionPanelProps) => {
  const info = stepInfo[currentStep - 1];
  const Icon = info.icon;

  const getQualityIndicator = () => {
    const catalyst = decisions.catalyst;
    const heating = decisions.heating;

    if (catalyst === "optimal" && (heating === "optimal" || !heating)) {
      return { label: "Excellent", color: "text-success", bg: "bg-success/10" };
    } else if (catalyst === "optimal" || heating === "optimal") {
      return { label: "Good", color: "text-accent", bg: "bg-accent/10" };
    } else if (catalyst || heating) {
      return { label: "Fair", color: "text-warning", bg: "bg-warning/10" };
    }
    return null;
  };

  const quality = getQualityIndicator();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-xl p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary">
          <Icon className="w-5 h-5 text-[#0B1116]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#EAF6F7]">Reaction Status</h3>
          <p className="text-xs text-[#7A8E93]">Step {currentStep} of 6</p>
        </div>
      </div>

      {/* Chemical Equation */}
      <div className="bg-[#101C22]/60 backdrop-blur-sm rounded-xl p-4 mb-4 border border-[#1E3A40]">
        <p className="text-xs text-[#7A8E93] mb-1">Chemical Equation</p>
        <p className="text-sm font-mono text-[#EAF6F7] leading-relaxed">
          {info.equation}
        </p>
      </div>

      {/* Reactants & Products */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass-card rounded-xl p-3 border border-[#1E3A40]">
          <p className="text-xs text-[#7A8E93] mb-1">Reactants</p>
          <p className="text-sm text-[#EAF6F7]">{info.reactants}</p>
        </div>
        <div className="glass-card rounded-xl p-3 border border-[#1E3A40]">
          <p className="text-xs text-[#7A8E93] mb-1">Products</p>
          <p className="text-sm text-[#EAF6F7]">{info.products}</p>
        </div>
      </div>

      {/* Conditions */}
      <div className="glass-card rounded-xl p-3 border border-[#1E3A40] mb-4">
        <p className="text-xs text-[#7A8E93] mb-1">Conditions</p>
        <p className="text-sm text-[#EAF6F7]">{info.conditions}</p>
      </div>

      {/* Quality Indicator */}
      {quality && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-3 ${quality.bg} border border-current/20`}
        >
          <p className="text-xs text-muted-foreground mb-1">Expected Product Quality</p>
          <p className={`text-sm font-semibold ${quality.color}`}>{quality.label}</p>
        </motion.div>
      )}

      {/* Safety Warnings */}
      {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/30"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#FFA500]">Safety Notice</p>
              <p className="text-xs text-[#B7C9CC] mt-0.5">
                {currentStep === 1 && "Handle concentrated acids with care. Wear protective equipment."}
                {currentStep === 2 && "Maintain controlled heating. Avoid overheating."}
                {currentStep === 3 && "Add water slowly to prevent splashing."}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Completion indicator */}
      {stepCompleted && currentStep === 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 rounded-xl bg-success/10 border border-success/30 text-center success-glow"
        >
          <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="font-semibold text-green-400">Synthesis Complete!</p>
          <p className="text-xs text-[#B7C9CC] mt-1">
            Aspirin (Acetylsalicylic Acid) obtained successfully
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReactionPanel;
