import { useState } from "react";
import { CampusDeiHeader } from "@/components/CampusDeiHeader";
import { CampusDeiHero } from "@/components/CampusDeiHero";
import { CampusResourceNodes } from "@/components/CampusResourceNodes";
import { CampusQuickActions } from "@/components/CampusQuickActions";
import { CampusResourceGrid } from "@/components/CampusResourceGrid";
import { CampusEventsStack } from "@/components/CampusEventsStack";
import { CampusBorrowingActivity } from "@/components/CampusBorrowingActivity";
import { CampusImpactWidget } from "@/components/CampusImpactWidget";
import { CampusPillDock } from "@/components/CampusPillDock";
import { AppFooter } from "@/components/AppFooter";
import { MoodGate } from "@/components/MoodGate";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

export default function Home() {
  const [gateDone, setGateDone] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("mentebloom_gate_completed") === "true";
    } catch {
      return false;
    }
  });

  const handleGateComplete = () => {
    try {
      sessionStorage.setItem("mentebloom_gate_completed", "true");
    } catch {}
    setGateDone(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#151515] font-sans selection:bg-[#FFD928] selection:text-[#151515] relative pb-20">
      <AnimatePresence mode="wait">
        {!gateDone ? (
          <MoodGate key="gate" onComplete={handleGateComplete} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top Dei-Style Navigation */}
            <CampusDeiHeader />

            {/* Main Asymmetric Dashboard Layout */}
            <main className="container max-w-[1380px] mx-auto px-4 lg:px-8 pt-6 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                
                {/* LEFT COLUMN — Resource Hub & Circulation Pathway */}
                <div className="space-y-6">
                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusDeiHero />
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusResourceNodes />
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusQuickActions />
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusResourceGrid />
                  </motion.div>
                </div>

                {/* RIGHT COLUMN — Campus Schedule & Activity Panels */}
                <div className="space-y-6">
                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusEventsStack />
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusBorrowingActivity />
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible">
                    <CampusImpactWidget />
                  </motion.div>
                </div>

              </div>
            </main>

            {/* Bottom Floating Action Pill Dock */}
            <CampusPillDock />

            <AppFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
