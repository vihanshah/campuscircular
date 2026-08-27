import React, { useState } from "react";
import { Scale, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from "lucide-react";
import { loadAppStore } from "@/lib/appStore";

export const AdminDisputesTab: React.FC = () => {
  const disputes = [
    {
      id: "disp-101",
      resource: "Canon EOS Rebel DSLR Kit",
      borrower: "Rohan Mehta (CC1003)",
      owner: "Alex Rivera (CC1007)",
      issue: "Minor cosmetic scratch reported on lens housing upon return.",
      depositAmount: "₹500 Deposit",
      date: "Aug 26, 2026",
      status: "OPEN",
    },
    {
      id: "disp-102",
      resource: "Yamaha Acoustic Guitar F310",
      borrower: "Aarav Sharma (CC1001)",
      owner: "Vikram Joshi (CC1008)",
      issue: "Guitar bag zipper stuck during 3-day loan.",
      depositAmount: "₹200 Deposit",
      date: "Aug 25, 2026",
      status: "OPEN",
    },
  ];

  const handleResolveDispute = (disputeId: string, action: "refund" | "payout") => {
    if (action === "refund") {
      alert(`✓ Dispute #${disputeId} resolved! Full deposit refunded to Borrower.`);
    } else {
      alert(`✓ Dispute #${disputeId} resolved! Damage fee awarded to Owner.`);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1A1A24] p-6 rounded-3xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#FF6755] mb-1">
            <Scale className="w-4 h-4" />
            <span>Campus Dispute Resolution Center</span>
          </div>
          <h2 className="text-2xl font-black text-white">Open Escrow Disputes ({disputes.length})</h2>
          <p className="text-xs font-semibold text-white/60 mt-0.5">
            Mediate condition reports, missing accessories, or deposit disbursement claims.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FF6755]/10 text-[#FF6755] border border-[#FF6755]/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold">
          Escrow Security Active
        </div>
      </div>

      {/* DISPUTES CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {disputes.map((d) => (
          <div
            key={d.id}
            className="bg-[#1A1A24] border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#FF6755] bg-[#FF6755]/10 px-2.5 py-1 rounded-full border border-[#FF6755]/30">
                  Dispute #{d.id}
                </span>
                <span className="text-xs font-mono text-white/50">{d.date}</span>
              </div>

              <h3 className="text-lg font-black text-white">{d.resource}</h3>

              <div className="bg-[#0F0F14] p-4 rounded-2xl border border-white/06 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/50">Borrower:</span>
                  <span className="font-bold text-[#00F2FE]">{d.borrower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Lender:</span>
                  <span className="font-bold text-[#FFD928]">{d.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Deposit in Hold:</span>
                  <span className="font-mono font-black text-[#34D399]">{d.depositAmount}</span>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-200 font-semibold">
                <strong>Reported Issue:</strong> "{d.issue}"
              </div>
            </div>

            <div className="pt-3 border-t border-white/08 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleResolveDispute(d.id, "refund")}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-colors"
              >
                Refund Borrower
              </button>

              <button
                type="button"
                onClick={() => handleResolveDispute(d.id, "payout")}
                className="px-4 py-2 rounded-xl bg-[#FF6755] hover:bg-[#FF6755]/80 text-white font-black text-xs uppercase transition-colors"
              >
                Release to Owner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDisputesTab;
