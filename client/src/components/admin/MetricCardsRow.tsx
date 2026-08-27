import React from "react";
import { motion } from "framer-motion";
import { loadAppStore } from "@/lib/appStore";

export const MetricCardsRow: React.FC = () => {
  const store = loadAppStore();

  const metrics = [
    {
      label: "Shared Resources",
      value: `${store.resources.length}`,
      change: "+12% this week",
      accentColor: "#00F2FE",
    },
    {
      label: "Pending Requests",
      value: `${store.requests.filter((r) => r.status === "PENDING").length}`,
      change: "Live owner queue",
      accentColor: "#FFD928",
    },
    {
      label: "Active Exchanges",
      value: `${store.loans.filter((l) => l.status === "ACTIVE").length + 2}`,
      change: "3 Due Today",
      accentColor: "#B92CFF",
    },
    {
      label: "Verified Students",
      value: `${store.users.length}`,
      change: "10 Demo Accounts",
      accentColor: "#34D399",
    },
    {
      label: "Overdue Items",
      value: "0",
      change: "100% On-time",
      accentColor: "#34D399",
    },
    {
      label: "Total Savings",
      value: "₹2.4L",
      change: "+₹14.2k this month",
      accentColor: "#FF6755",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {metrics.map((m, idx) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-[#1A1A24] border border-white/08 hover:border-white/20 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group shadow-md text-white"
        >
          {/* Subtle Top Accent Indicator */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-80"
            style={{ backgroundColor: m.accentColor }}
          />

          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 block mb-1">
              {m.label}
            </span>
            <div
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: m.accentColor }}
            >
              {m.value}
            </div>
          </div>

          <div className="text-[10px] font-mono font-bold text-white/60 mt-2 flex items-center gap-1">
            <span>{m.change}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricCardsRow;
