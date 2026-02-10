import { motion } from "framer-motion";
import chemBackground from "@/assets/chem_back1.jpg";

const LabBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Neuron Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${chemBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark Overlay for Readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#0B1116]/90 via-[#0B1116]/85 to-[#0B1116]/90"
      />

      {/* Subtle Neural Network Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 neural-pattern"
      />

      {/* Gradient Accent Overlays */}
      <div 
        className="absolute inset-0 gradient-overlay"
      />

      {/* Subtle Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11, 17, 22, 0.6) 100%)'
        }}
      />
    </div>
  );
};

export default LabBackground;
