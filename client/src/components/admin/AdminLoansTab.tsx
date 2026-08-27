import React, { useState } from "react";
import { Clock, CheckCircle2, AlertTriangle, Send, Search, Filter, ShieldCheck, FileText, X, Repeat, ArrowRight } from "lucide-react";
import { loadAppStore, saveAppStore, SharedLoan, useAppStore } from "@/lib/appStore";

export const AdminLoansTab: React.FC = () => {
  const store = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "DUE_SOON" | "RETURNED">("ACTIVE");
  const [selectedLoanForAgreement, setSelectedLoanForAgreement] = useState<SharedLoan | null>(null);

  // Combine store loans with rich seed demo loans for full 10-student coverage
  const demoLoans: SharedLoan[] = [
    {
      id: "loan-d1",
      requestId: "req-1",
      resourceId: "res-sony-camera",
      resourceName: "Sony Alpha A7 IV 4K Camera",
      category: "Photography",
      borrowerId: "CC1003",
      borrowerName: "Rohan Mehta",
      ownerId: "CC1004",
      ownerName: "Priya Nair",
      dueDate: "Aug 30, 2026",
      dueDaysText: "Due in 3 days",
      status: "ACTIVE",
      cardColor: "#FDF0A6",
    },
    {
      id: "loan-d2",
      requestId: "req-2",
      resourceId: "res-canon-camera",
      resourceName: "Canon EOS Rebel DSLR Kit",
      category: "Photography",
      borrowerId: "CC1001",
      borrowerName: "Aarav Sharma",
      ownerId: "CC1007",
      ownerName: "Alex Rivera",
      dueDate: "Sep 01, 2026",
      dueDaysText: "Due in 5 days",
      status: "ACTIVE",
      cardColor: "#E8DEF8",
    },
    {
      id: "loan-d3",
      requestId: "req-3",
      resourceId: "res-macbook",
      resourceName: "MacBook Pro M2 (16GB RAM)",
      category: "Electronics",
      borrowerId: "CC1005",
      borrowerName: "Kabir Patel",
      ownerId: "CC1001",
      ownerName: "Aarav Sharma",
      dueDate: "Aug 28, 2026",
      dueDaysText: "Due tomorrow",
      status: "DUE_SOON",
      cardColor: "#D7F3EB",
    },
    {
      id: "loan-d4",
      requestId: "req-4",
      resourceId: "res-projector",
      resourceName: "HD 4K Portable Cinema Projector",
      category: "Events",
      borrowerId: "CC1002",
      borrowerName: "Ananya Verma",
      ownerId: "CC1004",
      ownerName: "Priya Nair",
      dueDate: "Sep 03, 2026",
      dueDaysText: "Due in 7 days",
      status: "ACTIVE",
      cardColor: "#FDF0A6",
    },
    {
      id: "loan-d5",
      requestId: "req-5",
      resourceId: "res-guitar",
      resourceName: "Yamaha F310 Acoustic Guitar",
      category: "Music",
      borrowerId: "CC1010",
      borrowerName: "Tanmay Bhatia",
      ownerId: "CC1008",
      ownerName: "Vikram Joshi",
      dueDate: "Aug 29, 2026",
      dueDaysText: "Due in 2 days",
      status: "ACTIVE",
      cardColor: "#E8DEF8",
    },
    {
      id: "loan-d6",
      requestId: "req-6",
      resourceId: "res-shure-mic",
      resourceName: "Shure SM7B Studio Podcast Mic",
      category: "Music",
      borrowerId: "CC1006",
      borrowerName: "Diya Sengupta",
      ownerId: "CC1002",
      ownerName: "Ananya Verma",
      dueDate: "Aug 28, 2026",
      dueDaysText: "Due tomorrow",
      status: "DUE_SOON",
      cardColor: "#FDF0A6",
    },
  ];

  // Merge store loans with demo loans (avoid duplicates)
  const allLoans = [...store.loans, ...demoLoans.filter((d) => !store.loans.some((l) => l.id === d.id))];

  const filteredLoans = allLoans.filter((loan) => {
    const matchesSearch =
      loan.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.borrowerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.ownerId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && loan.status === "ACTIVE") ||
      (statusFilter === "DUE_SOON" && loan.status === "DUE_SOON") ||
      (statusFilter === "RETURNED" && loan.status === "RETURNED");

    return matchesSearch && matchesStatus;
  });

  const handleReturnLoan = (loanId: string, itemTitle: string) => {
    if (confirm(`Mark active loan for "${itemTitle}" as COMPLETED & RETURNED?`)) {
      const updatedLoans = store.loans.map((l) =>
        l.id === loanId ? { ...l, status: "RETURNED" as const, dueDaysText: "Completed" } : l
      );
      const updated = { ...store, loans: updatedLoans };
      saveAppStore(updated);
      alert(`✓ Loan for ${itemTitle} marked as RETURNED in central ledger.`);
    }
  };

  const handleSendReminderSMS = (borrowerName: string) => {
    alert(`⚡ Automated SMS Reminder dispatched to ${borrowerName}'s registered phone number!`);
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* SUMMARY INDICATORS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1A1A24] border border-white/10 p-5 rounded-3xl space-y-1">
          <div className="text-[10px] font-mono uppercase text-white/50">Active Loans</div>
          <div className="text-3xl font-black text-[#00F2FE]">{allLoans.filter((l) => l.status !== "RETURNED").length}</div>
          <div className="text-[10px] text-white/60">Live across campus</div>
        </div>

        <div className="bg-[#1A1A24] border border-white/10 p-5 rounded-3xl space-y-1">
          <div className="text-[10px] font-mono uppercase text-white/50">Due Within 48h</div>
          <div className="text-3xl font-black text-[#FFD928]">{allLoans.filter((l) => l.status === "DUE_SOON").length}</div>
          <div className="text-[10px] text-amber-300">Automated SMS queued</div>
        </div>

        <div className="bg-[#1A1A24] border border-white/10 p-5 rounded-3xl space-y-1">
          <div className="text-[10px] font-mono uppercase text-white/50">Returned Loans</div>
          <div className="text-3xl font-black text-[#34D399]">142</div>
          <div className="text-[10px] text-[#34D399]">100% Escrow Returned</div>
        </div>

        <div className="bg-[#1A1A24] border border-white/10 p-5 rounded-3xl space-y-1">
          <div className="text-[10px] font-mono uppercase text-white/50">On-Time Return Pct</div>
          <div className="text-3xl font-black text-[#B92CFF]">98.4%</div>
          <div className="text-[10px] text-white/60">Verified Trust Score</div>
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1A1A24] p-6 rounded-3xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00F2FE] mb-1">
            <Clock className="w-4 h-4 text-[#00F2FE]" />
            <span>Active Campus Loans Ledger</span>
          </div>
          <h2 className="text-2xl font-black text-white">Active Student Loans ({filteredLoans.length})</h2>
          <p className="text-xs font-semibold text-white/60 mt-0.5">
            Admin oversight for ongoing equipment borrowing, due return dates, and agreement contracts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(["ACTIVE", "DUE_SOON", "ALL", "RETURNED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all ${
                statusFilter === st
                  ? "bg-[#00F2FE] text-[#0F0F14] shadow-md font-black"
                  : "bg-white/05 text-white/70 hover:bg-white/10"
              }`}
            >
              {st === "DUE_SOON" ? "Due Soon" : st === "ACTIVE" ? "Active Only" : st}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[#1A1A24] p-4 rounded-2xl border border-white/10 shadow-sm flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by item name, borrower ID (CC1003), or owner ID (CC1007)..."
            className="w-full pl-10 pr-4 py-2 bg-[#0F0F14] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00F2FE]"
          />
        </div>

        <div className="text-xs font-mono text-white/50 shrink-0">
          Showing {filteredLoans.length} active loans
        </div>
      </div>

      {/* LOANS TABLE */}
      <div className="bg-[#1A1A24] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F0F14] border-b border-white/10 text-[11px] font-mono font-black uppercase text-white/50 tracking-wider">
                <th className="p-4">Resource Item</th>
                <th className="p-4">Borrower (Student ID)</th>
                <th className="p-4">Owner (Student ID)</th>
                <th className="p-4">Return Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/06 font-semibold">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-white/04 transition-colors">
                  <td className="p-4">
                    <div className="font-extrabold text-white text-sm">{loan.resourceName}</div>
                    <div className="text-[10px] font-mono text-white/40">{loan.category}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-white">{loan.borrowerName}</div>
                    <span className="px-2 py-0.5 rounded-lg bg-[#00F2FE]/15 text-[#00F2FE] font-mono font-bold text-[10px]">
                      {loan.borrowerId}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-white">{loan.ownerName}</div>
                    <span className="px-2 py-0.5 rounded-lg bg-[#FFD928]/15 text-[#FFD928] font-mono font-bold text-[10px]">
                      {loan.ownerId}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-extrabold text-white">{loan.dueDate}</div>
                    <div className="text-[10px] font-mono text-white/60">{loan.dueDaysText}</div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase ${
                        loan.status === "RETURNED"
                          ? "bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40"
                          : loan.status === "DUE_SOON"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/40"
                      }`}
                    >
                      {loan.status === "DUE_SOON" ? "Due Soon" : loan.status}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedLoanForAgreement(loan)}
                      className="p-2 rounded-xl bg-white/05 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                      title="View Agreement Contract"
                    >
                      <FileText className="w-4 h-4 text-[#00F2FE]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendReminderSMS(loan.borrowerName)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3 h-3 text-[#00F2FE]" />
                      <span>SMS</span>
                    </button>

                    {loan.status !== "RETURNED" && (
                      <button
                        type="button"
                        onClick={() => handleReturnLoan(loan.id, loan.resourceName)}
                        className="px-3 py-1.5 rounded-xl bg-[#34D399] text-[#0F0F14] hover:bg-[#34D399]/80 font-black text-[11px] uppercase transition-colors"
                      >
                        ✓ Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AGREEMENT CONTRACT MODAL */}
      {selectedLoanForAgreement && (
        <div className="fixed inset-0 z-50 bg-[#0F0F14]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A24] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-white relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00F2FE] text-[#0F0F14] flex items-center justify-center font-black">
                  📄
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Active Loan Agreement Contract</h3>
                  <p className="text-[10px] font-mono text-white/50">Agreement ID: {selectedLoanForAgreement.requestId}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLoanForAgreement(null)}
                className="p-1 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-[#0F0F14] p-4 rounded-2xl border border-white/06 font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Resource Item:</span>
                <strong className="text-white">{selectedLoanForAgreement.resourceName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Borrower:</span>
                <strong className="text-[#00F2FE]">{selectedLoanForAgreement.borrowerName} ({selectedLoanForAgreement.borrowerId})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Lender Owner:</span>
                <strong className="text-[#FFD928]">{selectedLoanForAgreement.ownerName} ({selectedLoanForAgreement.ownerId})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Due Return Date:</span>
                <strong className="text-[#34D399]">{selectedLoanForAgreement.dueDate}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Campus Verification:</span>
                <strong className="text-[#34D399]">✓ 100% Student Verified</strong>
              </div>
            </div>

            <div className="text-[11px] text-white/70 space-y-1 bg-white/05 p-3 rounded-xl">
              <p className="font-bold text-white">Digital Signatures Verified:</p>
              <p>• Borrower Student ID ({selectedLoanForAgreement.borrowerId}) signed handover protocol</p>
              <p>• Owner Student ID ({selectedLoanForAgreement.ownerId}) confirmed handover location</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLoanForAgreement(null)}
              className="w-full py-3 rounded-2xl bg-[#00F2FE] text-[#0F0F14] font-black text-xs uppercase tracking-wider hover:bg-[#00F2FE]/80 transition-colors"
            >
              Close Contract View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoansTab;
