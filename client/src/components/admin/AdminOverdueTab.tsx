import React, { useState } from "react";
import { AlertTriangle, Phone, Mail, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import { loadAppStore } from "@/lib/appStore";

export const AdminOverdueTab: React.FC = () => {
  const store = loadAppStore();

  const overdueList = [
    {
      id: "ov-1",
      item: "Sony Alpha A7 IV 4K Camera",
      borrower: "Rohan Mehta (CC1003)",
      owner: "Priya Nair (CC1004)",
      daysOverdue: 2,
      penaltyAccrued: "₹300",
      mobile: "+91 98200 11223",
      email: "rohan.mehta@tsec.edu",
      depositStatus: "₹1000 Held in Escrow",
    },
    {
      id: "ov-2",
      item: "Shure SM7B Studio Podcast Mic",
      borrower: "Kabir Patel (CC1005)",
      owner: "Ananya Verma (CC1002)",
      daysOverdue: 1,
      penaltyAccrued: "₹150",
      mobile: "+91 98200 44556",
      email: "kabir.patel@tsec.edu",
      depositStatus: "₹400 Held in Escrow",
    },
  ];

  const handleSendUrgentAlert = (borrowerName: string) => {
    alert(`🚨 URGENT TWILIO OVERDUE NOTICE dispatched to ${borrowerName} via SMS & Push Notification!`);
  };

  const handleResolveOverdue = (itemId: string) => {
    alert(`✓ Item successfully returned and verified! Escrow deposit released.`);
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* URGENT WARNING BANNER */}
      <div className="bg-red-500/10 border border-red-500/40 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center font-black text-xl shrink-0">
            ⚠️
          </div>
          <div>
            <h2 className="text-xl font-black text-red-400">Overdue Equipment Resolution ({overdueList.length})</h2>
            <p className="text-xs font-semibold text-white/70 mt-0.5">
              Items currently past scheduled return window. Escrow deposits are placed on administrative hold.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSendUrgentAlert("All Overdue Borrowers")}
          className="px-5 py-2.5 rounded-2xl bg-red-500 text-white font-extrabold text-xs uppercase hover:bg-red-600 transition-colors shadow-md shrink-0"
        >
          🚨 Trigger Mass SMS Notice
        </button>
      </div>

      {/* OVERDUE TABLE */}
      <div className="bg-[#1A1A24] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F0F14] border-b border-white/10 text-[11px] font-mono font-black uppercase text-white/50 tracking-wider">
                <th className="p-4">Overdue Resource</th>
                <th className="p-4">Borrower & Contact</th>
                <th className="p-4">Lender</th>
                <th className="p-4">Lateness</th>
                <th className="p-4">Escrow Hold</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/06 font-semibold">
              {overdueList.map((item) => (
                <tr key={item.id} className="hover:bg-white/04 transition-colors">
                  <td className="p-4">
                    <div className="font-extrabold text-white text-sm">{item.item}</div>
                    <div className="text-[10px] font-mono text-red-400">Accrued Fee: {item.penaltyAccrued}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-white">{item.borrower}</div>
                    <div className="text-[10px] text-white/60 flex items-center gap-2 mt-0.5">
                      <span>{item.mobile}</span>
                      <span>•</span>
                      <span>{item.email}</span>
                    </div>
                  </td>

                  <td className="p-4 text-white/80">{item.owner}</td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-red-500/20 text-red-400 border border-red-500/40">
                      {item.daysOverdue} Days Late
                    </span>
                  </td>

                  <td className="p-4 font-mono font-bold text-amber-300">
                    {item.depositStatus}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleSendUrgentAlert(item.borrower)}
                      className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-extrabold text-[11px] transition-colors"
                    >
                      Urgent Warning
                    </button>

                    <button
                      type="button"
                      onClick={() => handleResolveOverdue(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#34D399] text-[#0F0F14] hover:bg-[#34D399]/80 font-black text-[11px] uppercase transition-colors"
                    >
                      ✓ Resolve & Release
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverdueTab;
