import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowRight, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabSection } from "@/pages/Index";
import LabNavigation from "./LabNavigation";
import StepNavigator from "./StepNavigator";
import LabSetup from "./LabSetup";
import ReactionPanel from "./ReactionPanel";

interface ProcessVisualizationProps {
  onComplete: () => void;
  onNavigate: (section: LabSection) => void;
  experimentState: {
    selectedChemicals: string[];
    currentStep: number;
    decisions: Record<string, string>;
    completed: boolean;
  };
  setExperimentState: React.Dispatch<
    React.SetStateAction<{
      selectedChemicals: string[];
      currentStep: number;
      decisions: Record<string, string>;
      completed: boolean;
    }>
  >;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  decision?: {
    id: string;
    question: string;
    options: { value: string; label: string; effect: string }[];
  };
}

const steps: Step[] = [
  {
    id: 1,
    title: "Preparation of Reaction Mixture",
    description: "Add salicylic acid to acetic anhydride with catalyst",
    decision: {
      id: "catalyst",
      question: "Choose catalyst amount:",
      options: [
        { value: "less", label: "Less", effect: "Slower reaction, may be incomplete" },
        { value: "optimal", label: "Optimal", effect: "Ideal reaction conditions" },
        { value: "excess", label: "Excess", effect: "Side reactions, impurities" },
      ],
    },
  },
  {
    id: 2,
    title: "Heating and Esterification",
    description: "Heat the mixture to initiate esterification",
    decision: {
      id: "heating",
      question: "Choose heating level:",
      options: [
        { value: "low", label: "Low", effect: "Incomplete reaction" },
        { value: "optimal", label: "Optimal", effect: "Complete esterification" },
        { value: "high", label: "High", effect: "Product degradation risk" },
      ],
    },
  },
  {
    id: 3,
    title: "Addition of Water and Diluted HCl",
    description: "Add distilled water and diluted HCl carefully",
  },
  {
    id: 4,
    title: "Crystallization",
    description: "Cool the mixture to form aspirin crystals",
  },
  {
    id: 5,
    title: "Neutralization and Purification",
    description: "Neutralize excess acid with sodium bicarbonate",
  },
  {
    id: 6,
    title: "Filtration and Final Product",
    description: "Filter and collect pure aspirin crystals",
  },
];

const ProcessVisualization = ({
  onComplete,
  onNavigate,
  experimentState,
  setExperimentState,
}: ProcessVisualizationProps) => {
  const [currentAnimation, setCurrentAnimation] = useState<string>("idle");
  const [showWarning, setShowWarning] = useState<string | null>(null);
  const [stepCompleted, setStepCompleted] = useState(false);

  const currentStep = steps[experimentState.currentStep];
  const isLastStep = experimentState.currentStep === steps.length - 1;

  useEffect(() => {
    // Auto-play animation for current step
    setCurrentAnimation("playing");
    setStepCompleted(false);
    
    const timer = setTimeout(() => {
      setCurrentAnimation("complete");
      if (!currentStep.decision || experimentState.decisions[currentStep.decision.id]) {
        setStepCompleted(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [experimentState.currentStep]);

  const handleDecision = (decisionId: string, value: string, effect: string) => {
    setExperimentState((prev) => ({
      ...prev,
      decisions: { ...prev.decisions, [decisionId]: value },
    }));
    
    if (value !== "optimal") {
      setShowWarning(effect);
      setTimeout(() => setShowWarning(null), 3000);
    }
    
    setStepCompleted(true);
  };

  const handleNextStep = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setExperimentState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1116]">
      <LabNavigation currentSection="process" onNavigate={onNavigate} />

      {/* Warning Toast */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-card rounded-xl p-4 flex items-center gap-3 shadow-glow-accent border-[#FFA500]/30 border"
          >
            <AlertTriangle className="w-5 h-5 text-[#FFA500]" />
            <span className="text-sm text-[#EAF6F7]">{showWarning}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6 min-h-[calc(100vh-8rem)]">
          {/* Left Panel - Step Navigator */}
          <div className="lg:col-span-3">
            <StepNavigator
              steps={steps}
              currentStep={experimentState.currentStep}
              completedSteps={Object.keys(experimentState.decisions).length}
              onStepClick={(index) => {
                if (index <= experimentState.currentStep) {
                  setExperimentState((prev) => ({ ...prev, currentStep: index }));
                }
              }}
            />
          </div>

          {/* Center Panel - Lab Animation */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-8 h-full flex flex-col"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-[#EAF6F7] mb-6 high-contrast-text">
                {currentStep.title}
              </h2>
              
              <div className="flex-1 flex items-center justify-center">
                <LabSetup
                  stepId={currentStep.id}
                  animation={currentAnimation}
                  decisions={experimentState.decisions}
                />
              </div>

              {/* Decision UI */}
              {currentStep.decision && !experimentState.decisions[currentStep.decision.id] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-[#101C22]/60 backdrop-blur-sm rounded-xl border border-[#1E3A40]"
                >
                  <p className="text-base md:text-lg font-medium text-[#EAF6F7] mb-4">
                    {currentStep.decision.question}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.decision.options.map((option) => (
                      <Button
                        key={option.value}
                        variant={option.value === "optimal" ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          handleDecision(
                            currentStep.decision!.id,
                            option.value,
                            option.effect
                          )
                        }
                        className={option.value === "optimal" ? "bg-gradient-primary text-[#0B1116]" : ""}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Panel - Reaction Status */}
          <div className="lg:col-span-4">
            <ReactionPanel
              currentStep={currentStep.id}
              decisions={experimentState.decisions}
              stepCompleted={stepCompleted}
            />

            {/* Continue Button */}
            {stepCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-primary text-[#0B1116] py-6 text-lg font-semibold rounded-xl shadow-glow-primary hover:scale-105 transition-all duration-300"
                >
                  {isLastStep ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Experiment
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessVisualization;
