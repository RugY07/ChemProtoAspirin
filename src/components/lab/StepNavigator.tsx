import { motion } from "framer-motion";
import { CheckCircle, Lock } from "lucide-react";
import { Step } from "./ProcessVisualization";

interface StepNavigatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number;
  onStepClick: (index: number) => void;
}

const StepNavigator = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: StepNavigatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-xl p-5"
    >
      <h2 className="text-lg font-semibold text-[#EAF6F7] mb-4">
        Experiment Steps
      </h2>

      <div className="space-y-1">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLocked = index > currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(index)}
              disabled={isLocked}
              className={`w-full text-left step-item ${
                isActive ? "active" : ""
              } ${isCompleted ? "completed" : ""} ${
                isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="step-dot">
                {isCompleted ? (
                  <CheckCircle className="w-3 h-3 text-[#0B1116]" />
                ) : isLocked ? (
                  <Lock className="w-2 h-2 text-[#7A8E93]" />
                ) : null}
              </div>

              <div>
                <motion.p
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#39C6D6]"
                      : isCompleted
                      ? "text-green-400"
                      : "text-[#7A8E93]"
                  }`}
                >
                  Step {step.id}
                </motion.p>
                <p
                  className={`text-xs ${
                    isActive ? "text-[#EAF6F7]" : "text-[#7A8E93]"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mt-6 pt-4 border-t border-[#1E3A40]">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[#7A8E93]">Progress</span>
          <span className="font-medium text-[#EAF6F7]">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-[#162A31] rounded-full overflow-hidden border border-[#1E3A40]">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StepNavigator;
