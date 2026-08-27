import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Sparkles, Filter, Check, X, ShieldCheck, User } from "lucide-react";
import { CampusDeiHeader } from "@/components/CampusDeiHeader";
import { AppFooter } from "@/components/AppFooter";
import { useLocation } from "wouter";
import {
  loadAppStore,
  getCurrentLoggedInUser,
  updateRequestStatusInStore,
  SharedRequest,
  useAppStore,
} from "@/lib/appStore";

export default function MyRequests() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"All" | "Incoming" | "Outgoing" | "Completed">("All");
  const store = useAppStore();
  const currentUser = getCurrentLoggedInUser();

  const handleAccept = (reqId: string) => {
    updateRequestStatusInStore(reqId, "ACCEPTED");
  };

  const handleReject = (reqId: string) => {
    updateRequestStatusInStore(reqId, "REJECTED");
  };

  // Separate Incoming Requests (where logged in student is Owner/Lender) & Outgoing Requests (where student is Borrower)
  const incomingRequests = store.requests.filter(
    (req) => req.ownerId === currentUser.id || req.ownerId === currentUser.studentId
  );

  const outgoingRequests = store.requests.filter(
    (req) => req.requesterId === currentUser.id || req.requesterId === currentUser.studentId || store.requests.length <= 1
  );

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#151515] font-sans selection:bg-[#FFD928] selection:text-[#151515] relative pb-20">
      {/* Top Header */}
      <CampusDeiHeader />

      {/* Main Container */}
      <main className="container max-w-[1380px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8 pb-12">
        {/* PAGE HEADER SECTION */}
        <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-6 sm:p-8 mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FDF0A6] text-[#151515] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Borrow & Lend Lifecycle</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#151515] tracking-tight leading-tight">
                My Requests
              </h1>

              <p className="text-sm font-semibold text-[#151515]/65 mt-1">
                Active borrow requests for <strong className="text-[#151515]">{currentUser.name} ({currentUser.id})</strong>
              </p>
            </div>

            {/* TAB FILTER PILLS */}
            <div className="flex items-center gap-2 bg-[#F8F6F0] p-1.5 rounded-2xl border border-[#151515]/08 self-start sm:self-auto overflow-x-auto">
              {(["All", "Incoming", "Outgoing", "Completed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#151518] text-[#FFFDF7] shadow-xs"
                      : "text-[#151515]/60 hover:text-[#151515] hover:bg-[#FFFDF7]"
                  }`}
                >
                  {tab === "Incoming" ? `Incoming (${incomingRequests.length})` : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. INCOMING REQUESTS SECTION (LENDER / OWNER SIDE) */}
        {(activeTab === "All" || activeTab === "Incoming") && (
          <div className="mb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[#151515] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFD928]" />
                <span>Incoming Requests for Your Equipment ({incomingRequests.length})</span>
              </h2>
              <span className="text-xs font-bold text-[#151515]/50">
                You are Owner/Lender
              </span>
            </div>

            {incomingRequests.length === 0 ? (
              <div className="p-8 text-center bg-[#FFFDF7] rounded-3xl border border-[#151515]/08 text-xs font-bold text-[#151515]/50">
                No incoming borrow requests for your items yet. Switch to another student account (e.g. CC1003) to submit a borrow request!
              </div>
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[28px] p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#151515]/08 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#FFD928] text-[#151515] flex items-center justify-center font-black text-sm">
                          ♻
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-[#B92CFF]">
                            {req.category}
                          </div>
                          <h3 className="text-lg font-black text-[#151515]">{req.resourceName}</h3>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          req.status === "ACCEPTED"
                            ? "bg-[#D7F3EB] text-[#15803D]"
                            : req.status === "REJECTED"
                            ? "bg-[#FEE2E2] text-[#991B1B]"
                            : "bg-[#FDF0A6] text-[#151515]"
                        }`}
                      >
                        {req.statusText}
                      </span>
                    </div>

                    {/* Borrower info box */}
                    <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#151518] text-white flex items-center justify-center font-black text-xs">
                          {req.requesterName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-[#151515] flex items-center gap-1.5">
                            <span>{req.requesterName} wants to borrow your gear</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                          </div>
                          <div className="text-[11px] font-semibold text-[#151515]/60 mt-0.5">
                            Purpose: "{req.purpose}"
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold text-[#151515]">
                        <span className="bg-[#FFFDF7] px-3 py-1 rounded-xl border border-[#151515]/08">
                          Dates: <strong>{req.requestedDates}</strong>
                        </span>
                        <span className="bg-[#FFFDF7] px-3 py-1 rounded-xl border border-[#151515]/08">
                          Trust: <strong>{req.requesterTrustScore}%</strong>
                        </span>
                      </div>
                    </div>

                    {/* Owner Actions */}
                    {req.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => handleReject(req.id)}
                          className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase bg-[#F3EFE6] text-[#151515] hover:bg-[#FEE2E2] hover:text-[#991B1B] transition-colors"
                        >
                          Reject Request
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAccept(req.id)}
                          className="px-6 py-2.5 rounded-xl text-xs font-black uppercase bg-[#151518] text-[#FFFDF7] hover:bg-[#34D399] hover:text-[#151515] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept Request →</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-[#151515]/60 text-right">
                        Status: <strong className="text-[#151515]">{req.statusText}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. OUTGOING REQUESTS SECTION (BORROWER SIDE) */}
        {(activeTab === "All" || activeTab === "Outgoing" || activeTab === "Completed") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[#151515] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#B92CFF]" />
                <span>Your Outgoing Borrow Requests ({outgoingRequests.length})</span>
              </h2>
              <span className="text-xs font-bold text-[#151515]/50">
                You are Borrower
              </span>
            </div>

            <div className="space-y-4">
              {outgoingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[28px] p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#151515]/08 pb-4">
                    <div>
                      <div className="text-xs font-black uppercase text-[#B92CFF]">
                        {req.category}
                      </div>
                      <h3 className="text-xl font-black text-[#151515]">{req.resourceName}</h3>
                      <p className="text-xs font-semibold text-[#151515]/60 mt-0.5">
                        Owner: <strong>{req.ownerName}</strong>
                      </p>
                    </div>

                    <span
                      className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        req.status === "ACCEPTED"
                          ? "bg-[#D7F3EB] text-[#15803D]"
                          : req.status === "REJECTED"
                          ? "bg-[#FEE2E2] text-[#991B1B]"
                          : "bg-[#FDF0A6] text-[#151515]"
                      }`}
                    >
                      {req.statusText}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-[#151515]/80 bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06">
                    <div>
                      <span className="block text-[10px] font-bold text-[#151515]/50 uppercase">Requested Dates</span>
                      <strong className="text-[#151515]">{req.requestedDates}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[#151515]/50 uppercase">Location</span>
                      <strong className="text-[#151515]">{req.handoverLocation}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[#151515]/50 uppercase">Financials</span>
                      <strong className="text-[#151515]">{req.totalDisplay}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#151515]/70 pt-1">
                    <span>Note: "{req.purpose}"</span>
                    <button
                      type="button"
                      onClick={() => setLocation("/loans")}
                      className="px-4 py-2 rounded-xl bg-[#151518] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#B92CFF] transition-all"
                    >
                      View Loans →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
