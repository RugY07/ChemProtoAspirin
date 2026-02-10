import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "@/components/lab/HomePage";
import ChemicalShelf from "@/components/lab/ChemicalShelf";
import ProcessVisualization from "@/components/lab/ProcessVisualization";
import BlockDiagram from "@/components/lab/BlockDiagram";
import AdvantagesDisadvantages from "@/components/lab/AdvantagesDisadvantages";
import Conclusion from "@/components/lab/Conclusion";
import LabBackground from "@/components/lab/LabBackground";

export type LabSection = "home" | "chemicals" | "process" | "diagrams" | "advantages" | "conclusion";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<LabSection>("home");
  const [experimentState, setExperimentState] = useState({
    selectedChemicals: [] as string[],
    currentStep: 0,
    decisions: {} as Record<string, string>,
    completed: false,
  });

  const handleEnterLab = () => {
    setCurrentSection("chemicals");
  };

  const handleChemicalsComplete = () => {
    setCurrentSection("process");
  };

  const handleProcessComplete = () => {
    setExperimentState(prev => ({ ...prev, completed: true }));
    setCurrentSection("diagrams");
  };

  const handleNavigate = (section: LabSection) => {
    setCurrentSection(section);
  };

  return (
    <div className="min-h-screen dark relative">
      {/* Persistent Background for all pages */}
      <LabBackground />
      
      <div className="relative z-0">
        <AnimatePresence mode="wait">
          {currentSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <HomePage onEnterLab={handleEnterLab} />
            </motion.div>
          )}

          {currentSection === "chemicals" && (
            <motion.div
              key="chemicals"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
            <ChemicalShelf
              onComplete={handleChemicalsComplete}
              onNavigate={handleNavigate}
              selectedChemicals={experimentState.selectedChemicals}
              setSelectedChemicals={(chemicals) =>
                setExperimentState((prev) => ({ ...prev, selectedChemicals: chemicals }))
              }
            />
          </motion.div>
        )}

          {currentSection === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
            <ProcessVisualization
              onComplete={handleProcessComplete}
              onNavigate={handleNavigate}
              experimentState={experimentState}
              setExperimentState={setExperimentState}
            />
          </motion.div>
        )}

          {currentSection === "diagrams" && (
            <motion.div
              key="diagrams"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <BlockDiagram onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentSection === "advantages" && (
            <motion.div
              key="advantages"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <AdvantagesDisadvantages onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentSection === "conclusion" && (
            <motion.div
              key="conclusion"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <Conclusion onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
