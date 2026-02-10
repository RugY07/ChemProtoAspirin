import { motion } from "framer-motion";
import { FlaskConical, Beaker, Users, GraduationCap, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  onEnterLab: () => void;
}

const HomePage = ({ onEnterLab }: HomePageProps) => {
  const teamMembers = [
    "Rugweda Yende",
    "Amayara Gani",
    "Samruddhi Patil",
    "Divya Kadam",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ 
                filter: [
                  "drop-shadow(0 0 10px rgba(57, 198, 214, 0.5))",
                  "drop-shadow(0 0 20px rgba(57, 198, 214, 0.8))",
                  "drop-shadow(0 0 10px rgba(57, 198, 214, 0.5))",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FlaskConical className="w-10 h-10 text-[#39C6D6]" />
            </motion.div>
            <motion.div
              animate={{ 
                filter: [
                  "drop-shadow(0 0 8px rgba(110, 75, 216, 0.5))",
                  "drop-shadow(0 0 16px rgba(110, 75, 216, 0.8))",
                  "drop-shadow(0 0 8px rgba(110, 75, 216, 0.5))",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Beaker className="w-8 h-8 text-[#6E4BD8]" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#EAF6F7] mb-3 leading-tight high-contrast-text">
            Preparation of{" "}
            <span className="text-gradient-primary">Aspirin</span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-[#B7C9CC] mb-2">
            (Acetylsalicylic Acid)
          </h2>
          
          <p className="text-base md:text-lg text-[#39C6D6] font-medium">
            Virtual Chemical Prototyping Lab
          </p>
        </motion.div>

        {/* Objective Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6 md:p-7 max-w-xl mb-8"
        >
          <h3 className="text-xs uppercase tracking-wider text-[#7A8E93] mb-2">
            Objective
          </h3>
          <p className="text-base text-[#EAF6F7] leading-relaxed">
            To study the synthesis of aspirin through interactive visualization
            and controlled experimental decisions.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            onClick={onEnterLab}
            size="lg"
            className="btn-glow bg-gradient-primary text-[#0B1116] px-8 py-5 text-base font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-glow-primary"
          >
            <FlaskConical className="w-4 h-4 mr-2" />
            Enter Virtual Lab
          </Button>
        </motion.div>

        {/* Guide Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 glass-card p-5 max-w-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6E4BD8]/20 flex items-center justify-center border border-[#6E4BD8]/30">
              <GraduationCap className="w-5 h-5 text-[#6E4BD8]" />
            </div>
            <div>
              <p className="text-xs text-[#7A8E93] uppercase tracking-wide">Project Guide</p>
              <p className="font-semibold text-[#EAF6F7]">Dr. Abhijeet Patil</p>
            </div>
          </div>
        </motion.div>

        {/* Team Section with Photo Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 glass-card p-6 md:p-7 max-w-lg"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#39C6D6]/20 flex items-center justify-center border border-[#39C6D6]/30">
              <Users className="w-5 h-5 text-[#39C6D6]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#EAF6F7]">Research Team</h3>
              <p className="text-xs text-[#7A8E93]">
                Department of Chemistry
              </p>
            </div>
          </div>

          {/* Group Photo Placeholder */}
          <div className="mb-5 rounded-xl bg-[#162A31] border-2 border-dashed border-[#1E3A40] aspect-[4/3] flex flex-col items-center justify-center">
            <ImageIcon className="w-10 h-10 text-[#7A8E93]/50 mb-2" />
            <p className="text-sm text-[#B7C9CC]">Group Photo</p>
            <p className="text-xs text-[#7A8E93]">Add image manually</p>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-2 gap-2">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="text-sm text-[#EAF6F7] bg-[#101C22]/60 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-[#1E3A40]/50 hover:border-[#39C6D6]/30 transition-all duration-300"
              >
                {member}
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-[#7A8E93] mt-5 pt-4 border-t border-[#1E3A40] text-center">
            MIT Academy of Engineering, Alandi, Pune
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
