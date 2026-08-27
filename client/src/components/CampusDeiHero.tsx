import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Camera, BookOpen, Music, ArrowRight, ShieldCheck, MapPin, Clock, X, Sparkles, Repeat } from "lucide-react";
import { getCurrentLoggedInUser, loadAppStore } from "@/lib/appStore";
import { SoftAurora } from "@/components/ui/SoftAurora";
import { CountUp } from "@/components/ui/CountUp";

interface CircleExchange {
  id: string;
  partnerName: string;
  partnerRole: string;
  partnerAvatar: string;
  avatarBg: string;
  item: string;
  action: "Borrowing" | "Returning" | "Sharing";
  status: string;
  location: string;
  time: string;
}

export const CampusDeiHero: React.FC = () => {
  const [, setLocation] = useLocation();
  const store = loadAppStore();
  const currentUser = getCurrentLoggedInUser();
  const firstName = currentUser.name.split(" ")[0] || "Student";
  const [isCircleModalOpen, setIsCircleModalOpen] = useState(false);

  // Derive unique, customized exchange details for each student ID
  const studentId = currentUser.id || currentUser.studentId || "CC1003";

  // Dynamic mapping per student account
  const studentConfigMap: Record<string, {
    partnerId: string;
    borrowItem: string;
    returnItem: string;
    shareItem: string;
    circlePartnerIds: [string, string, string];
  }> = {
    CC1001: {
      partnerId: "CC1004", // Priya Nair
      borrowItem: "Sony Alpha A7 IV 4K Camera",
      returnItem: "Casio Scientific Calculator",
      shareItem: "MacBook Pro M2",
      circlePartnerIds: ["CC1004", "CC1007", "CC1006"],
    },
    CC1002: {
      partnerId: "CC1001", // Aarav Sharma
      borrowItem: "MacBook Pro M2 (16GB RAM)",
      returnItem: "HD 4K Cinema Projector",
      shareItem: "Wacom Intuos Drawing Tablet",
      circlePartnerIds: ["CC1001", "CC1004", "CC1010"],
    },
    CC1003: {
      partnerId: "CC1007", // Alex Rivera
      borrowItem: "Canon EOS Rebel DSLR Kit",
      returnItem: "Casio FX-991EX Calculator",
      shareItem: "Digital Vernier Caliper Set",
      circlePartnerIds: ["CC1007", "CC1006", "CC1005"],
    },
    CC1004: {
      partnerId: "CC1008", // Vikram Joshi
      borrowItem: "Yamaha F310 Acoustic Guitar",
      returnItem: "HD 4K Cinema Projector",
      shareItem: "Sony Alpha A7 IV 4K Camera",
      circlePartnerIds: ["CC1008", "CC1001", "CC1007"],
    },
    CC1005: {
      partnerId: "CC1010", // Tanmay Bhatia
      borrowItem: "Arduino Robotics Starter Kit",
      returnItem: "Digital Oscilloscope",
      shareItem: "Soldering Workstation",
      circlePartnerIds: ["CC1010", "CC1003", "CC1009"],
    },
    CC1006: {
      partnerId: "CC1003", // Rohan Mehta
      borrowItem: "MacBook Pro M2 (16GB RAM)",
      returnItem: "Casio FX-991EX Calculator",
      shareItem: "Linear Algebra Textbook Vol 2",
      circlePartnerIds: ["CC1003", "CC1001", "CC1002"],
    },
    CC1007: {
      partnerId: "CC1003", // Rohan Mehta
      borrowItem: "Sony Alpha A7 IV 4K Camera",
      returnItem: "Canon EOS Rebel DSLR Kit",
      shareItem: "Studio Softbox Lighting Kit",
      circlePartnerIds: ["CC1003", "CC1004", "CC1008"],
    },
    CC1008: {
      partnerId: "CC1004", // Priya Nair
      borrowItem: "Studio Softbox Lighting Kit",
      returnItem: "Yamaha F310 Acoustic Guitar",
      shareItem: "Shure SM58 Vocal Microphone",
      circlePartnerIds: ["CC1004", "CC1007", "CC1002"],
    },
    CC1009: {
      partnerId: "CC1005", // Kabir Patel
      borrowItem: "Digital Oscilloscope",
      returnItem: "Lab Centrifuge Kit",
      shareItem: "Binocular Compound Microscope",
      circlePartnerIds: ["CC1005", "CC1010", "CC1006"],
    },
    CC1010: {
      partnerId: "CC1005", // Kabir Patel
      borrowItem: "Soldering Workstation",
      returnItem: "Arduino Robotics Starter Kit",
      shareItem: "Raspberry Pi 4 8GB Kit",
      circlePartnerIds: ["CC1005", "CC1009", "CC1001"],
    },
  };

  const config = studentConfigMap[studentId] || studentConfigMap.CC1003;

  // Retrieve user objects for primary partner and circle partners
  const partnerUser = store.users.find((u) => u.id === config.partnerId) || store.users[1];
  const partnerFirstName = partnerUser.name.split(" ")[0];
  const partnerDeptShort = partnerUser.department.split(" ")[0];

  const circlePartnerUsers = config.circlePartnerIds.map(
    (id) => store.users.find((u) => u.id === id) || store.users[0]
  );

  const borrowItemName = config.borrowItem;
  const returnItemName = config.returnItem;
  const shareItemName = config.shareItem;

  const activeCircleItems: CircleExchange[] = [
    {
      id: "c1",
      partnerName: circlePartnerUsers[0].name,
      partnerRole: circlePartnerUsers[0].department,
      partnerAvatar: circlePartnerUsers[0].avatar,
      avatarBg: circlePartnerUsers[0].avatarBg,
      item: borrowItemName,
      action: "Borrowing",
      status: "Handover Scheduled",
      location: `${circlePartnerUsers[0].location} @ 2:00 PM`,
      time: "Today",
    },
    {
      id: "c2",
      partnerName: circlePartnerUsers[1].name,
      partnerRole: circlePartnerUsers[1].department,
      partnerAvatar: circlePartnerUsers[1].avatar,
      avatarBg: circlePartnerUsers[1].avatarBg,
      item: returnItemName,
      action: "Returning",
      status: "Return Due",
      location: `${circlePartnerUsers[1].location}`,
      time: "Today @ 4:30 PM",
    },
    {
      id: "c3",
      partnerName: circlePartnerUsers[2].name,
      partnerRole: circlePartnerUsers[2].department,
      partnerAvatar: circlePartnerUsers[2].avatar,
      avatarBg: circlePartnerUsers[2].avatarBg,
      item: shareItemName,
      action: "Sharing",
      status: "Accepted",
      location: `${circlePartnerUsers[2].location}`,
      time: "Tomorrow",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {/* ATTENTION-SPOTTING RICH BLACK STATEMENT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#151518] text-[#FFFDF7] rounded-[32px] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.18)] relative overflow-hidden border border-white/10"
        >
          {/* React Bits Soft Aurora ambient background glow */}
          <SoftAurora opacity={0.22} />

          {/* Card Header Row */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEE2E2] animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/60 font-mono">
                CAMPUS CIRCLE · TODAY
              </span>
            </div>

            <div className="text-xs font-mono font-bold text-white/40">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
            </div>
          </div>

          {/* Expressive Editorial Headline with Soft Pastel Interactive Gear Stickers */}
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-[1.28] tracking-tight text-white/90">
              Hi, {firstName}! Today on campus you're going to{" "}
              <button
                type="button"
                onClick={() => setLocation("/discover")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDF0A6] text-[#151515] font-sans font-extrabold text-sm sm:text-lg align-middle mx-1 shadow-md hover:scale-105 hover:bg-[#FFE66D] active:scale-95 transition-all cursor-pointer"
                title="Click to view item on Discover"
              >
                <Camera className="w-4 h-4 text-[#151515]" />
                borrow {borrowItemName}
              </button>
              ,{" "}
              <button
                type="button"
                onClick={() => setLocation("/loans")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D7F3EB] text-[#151515] font-sans font-extrabold text-sm sm:text-lg align-middle mx-1 shadow-md hover:scale-105 hover:bg-[#B2EAD9] active:scale-95 transition-all cursor-pointer"
                title="Click to view active loan"
              >
                <BookOpen className="w-4 h-4 text-[#151515]" />
                return {returnItemName}
              </button>
              , and{" "}
              <button
                type="button"
                onClick={() => setLocation("/items")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8DEF8] text-[#151515] font-sans font-extrabold text-sm sm:text-lg align-middle mx-1 shadow-md hover:scale-105 hover:bg-[#D5C2F3] active:scale-95 transition-all cursor-pointer"
                title="Click to view items"
              >
                <Music className="w-4 h-4 text-[#151515]" />
                share campus gear
              </button>{" "}
              with {partnerFirstName}.
            </h1>
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div
              onClick={() => setIsCircleModalOpen(true)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="flex items-center -space-x-2">
                {circlePartnerUsers.map((cp) => (
                  <div
                    key={cp.id}
                    className="w-8 h-8 rounded-full text-[#151515] border-2 border-[#151518] flex items-center justify-center font-black text-xs"
                    style={{ backgroundColor: cp.avatarBg }}
                  >
                    {cp.avatar}
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight group-hover:text-[#FDF0A6] transition-colors flex items-center gap-1">
                  Active Circle · 3 Exchanges in Motion
                </span>
                <span className="text-[11px] text-white/50 font-medium">
                  {circlePartnerUsers.map((cp) => `${cp.name.split(" ")[0]} (${cp.department.split(" ")[0]})`).join(" · ")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCircleModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#FFFDF7] text-[#151518] hover:bg-[#FDF0A6] transition-all font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shrink-0 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore Gear Circle →</span>
            </button>
          </div>
        </motion.div>

        {/* LOWER PASTEL QUICK SUMMARY CARD */}
        <div className="bg-[#FFFDF7] border border-[#151515]/08 rounded-3xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#151515]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34D399]" />
            <span>
              Next Handover: <strong className="text-[#151515]">{partnerUser.location} @ 2:00 PM</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#151515]/70 font-black">
            <span>
              ₹<CountUp to={currentUser.moneySavedRupees} /> Saved
            </span>
            <span>•</span>
            <span>
              <CountUp to={currentUser.co2SavedKg} decimals={1} />
              kg CO2 Prevented
            </span>
          </div>
        </div>
      </div>

      {/* EXPLORE GEAR CIRCLE MODAL */}
      <AnimatePresence>
        {isCircleModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#151515]/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsCircleModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_24px_60px_rgba(0,0,0,0.2)] rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative overflow-hidden space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFD928] text-[#151515] flex items-center justify-center font-black">
                    <Repeat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#151515]">Campus Gear Circle</h3>
                    <p className="text-xs font-semibold text-[#151515]/60">3 active exchanges in motion today</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCircleModalOpen(false)}
                  className="p-1.5 text-[#151515]/40 hover:text-[#151515] hover:bg-[#F3EFE6] rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Circle Partners List */}
              <div className="space-y-3">
                {activeCircleItems.map((circle) => (
                  <div
                    key={circle.id}
                    className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/08 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border border-[#151515]/10 text-[#151515]"
                          style={{ backgroundColor: circle.avatarBg }}
                        >
                          {circle.partnerAvatar}
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#151515] flex items-center gap-1.5">
                            {circle.partnerName}
                            <span className="text-[10px] font-bold text-[#151515]/50">({circle.partnerRole})</span>
                          </div>
                          <div className="text-[11px] font-bold text-[#B92CFF]">
                            {circle.action} · {circle.item}
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#151515] text-[#FFFDF7]">
                        {circle.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#151515]/70 pt-2 border-t border-[#151515]/06 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#151515]/40" />
                        {circle.location}
                      </span>
                      <span className="flex items-center gap-1 font-mono font-bold">
                        <Clock className="w-3 h-3 text-[#151515]/40" />
                        {circle.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Bottom Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCircleModalOpen(false);
                    setLocation("/loans");
                  }}
                  className="flex-1 py-3 rounded-2xl bg-[#F3EFE6] text-[#151515] font-extrabold text-xs uppercase tracking-wider hover:bg-[#151515] hover:text-white transition-all text-center"
                >
                  View My Loans →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCircleModalOpen(false);
                    setLocation("/requests");
                  }}
                  className="flex-1 py-3 rounded-2xl bg-[#FFD928] text-[#151515] font-extrabold text-xs uppercase tracking-wider hover:bg-[#FFE46B] transition-all text-center shadow-sm"
                >
                  View Requests →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampusDeiHero;
