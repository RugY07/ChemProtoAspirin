import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LabSetupProps {
  stepId: number;
  animation: string;
  decisions: Record<string, string>;
}

const LabSetup = ({ stepId, animation, decisions }: LabSetupProps) => {
  const [liquidLevel, setLiquidLevel] = useState(0);
  const [showSteam, setShowSteam] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [showCrystals, setShowCrystals] = useState(false);
  const [isHeating, setIsHeating] = useState(false);
  const [liquidColor, setLiquidColor] = useState("hsl(200, 70%, 85%)");

  useEffect(() => {
    // Reset animations
    setShowSteam(false);
    setShowBubbles(false);
    setShowCrystals(false);
    setIsHeating(false);

    // Step-specific animations
    switch (stepId) {
      case 1:
        setLiquidLevel(30);
        setTimeout(() => setLiquidLevel(50), 1000);
        setTimeout(() => setLiquidLevel(60), 2000);
        setLiquidColor("hsl(200, 70%, 85%)");
        break;
      case 2:
        setLiquidLevel(60);
        setIsHeating(true);
        setShowSteam(true);
        setLiquidColor(decisions.heating === "high" ? "hsl(30, 80%, 70%)" : "hsl(180, 60%, 80%)");
        break;
      case 3:
        setLiquidLevel(70);
        setShowBubbles(true);
        setLiquidColor("hsl(190, 50%, 85%)");
        break;
      case 4:
        setLiquidLevel(65);
        setShowCrystals(true);
        setLiquidColor("hsl(200, 40%, 90%)");
        break;
      case 5:
        setLiquidLevel(70);
        setShowBubbles(true);
        setLiquidColor("hsl(180, 60%, 85%)");
        break;
      case 6:
        setLiquidLevel(20);
        setShowCrystals(true);
        setLiquidColor("hsl(0, 0%, 98%)");
        break;
    }
  }, [stepId, decisions]);

  return (
    <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
      {/* Lab Table */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-lab-table rounded-t-lg" />

      {/* Heating Element (Steps 2, 4) */}
      {(stepId === 2 || stepId === 4) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-10 rounded-lg ${
            isHeating ? "heating-element active" : ""
          }`}
          style={{
            background: isHeating
              ? "linear-gradient(to top, hsl(15, 90%, 50%), hsl(30, 90%, 60%))"
              : "hsl(var(--lab-metal))",
            transform: 'translateX(-50%)',
            boxShadow: isHeating ? '0 0 20px rgba(255, 100, 50, 0.6)' : 'none',
          }}
        />
      )}

      {/* Ice Bath (Step 4) */}
      {stepId === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-16 left-1/2 w-56 h-28 ice-effect rounded-xl border-[3px] border-[#39C6D6]/60 shadow-glow-primary"
          style={{ transform: 'translateX(-50%)' }}
        >
          {/* Ice cubes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="absolute w-6 h-6 bg-white/60 rounded-sm"
              style={{
                left: `${15 + i * 18}%`,
                top: `${30 + (i % 2) * 20}%`,
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Filtration Setup (Step 6) */}
      {stepId === 6 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Funnel */}
          <div className="relative">
            <svg width="120" height="100" viewBox="0 0 120 100">
              <path
                d="M10 10 L60 80 L110 10"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="3"
              />
              <path
                d="M12 12 L60 75 L108 12"
                fill="hsl(var(--lab-glass))"
                opacity="0.8"
              />
              {/* Filter paper */}
              <path
                d="M20 20 L60 65 L100 20"
                fill="hsl(40, 30%, 93%)"
                className="filter-paper"
              />
            </svg>
            
            {/* Dripping liquid */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-2 rounded-full bg-lab-clear drip"
              style={{ animationDelay: "0s" }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-2 rounded-full bg-lab-clear drip"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Collection flask */}
          <div className="absolute -bottom-24 left-1/2" style={{ transform: 'translateX(-50%)' }}>
            <div className="lab-container w-28 h-20 border-[3px] border-[#39C6D6]/40 shadow-glow-primary">
              <motion.div
                className="liquid rounded-b-2xl"
                style={{ backgroundColor: "hsl(200, 60%, 90%)" }}
                initial={{ height: 0 }}
                animate={{ height: "30%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </div>
          </div>

          {/* Crystals on filter */}
          {showCrystals && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="absolute w-3 h-3 bg-white rounded-sm shadow-lg"
                  style={{
                    left: `${-15 + (i % 4) * 10}px`,
                    top: `${(Math.floor(i / 4)) * 8}px`,
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        /* Main Flask */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="lab-container w-48 h-60 lab-glow border-[4px] border-[#39C6D6]/40 shadow-glow-primary">
            {/* Liquid */}
            <motion.div
              className="liquid rounded-b-3xl"
              style={{ backgroundColor: liquidColor }}
              initial={{ height: 0 }}
              animate={{ height: `${liquidLevel}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Bubbles */}
              {showBubbles && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bubble bg-white/60"
                      style={{
                        width: 6 + Math.random() * 6,
                        height: 6 + Math.random() * 6,
                        left: `${20 + i * 15}%`,
                        bottom: `${10 + i * 5}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </>
              )}

              {/* Crystals */}
              {showCrystals && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="crystal bg-white/90 shadow-lg"
                      style={{
                        width: 5 + Math.random() * 6,
                        height: 5 + Math.random() * 6,
                        left: `${15 + i * 12}%`,
                        bottom: `${5 + (i % 3) * 8}%`,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {/* Steam */}
            {showSteam && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-16 steam opacity-60" />
            )}

            {/* Stirring indicator */}
            {(stepId === 1 || stepId === 5) && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-dashed border-[#39C6D6]/50 rounded-full"
              />
            )}
          </div>

          {/* Flask neck */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-8 bg-[#162A31]/80 backdrop-blur-sm border-[3px] border-[#39C6D6]/50 rounded-t-lg shadow-glow-primary" />
        </motion.div>
      )}

      {/* Step Labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 left-0 right-0 text-center"
      >
        <p className="text-base font-medium text-[#EAF6F7] high-contrast-text">
          {stepId === 1 && "Adding reactants..."}
          {stepId === 2 && "Heating mixture..."}
          {stepId === 3 && "Adding water and acid..."}
          {stepId === 4 && "Cooling for crystallization..."}
          {stepId === 5 && "Neutralizing and purifying..."}
          {stepId === 6 && "Filtering pure product..."}
        </p>
      </motion.div>
    </div>
  );
};

export default LabSetup;
