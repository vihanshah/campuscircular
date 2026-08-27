import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { RefreshCw, Sparkles, Share2, HeartHandshake, Repeat, ArrowRight, ShieldCheck } from "lucide-react";
import ColorBends from "@/components/ui/ColorBends";

const DYNAMIC_ACTIONS = [
  "Borrowing",
  "Sharing",
  "Returning",
  "Reusing",
  "Connecting",
  "Saving"
];

export function CampusHeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_ACTIONS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-8 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] border border-[#151515]/10 relative overflow-hidden">
      
      {/* Dynamic ColorBends Shader Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <ColorBends
          colors={["#FFD928", "#B92CFF", "#CDEFEA"]}
          rotation={-141}
          speed={0.2}
          scale={1.2}
          frequency={1.0}
          warpStrength={1.2}
          mouseInfluence={0.5}
          noise={0.05}
          parallax={0.3}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent={true}
          autoRotate={2}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        
        {/* Animated Classo-Style Circular Eco Badge */}
        <div className="relative shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center border border-[#151515]/10 relative overflow-hidden shadow-md cursor-pointer bg-[#FFD928]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-1 rounded-2xl border-2 border-dashed border-[#151515]/20"
            />
            
            <div className="w-10 h-10 rounded-2xl bg-[#151515] text-[#FFD928] flex items-center justify-center font-black text-xl z-10 shadow-xs">
              ♻
            </div>
          </motion.div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#151515] text-[#D8FF32] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase whitespace-nowrap z-20 shadow-xs">
            ★ CIRCLE ACTIVE
          </div>
        </div>

        {/* Center Welcome Copy */}
        <div className="flex-1 w-full text-center md:text-left">
          
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-[10px] font-black tracking-widest text-[#151515] bg-[#D8FF32] border border-[#151515]/15 px-2.5 py-0.5 rounded-full uppercase">
              CAMPUS CIRCLE · TERM 02
            </span>
            <span className="text-xs text-[#151515]/60 font-medium italic">
              Keep your campus moving
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] leading-tight flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>Good morning, Alex</span>
            <span className="inline-block relative overflow-hidden py-1 h-[1.3em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={DYNAMIC_ACTIONS[wordIndex]}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  className="italic text-[#B92CFF] inline-block font-serif"
                >
                  · {DYNAMIC_ACTIONS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-sm text-[#151515]/75 font-medium mt-1">
            Discover what you need. Share what you have. Keep useful resources in circulation.
          </p>

          {/* Circulation Flow Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase px-3 py-1 rounded-full bg-[#FFFDF7] border border-[#151515]/10 shadow-xs">
              <span className="text-[#151515]">SHARE</span>
              <span className="text-[#151515]/30">→</span>
              <span className="text-[#B92CFF]">BORROW</span>
              <span className="text-[#151515]/30">→</span>
              <span className="text-[#FF6755]">RETURN</span>
              <span className="text-[#151515]/30">→</span>
              <span className="text-[#3F6212]">REUSE</span>
            </div>

            {/* Target Progress Bar */}
            <div className="flex items-center gap-2 bg-[#FFFDF7]/90 backdrop-blur-sm border border-[#151515]/10 px-3 py-1 rounded-full shadow-xs">
              <span className="text-xs font-bold text-[#151515]">842 Exchanges</span>
              <div className="w-20 h-2 bg-[#F3EFE6] rounded-full overflow-hidden">
                <div className="h-full bg-[#B92CFF] w-[84%]" />
              </div>
            </div>
          </div>

        </div>

        {/* Desktop Circular Activity Counter */}
        <div className="hidden md:flex flex-col items-end shrink-0 pl-6 border-l border-[#151515]/10">
          <span className="text-[10px] font-black tracking-widest text-[#151515]/50 uppercase mb-1">
            SAVED THIS TERM
          </span>
          <div className="text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
            ₹4.5K
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-[#151515] bg-[#D8FF32] border border-[#151515]/15 px-3 py-0.5 rounded-full shadow-xs">
            <Sparkles className="w-3 h-3 text-[#151515]" />
            <span className="text-[10px] font-black tracking-wider uppercase">
              3 ACTIVE BORROWS
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
