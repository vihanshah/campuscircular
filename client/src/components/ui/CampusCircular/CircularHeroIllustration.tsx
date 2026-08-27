import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Laptop, 
  Camera, 
  BookOpen, 
  Music, 
  Tv, 
  RefreshCw, 
  Share2,
  Repeat,
  HeartHandshake
} from "lucide-react";
import { BRAND_COLORS } from "@/lib/theme";

interface ResourceNode {
  id: string;
  name: string;
  category: string;
  owner: string;
  borrower: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  textColor: string;
  xPct: number;
  yPct: number;
  rotation: number;
  stage: "SHARE" | "BORROW" | "RETURN" | "REUSE";
  subtitle: string;
}

const CIRCULATING_ITEMS: ResourceNode[] = [
  {
    id: "camera",
    name: "Sony Alpha 4K",
    category: "Creative",
    owner: "Maya (Film)",
    borrower: "Leo (Design)",
    icon: Camera,
    bgColor: "#FFD928", // Vibrant Yellow
    textColor: "#151515",
    xPct: 8,
    yPct: 16,
    rotation: -3,
    stage: "BORROW",
    subtitle: "4K Lens kit included",
  },
  {
    id: "laptop",
    name: "MacBook Pro M2",
    category: "Tech",
    owner: "Dev (CS '25)",
    borrower: "Aria (Data)",
    icon: Laptop,
    bgColor: "#B92CFF", // Vibrant Purple
    textColor: "#FFFDF7",
    xPct: 66,
    yPct: 10,
    rotation: 3,
    stage: "SHARE",
    subtitle: "16GB M2 · 1TB SSD",
  },
  {
    id: "guitar",
    name: "Yamaha Acoustic",
    category: "Music",
    owner: "Alex (Film)",
    borrower: "Ananya (Design)",
    icon: Music,
    bgColor: "#FF6755", // Coral
    textColor: "#FFFDF7",
    xPct: 72,
    yPct: 62,
    rotation: -4,
    stage: "RETURN",
    subtitle: "Padded gig bag",
  },
  {
    id: "books",
    name: "AI & ML Texts",
    category: "Academic",
    owner: "Sarah (Math)",
    borrower: "Ken (Robotics)",
    icon: BookOpen,
    bgColor: "#CDEFEA", // Mint
    textColor: "#151515",
    xPct: 12,
    yPct: 66,
    rotation: 2,
    stage: "REUSE",
    subtitle: "3 Textbook volumes",
  },
  {
    id: "projector",
    name: "HD Projector",
    category: "Events",
    owner: "Club Exec",
    borrower: "Film Guild",
    icon: Tv,
    bgColor: "#D8FF32", // Lime
    textColor: "#151515",
    xPct: 42,
    yPct: 82,
    rotation: -2,
    stage: "BORROW",
    subtitle: "1080p · Portable tripod",
  },
];

const STAGES = [
  { id: "SHARE", label: "Share", icon: Share2, desc: "List unneeded gear", color: "#FFD928" },
  { id: "BORROW", label: "Borrow", icon: HeartHandshake, desc: "Reserve instantly", color: "#B92CFF" },
  { id: "RETURN", label: "Return", icon: RefreshCw, desc: "Easy campus drop-off", color: "#CDEFEA" },
  { id: "REUSE", label: "Reuse", icon: Repeat, desc: "Keep gear in motion", color: "#D8FF32" },
] as const;

export const CircularHeroIllustration: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!hoveredItemId) {
        setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
      }
    }, 3800);
    return () => clearInterval(timer);
  }, [hoveredItemId]);

  const activeStage = STAGES[activeStageIndex];

  return (
    <div className="relative w-full aspect-[4/3.1] max-w-xl mx-auto flex items-center justify-center p-2 sm:p-4 select-none">
      
      {/* Background Soft Organic Radial Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 6, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 -left-8 w-64 h-64 rounded-full bg-[#FFD928]/15 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -6, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 -right-8 w-72 h-72 rounded-full bg-[#B92CFF]/15 blur-3xl"
        />

        {/* Central Circular Plate */}
        <div className="w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] rounded-full border border-[#151515]/08 bg-[#FFFDF7]/70 backdrop-blur-md flex items-center justify-center shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)]" />
      </div>

      {/* Circulation Orbit SVG Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 400" fill="none">
        <ellipse
          cx="250"
          cy="200"
          rx="185"
          ry="135"
          stroke="#151515"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          opacity="0.15"
        />

        <motion.circle
          r="5"
          fill="#B92CFF"
          animate={{
            cx: [65, 250, 435, 250, 65],
            cy: [200, 65, 200, 335, 200],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      {/* Center Classo-Style Core Card */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          key={activeStage.id}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-3 relative group"
        >
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 transition-transform duration-300 group-hover:scale-110 shadow-xs"
            style={{ 
              backgroundColor: activeStage.color,
              color: activeStage.id === "BORROW" ? "#FFFDF7" : "#151515"
            }}
          >
            <activeStage.icon className="w-5 h-5" />
          </div>

          <span className="text-xs font-black uppercase tracking-wider text-[#151515]">
            {activeStage.label}
          </span>
          <span className="text-[10px] text-[#151515]/60 font-medium leading-tight mt-0.5 max-w-[100px]">
            {activeStage.desc}
          </span>
        </motion.div>

        {/* Stage Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-4 bg-[#FFFDF7] border border-[#151515]/10 px-3 py-1 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[#151515] text-[#FFFDF7]"
                      : "text-[#151515]/50 hover:text-[#151515]"
                  }`}
                >
                  {s.label}
                </button>
                {idx < STAGES.length - 1 && (
                  <span className="text-[9px] text-[#151515]/30 font-bold">·</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Floating Classo-Style Organic Resource Cards */}
      {CIRCULATING_ITEMS.map((item, index) => {
        const IconComp = item.icon;
        const isHovered = hoveredItemId === item.id;
        const isCurrentStageItem = item.stage === activeStage.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: [0, -5, 0],
              rotate: item.rotation,
            }}
            transition={{
              y: {
                duration: 3.5 + index * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { duration: 0.4 },
            }}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
            className="absolute z-20 cursor-pointer"
            style={{
              left: `${item.xPct}%`,
              top: `${item.yPct}%`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.06, zIndex: 30 }}
              whileTap={{ scale: 0.96 }}
              className={`p-3.5 rounded-2xl border border-[#151515]/08 shadow-[0_10px_28px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 min-w-[140px] sm:min-w-[155px] ${
                isCurrentStageItem || isHovered
                  ? "ring-2 ring-[#151515]/20 shadow-[0_14px_36px_-4px_rgba(0,0,0,0.12)] -translate-y-1"
                  : ""
              }`}
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-black/10 backdrop-blur-sm">
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-full">
                  {item.stage}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-black tracking-tight leading-snug">
                  {item.name}
                </span>
                <span className="text-[10px] font-medium opacity-80 mt-0.5">
                  {item.owner}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-2 left-2 z-20 bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_6px_20px_rgba(0,0,0,0.05)] px-3.5 py-1.5 rounded-full flex items-center gap-2"
      >
        <div className="w-4.5 h-4.5 rounded-full bg-[#FFD928] flex items-center justify-center text-[10px] font-black text-[#151515]">
          ✓
        </div>
        <span className="text-[11px] font-bold text-[#151515] tracking-tight">
          Verified Student Circle
        </span>
      </motion.div>

    </div>
  );
};

export default CircularHeroIllustration;
