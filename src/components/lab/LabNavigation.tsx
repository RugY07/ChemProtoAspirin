import { motion } from "framer-motion";
import { Home, FlaskConical, Beaker, LayoutGrid, ThumbsUp, FileText } from "lucide-react";
import { LabSection } from "@/pages/Index";

interface LabNavigationProps {
  currentSection: LabSection;
  onNavigate: (section: LabSection) => void;
}

const navItems: { id: LabSection; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "chemicals", label: "Chemicals", icon: <Beaker className="w-4 h-4" /> },
  { id: "process", label: "Process", icon: <FlaskConical className="w-4 h-4" /> },
  { id: "diagrams", label: "Diagrams", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "advantages", label: "Analysis", icon: <ThumbsUp className="w-4 h-4" /> },
  { id: "conclusion", label: "Conclusion", icon: <FileText className="w-4 h-4" /> },
];

const LabNavigation = ({ currentSection, onNavigate }: LabNavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass-card border-b border-[#1E3A40]"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                filter: [
                  "drop-shadow(0 0 8px rgba(57, 198, 214, 0.6))",
                  "drop-shadow(0 0 12px rgba(57, 198, 214, 0.8))",
                  "drop-shadow(0 0 8px rgba(57, 198, 214, 0.6))",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FlaskConical className="w-5 h-5 text-[#39C6D6]" />
            </motion.div>
            <span className="font-semibold text-[#EAF6F7] text-sm hidden sm:inline">
              Virtual Lab
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-0.5 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#39C6D6] bg-[#39C6D6]/10 border border-[#39C6D6]/30 glow-primary"
                      : "text-[#7A8E93] hover:text-[#EAF6F7] hover:bg-[#162A31]/50 border border-transparent hover:border-[#1E3A40]"
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default LabNavigation;
