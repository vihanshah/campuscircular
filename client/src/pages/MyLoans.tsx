import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { CampusDeiHeader } from "@/components/CampusDeiHeader";
import { AppFooter } from "@/components/AppFooter";
import { MOCK_LOANS, MOCK_COMPLETED_LOANS, CampusLoan } from "@/lib/loansData";
import { FeaturedLoanCard } from "@/components/loans/FeaturedLoanCard";
import { LoanCard } from "@/components/loans/LoanCard";
import { DueSoonSection } from "@/components/loans/DueSoonSection";
import { CompletedLoansTab } from "@/components/loans/CompletedLoansTab";
import { ReturnFlowModal } from "@/components/loans/ReturnFlowModal";
import { LoanDetailsModal } from "@/components/loans/LoanDetailsModal";
import { ReportIssueModal } from "@/components/loans/ReportIssueModal";

export default function MyLoans() {
  const [activeTab, setActiveTab] = useState<"Active" | "Due Soon" | "Completed">("Active");
  const [loans, setLoans] = useState<CampusLoan[]>(MOCK_LOANS);
  const [completedLoans, setCompletedLoans] = useState<CampusLoan[]>(MOCK_COMPLETED_LOANS);
  
  // Modal States
  const [selectedLoanForDetails, setSelectedLoanForDetails] = useState<CampusLoan | null>(null);
  const [selectedLoanForReturn, setSelectedLoanForReturn] = useState<CampusLoan | null>(null);
  const [selectedLoanForIssue, setSelectedLoanForIssue] = useState<CampusLoan | null>(null);

  // Derived loan groups
  const featuredLoan = loans[0];
  const otherActiveLoans = loans.slice(1);
  const dueSoonLoans = loans.filter((l) => l.dueDaysRemaining <= 2 || l.isOverdue || l.status === "Due Soon");

  const handleCompleteReturn = (loanId: string, rating: number) => {
    const targetLoan = loans.find((l) => l.id === loanId);
    if (targetLoan) {
      const updatedCompletedLoan: CampusLoan = {
        ...targetLoan,
        status: "Completed",
        ratingGiven: rating,
        lifecycle: targetLoan.lifecycle.map((step) => ({
          ...step,
          isCompleted: true,
          isCurrent: step.stage === "RATED",
        })),
      };

      setLoans((prev) => prev.filter((l) => l.id !== loanId));
      setCompletedLoans((prev) => [updatedCompletedLoan, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#151515] font-sans selection:bg-[#FFD928] selection:text-[#151515] relative pb-20">
      
      {/* Top Navigation */}
      <CampusDeiHeader />

      {/* Main Container */}
      <main className="container max-w-[1380px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8 pb-12">
        
        {/* PAGE HEADER SECTION */}
        <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-6 sm:p-8 mb-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8DEF8] text-[#151515] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <Package className="w-3.5 h-3.5" />
                <span>Personal Borrowing Tracker</span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#151515] tracking-tight leading-tight">
                My Loans
              </h1>

              <p className="text-sm font-semibold text-[#151515]/70 mt-1">
                Keep track of everything you're borrowing.
              </p>
            </div>

            {/* TAB BUTTONS */}
            <div className="bg-[#F8F6F0] p-1.5 rounded-full flex items-center border border-[#151515]/06 shrink-0">
              {(["Active", "Due Soon", "Completed"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#151518] text-[#FDF0A6] shadow-xs"
                        : "text-[#151515]/60 hover:text-[#151515]"
                    }`}
                  >
                    {tab}
                    {tab === "Active" && ` (${loans.length})`}
                    {tab === "Due Soon" && ` (${dueSoonLoans.length})`}
                    {tab === "Completed" && ` (${completedLoans.length})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUMMARY INDICATOR ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#151515]/08">
            <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#151515]/50 tracking-wider">Active Loans</span>
              <div className="text-2xl font-black text-[#151515] mt-0.5">{loans.length}</div>
            </div>

            <div className="bg-[#FDF0A6]/40 p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#151515]/70 tracking-wider">Due Soon</span>
              <div className="text-2xl font-black text-[#151515] mt-0.5">{dueSoonLoans.length}</div>
            </div>

            <div className="bg-[#DCFCE7]/60 p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#15803D] tracking-wider">Completed</span>
              <div className="text-2xl font-black text-[#15803D] mt-0.5">{completedLoans.length}</div>
            </div>

            <div className="bg-[#E8DEF8]/40 p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#151515]/70 tracking-wider">On-time Returns</span>
              <div className="text-2xl font-black text-[#151515] mt-0.5">100%</div>
            </div>
          </div>

        </div>

        {/* TAB CONTENT VIEWS */}
        <AnimatePresence mode="wait">
          
          {/* ACTIVE TAB */}
          {activeTab === "Active" && (
            <motion.div
              key="tab-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Featured Active Loan Card */}
              {featuredLoan && (
                <FeaturedLoanCard
                  loan={featuredLoan}
                  onViewDetails={(l) => setSelectedLoanForDetails(l)}
                  onReturn={(l) => setSelectedLoanForReturn(l)}
                />
              )}

              {/* Due Soon Highlight Section */}
              <DueSoonSection
                dueSoonLoans={dueSoonLoans}
                onReturn={(l) => setSelectedLoanForReturn(l)}
                onViewDetails={(l) => setSelectedLoanForDetails(l)}
              />

              {/* Other Active Loans */}
              {otherActiveLoans.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-[#151515] tracking-tight">
                    Other Active Loans
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {otherActiveLoans.map((loan) => (
                      <LoanCard
                        key={loan.id}
                        loan={loan}
                        onViewDetails={(l) => setSelectedLoanForDetails(l)}
                        onReturn={(l) => setSelectedLoanForReturn(l)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* DUE SOON TAB */}
          {activeTab === "Due Soon" && (
            <motion.div
              key="tab-due-soon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <DueSoonSection
                dueSoonLoans={dueSoonLoans}
                onReturn={(l) => setSelectedLoanForReturn(l)}
                onViewDetails={(l) => setSelectedLoanForDetails(l)}
              />
            </motion.div>
          )}

          {/* COMPLETED TAB */}
          {activeTab === "Completed" && (
            <motion.div
              key="tab-completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CompletedLoansTab
                completedLoans={completedLoans}
                onViewDetails={(l) => setSelectedLoanForDetails(l)}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* INTERACTIVE MODALS */}
      <LoanDetailsModal
        loan={selectedLoanForDetails}
        onClose={() => setSelectedLoanForDetails(null)}
        onReturn={(l) => setSelectedLoanForReturn(l)}
        onReportIssue={(l) => setSelectedLoanForIssue(l)}
      />

      <ReturnFlowModal
        loan={selectedLoanForReturn}
        onClose={() => setSelectedLoanForReturn(null)}
        onCompleteReturn={handleCompleteReturn}
      />

      <ReportIssueModal
        loan={selectedLoanForIssue}
        onClose={() => setSelectedLoanForIssue(null)}
      />

      <AppFooter />
    </div>
  );
}
