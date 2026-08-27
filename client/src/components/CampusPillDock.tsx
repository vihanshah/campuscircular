import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Laptop, Camera, BookOpen, Music, Tv, MessageCircle, Plus, Lock } from "lucide-react";

export const CampusPillDock: React.FC = () => {
  const [, setLocation] = useLocation();

  const dockItems = [
    { label: "Tech", icon: Laptop, color: "#FFD928", category: "Electronics" },
    { label: "Creative", icon: Camera, color: "#B92CFF", category: "Photography" },
    { label: "Academic", icon: BookOpen, color: "#CDEFEA", category: "Books" },
    { label: "Music", icon: Music, color: "#FF6755", category: "Music" },
    { label: "Events", icon: Tv, color: "#D8FF32", category: "Events" },
    { label: "Community", icon: MessageCircle, color: "#FFFDF7", category: "All" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-full px-4 pointer-events-auto">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0F0F14]/90 backdrop-blur-xl border border-white/15 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center gap-1.5 sm:gap-2"
      >
        {dockItems.map((item) => {
          const IconComp = item.icon;
          return (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocation(`/discover?category=${encodeURIComponent(item.category)}`)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors relative group cursor-pointer"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <IconComp className="w-4 h-4" style={{ color: item.color }} />
              
              {/* Tooltip */}
              <span className="absolute -top-9 px-2.5 py-1 rounded-md bg-[#FFFDF7] text-[#151515] text-[10px] font-black uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {item.label}
              </span>
            </motion.button>
          );
        })}

        <div className="w-px h-6 bg-white/15 mx-1" />

        {/* Add Gear Action Pill */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/items")}
          className="px-4 py-2 rounded-full bg-[#FFD928] text-[#151515] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share Gear</span>
        </motion.button>

        {/* Lock Security Badge */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xs">
          <Lock className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    </div>
  );
};

export default CampusPillDock;
