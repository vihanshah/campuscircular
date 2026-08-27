import React from "react";
import { CreditCard, DollarSign, Wallet, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const AdminSettlementsTab: React.FC = () => {
  const settlements = [
    { id: "set-01", student: "Alex Rivera (CC1007)", type: "Lender Earnings Payout", amount: "₹480", status: "SETTLED", date: "Aug 27, 2026" },
    { id: "set-02", student: "Priya Nair (CC1004)", type: "Lender Earnings Payout", amount: "₹850", status: "SETTLED", date: "Aug 26, 2026" },
    { id: "set-03", student: "Rohan Mehta (CC1003)", type: "Deposit Refund", amount: "₹500", status: "PROCESSING", date: "Aug 27, 2026" },
    { id: "set-04", student: "Ananya Verma (CC1002)", type: "Lender Earnings Payout", amount: "₹300", status: "SETTLED", date: "Aug 24, 2026" },
  ];

  const handleProcessBatchPayouts = () => {
    alert("⚡ Batch UPI payout settlement of ₹1,630 successfully dispatched to verified campus student wallets!");
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* HEADER METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A24] border border-white/10 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-white/50">Total Gross Volume</div>
          <div className="text-3xl font-black text-[#00F2FE]">₹2,48,500</div>
          <div className="text-[10px] text-[#34D399] font-bold">100% Peer Campus Sharing</div>
        </div>

        <div className="bg-[#1A1A24] border border-white/10 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-white/50">Refundable Escrow Deposits</div>
          <div className="text-3xl font-black text-[#FFD928]">₹14,200</div>
          <div className="text-[10px] text-white/60 font-bold">Held in Student Protection Vault</div>
        </div>

        <div className="bg-[#1A1A24] border border-white/10 p-6 rounded-3xl space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-white/50">Pending Payouts to Lenders</div>
          <div className="text-3xl font-black text-[#B92CFF]">₹1,630</div>
          <div className="text-[10px] text-white/60 font-bold">Ready for Batch Disbursement</div>
        </div>
      </div>

      {/* SETTLEMENTS LEDGER */}
      <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Campus Wallet Settlements Ledger</h3>
            <p className="text-xs text-white/60">Automated UPI & Campus Wallet transaction history.</p>
          </div>

          <button
            type="button"
            onClick={handleProcessBatchPayouts}
            className="px-5 py-2.5 rounded-2xl bg-[#00F2FE] text-[#0F0F14] hover:bg-[#00F2FE]/80 font-black text-xs uppercase transition-colors shadow-md cursor-pointer"
          >
            Process Batch Payouts →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F0F14] border-b border-white/10 text-[11px] font-mono font-black uppercase text-white/50 tracking-wider">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Student & Account</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/06 font-semibold">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-white/04 transition-colors">
                  <td className="p-4 font-mono font-extrabold text-white">{s.id}</td>
                  <td className="p-4 font-bold text-white">{s.student}</td>
                  <td className="p-4 text-white/70">{s.type}</td>
                  <td className="p-4 font-mono font-black text-[#34D399]">{s.amount}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase ${
                        s.status === "SETTLED"
                          ? "bg-[#34D399]/20 text-[#34D399]"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-white/50">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSettlementsTab;
