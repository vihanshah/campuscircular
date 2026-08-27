import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  Check,
  AlertTriangle,
  Info,
  CheckSquare,
  Square,
  ArrowRight,
  Loader2,
  Lock,
  FileText,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { CampusResource } from "@/lib/discoverData";
import { CampusRequest, saveNewRequest } from "@/lib/requestsData";
import { createBorrowRequestInStore } from "@/lib/appStore";

interface BorrowRequestModalProps {
  isOpen: boolean;
  resource: CampusResource;
  onClose: () => void;
  onRequestSubmitted: (request: CampusRequest) => void;
}

export const BorrowRequestModal: React.FC<BorrowRequestModalProps> = ({
  isOpen,
  resource,
  onClose,
  onRequestSubmitted,
}) => {
  // Default dates: tomorrow 2:00 PM -> 2 days later 6:00 PM
  const today = new Date();
  const defaultBorrowDate = new Date(today);
  defaultBorrowDate.setDate(today.getDate() + 1);

  const defaultReturnDate = new Date(defaultBorrowDate);
  defaultReturnDate.setDate(defaultBorrowDate.getDate() + 2);

  const [borrowDate, setBorrowDate] = useState<string>(
    defaultBorrowDate.toISOString().split("T")[0]
  );
  const [borrowTime, setBorrowTime] = useState("14:00");

  const [returnDate, setReturnDate] = useState<string>(
    defaultReturnDate.toISOString().split("T")[0]
  );
  const [returnTime, setReturnTime] = useState("18:00");

  const [purpose, setPurpose] = useState("");
  const [ownerNote, setOwnerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "upi" | "card">("wallet");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date duration & validation calculations
  const { durationDays, isValidDates, borrowDateFormatted, returnDateFormatted } = useMemo(() => {
    try {
      const bDate = new Date(`${borrowDate}T${borrowTime}`);
      const rDate = new Date(`${returnDate}T${returnTime}`);

      const diffMs = rDate.getTime() - bDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      const days = Math.max(1, Math.ceil(diffHours / 24));

      const isValid = diffMs > 0;

      const bFormatted = bDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) + ` · ${bDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

      const rFormatted = rDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) + ` · ${rDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

      return {
        durationDays: days,
        isValidDates: isValid,
        borrowDateFormatted: bFormatted,
        returnDateFormatted: rFormatted,
      };
    } catch {
      return {
        durationDays: 1,
        isValidDates: false,
        borrowDateFormatted: "—",
        returnDateFormatted: "—",
      };
    }
  }, [borrowDate, borrowTime, returnDate, returnTime]);

  // Financial calculations
  const rentalFee = resource.pricePerDay * durationDays;
  const platformFee = resource.pricePerDay > 0 ? 10 : 0;
  const depositAmount = resource.pricePerDay > 0 ? 500 : 0;
  const totalAmount = rentalFee + platformFee + depositAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed || !isValidDates || isSubmitting) return;

    setIsSubmitting(true);

    // Build requested date range display string
    const dateRangeStr = `${borrowDateFormatted} → ${returnDateFormatted}`;

    const newRequest: CampusRequest = {
      id: `req-${Date.now()}`,
      resourceName: resource.name,
      category: (resource.category as any) || "Electronics",
      cardColor: resource.cardColor,
      status: "PENDING",
      statusText: "● Awaiting approval",
      statusBg: "#FDF0A6",
      statusTextColor: "#151515",
      ownerName: resource.ownerName,
      ownerAvatar: resource.ownerAvatar,
      isOwnerVerified: resource.isOwnerVerified,
      ownerTrustScore: 98,
      requestedDates: dateRangeStr,
      requestDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      handoverLocation: `${resource.locationName} · TSEC Campus`,
      distanceKm: resource.distanceKm,
      pricePerDay: resource.pricePerDay,
      priceDisplay: resource.priceDisplay,
      depositDisplay: depositAmount > 0 ? `₹${depositAmount} refundable deposit` : "Free with Student ID",
      platformFeeDisplay: platformFee > 0 ? `₹${platformFee}` : "Free",
      totalDisplay: totalAmount > 0 ? `₹${totalAmount} (₹${rentalFee} fee + ₹${depositAmount} deposit)` : "Free",
      matchPct: resource.matchPct,
      matchReasons: resource.matchReasons,
      nextStepText: `Wait for ${resource.ownerName.split(" ")[0]} to accept your request.`,
      purposeNotes: purpose.trim() || "Campus academic project / club activity",
      lifecycle: [
        {
          stage: "REQUESTED",
          label: "Request Sent",
          isCompleted: true,
          isCurrent: true,
          timestamp: "Just now",
        },
        { stage: "ACCEPTED", label: "Owner Review", isCompleted: false, isCurrent: false },
        { stage: "AGREEMENT", label: "Agreement Confirmed", isCompleted: false, isCurrent: false },
        { stage: "HANDOVER", label: "Handover", isCompleted: false, isCurrent: false },
        { stage: "BORROWED", label: "Active Loan", isCompleted: false, isCurrent: false },
      ],
    };

    // Save into shared persistent state
    saveNewRequest(newRequest);
    createBorrowRequestInStore(resource.id, dateRangeStr, purpose);

    // Simulate 750ms network delay
    setTimeout(() => {
      setIsSubmitting(false);
      onRequestSubmitted(newRequest);
    }, 750);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#151515]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSubmitting) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.94, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 20 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] rounded-[32px] w-full max-w-2xl my-auto relative overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* STICKY HEADER */}
          <div className="bg-[#FFFDF7] border-b border-[#151515]/08 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div>
              <h2 className="text-xl font-black text-[#151515] tracking-tight flex items-center gap-2">
                <span>Request to borrow</span>
              </h2>
              <p className="text-xs font-semibold text-[#151515]/60">
                Review dates, terms & complete borrowing agreement
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 text-[#151515]/40 hover:text-[#151515] hover:bg-[#F3EFE6] rounded-xl transition-all disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#151515]">
            
            {/* 1. SELECTED RESOURCE SUMMARY CARD */}
            <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/08 flex items-start gap-4">
              {resource.imageUrl ? (
                <img
                  src={resource.imageUrl}
                  alt={resource.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#151515]/10 shadow-xs"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-[#151515]/10 shadow-xs font-black text-xl text-[#151515]"
                  style={{ backgroundColor: resource.cardColor }}
                >
                  ♻
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
                    style={{ backgroundColor: resource.cardColor }}
                  >
                    {resource.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#151515]/60 flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-[#EAB308] fill-current" />
                    <strong>{resource.rating}</strong>
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#151515] leading-tight truncate">
                  {resource.name}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs font-semibold text-[#151515]/70">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Verified owner ({resource.ownerName})</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#151515]/40" />
                    <span>{resource.distanceKm} km away ({resource.locationName})</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. BORROWING DATES SELECTION */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/80 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B92CFF]" />
                  Borrowing Dates & Duration
                </span>
                {isValidDates && (
                  <span className="text-xs font-black text-[#151515] bg-[#FFD928] px-3 py-0.5 rounded-full">
                    Duration: {durationDays} {durationDays === 1 ? "day" : "days"}
                  </span>
                )}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#151515]/08 space-y-1">
                  <label className="block text-[10px] font-extrabold uppercase text-[#151515]/60">
                    Borrow from
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={borrowDate}
                      onChange={(e) => setBorrowDate(e.target.value)}
                      className="bg-[#FFFDF7] border border-[#151515]/15 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FFD928]"
                    />
                    <input
                      type="time"
                      value={borrowTime}
                      onChange={(e) => setBorrowTime(e.target.value)}
                      className="bg-[#FFFDF7] border border-[#151515]/15 rounded-xl px-2 py-1.5 text-xs font-bold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FFD928]"
                    />
                  </div>
                </div>

                <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#151515]/08 space-y-1">
                  <label className="block text-[10px] font-extrabold uppercase text-[#151515]/60">
                    Return by
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-[#FFFDF7] border border-[#151515]/15 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FFD928]"
                    />
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="bg-[#FFFDF7] border border-[#151515]/15 rounded-xl px-2 py-1.5 text-xs font-bold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FFD928]"
                    />
                  </div>
                </div>
              </div>

              {!isValidDates && (
                <div className="p-3 rounded-2xl bg-[#FEE2E2] text-[#991B1B] text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[#991B1B]" />
                  <span>Return date & time must be after the borrow start time.</span>
                </div>
              )}
            </div>

            {/* 3. PURPOSE + MESSAGE */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                  Why do you need this? *
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Club event / photography / project..."
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#FFD928] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                  Add a note to the owner <span className="text-[#151515]/40 font-medium">(Optional)</span>
                </label>
                <textarea
                  value={ownerNote}
                  onChange={(e) => setOwnerNote(e.target.value)}
                  placeholder="Hi! I will take great care of your equipment..."
                  rows={2}
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl px-4 py-2 text-xs font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#FFD928] transition-all resize-none"
                />
              </div>
            </div>

            {/* 4. BORROWING AGREEMENT SECTION (BEFORE YOU REQUEST) */}
            <div className="border-t border-[#151515]/10 pt-5 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B92CFF]" />
                <h3 className="text-lg font-black text-[#151515] tracking-tight">
                  Before you request
                </h3>
              </div>

              {/* Financial & Time Breakdown Table */}
              <div className="bg-[#F8F6F0] border border-[#151515]/08 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#151515]/06 pb-2.5">
                  <span className="font-bold text-[#151515]/60">Borrowing period</span>
                  <span className="font-extrabold text-[#151515] font-mono">
                    {borrowDateFormatted} → {returnDateFormatted}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#151515]/70">
                      Borrowing fee ({durationDays} {durationDays === 1 ? "day" : "days"} @ {resource.priceDisplay})
                    </span>
                    <span className="font-bold text-[#151515]">
                      {resource.pricePerDay > 0 ? `₹${rentalFee}` : "Free"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#151515]/70">Platform fee</span>
                    <span className="font-bold text-[#151515]">
                      {platformFee > 0 ? `₹${platformFee}` : "Free"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#151515]/70">Refundable deposit</span>
                    <span className="font-bold text-[#151515]">
                      {depositAmount > 0 ? `₹${depositAmount}` : "Free with ID"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#151515]/10 pt-2.5 flex items-center justify-between text-sm">
                  <span className="font-black text-[#151515] uppercase tracking-wider">TOTAL DUE</span>
                  <span className="font-black text-base text-[#151515]">
                    {totalAmount > 0 ? `₹${totalAmount}` : "Free"}
                  </span>
                </div>

                {/* PAYMENT METHOD SELECTOR */}
                <div className="pt-2 border-t border-[#151515]/08 space-y-2">
                  <label className="block text-[10px] font-extrabold uppercase text-[#151515]/60">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`p-2 rounded-xl text-center border text-xs font-black transition-all ${
                        paymentMethod === "wallet"
                          ? "bg-[#151518] text-[#FFD928] border-[#151518] shadow-xs"
                          : "bg-[#FFFDF7] text-[#151515] border-[#151515]/15 hover:bg-[#F3EFE6]"
                      }`}
                    >
                      🎓 Wallet
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-2 rounded-xl text-center border text-xs font-black transition-all ${
                        paymentMethod === "upi"
                          ? "bg-[#151518] text-[#FFD928] border-[#151518] shadow-xs"
                          : "bg-[#FFFDF7] text-[#151515] border-[#151515]/15 hover:bg-[#F3EFE6]"
                      }`}
                    >
                      📱 UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2 rounded-xl text-center border text-xs font-black transition-all ${
                        paymentMethod === "card"
                          ? "bg-[#151518] text-[#FFD928] border-[#151518] shadow-xs"
                          : "bg-[#FFFDF7] text-[#151515] border-[#151515]/15 hover:bg-[#F3EFE6]"
                      }`}
                    >
                      💳 Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Borrowing Terms */}
              <div className="bg-[#FFFDF7] border border-[#151515]/10 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]">
                  Borrowing terms
                </h4>
                <ul className="space-y-1.5 text-xs font-semibold text-[#151515]/75 list-disc list-inside leading-relaxed">
                  <li>Return the item by the agreed deadline.</li>
                  <li>Return all listed accessories.</li>
                  <li>Return the item in the recorded condition.</li>
                  <li>Damage or loss may affect the refundable deposit.</li>
                  <li>Late returns may incur additional charges.</li>
                  <li>Both parties must confirm the handover.</li>
                  <li>Any dispute can be reported through Campus Circular.</li>
                </ul>
              </div>
            </div>

            {/* 5. CONDITION */}
            <div className="bg-[#F8F6F0] border border-[#151515]/08 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]">
                  Current item condition
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#D7F3EB] text-[#15803D]">
                  {resource.condition || "Excellent"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-bold text-[#151515]/80 pt-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>No visible damage</span>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>All accessories included</span>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Condition recorded</span>
                </span>
              </div>

              <p className="text-[11px] font-medium text-[#151515]/60 italic pt-1 border-t border-[#151515]/06">
                "The condition will be checked again when the item is returned."
              </p>
            </div>

            {/* 6. HANDOVER */}
            <div className="bg-[#FFFDF7] border border-[#151515]/10 rounded-2xl p-4 space-y-1.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#151515] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#B92CFF]" />
                Handover Location
              </h4>
              <div className="text-xs font-extrabold text-[#151515]">
                📍 {resource.locationName} · TSEC Main Building
              </div>
              <p className="text-[11px] font-medium text-[#151515]/60 leading-relaxed">
                "The exact handover time will be confirmed after the owner accepts the request."
              </p>
            </div>

            {/* 7. AGREEMENT CHECKBOX */}
            <div className="p-4 rounded-2xl bg-[#FFD928]/20 border border-[#FFD928]/40 space-y-2">
              <label
                onClick={() => setIsAgreed(!isAgreed)}
                className="flex items-start gap-3 cursor-pointer select-none"
              >
                <div className="mt-0.5 shrink-0">
                  {isAgreed ? (
                    <CheckSquare className="w-5 h-5 text-[#151515] fill-[#FFD928]" />
                  ) : (
                    <Square className="w-5 h-5 text-[#151515]/50" />
                  )}
                </div>
                <span className="text-xs font-bold text-[#151515] leading-relaxed">
                  I have read and agree to the borrowing terms, return deadline, charges, deposit and condition requirements.
                </span>
              </label>
            </div>

          </div>

          {/* STICKY FOOTER ACTIONS */}
          <div className="bg-[#FFFDF7] border-t border-[#151515]/08 px-6 py-4 flex items-center justify-end gap-3 shrink-0 sticky bottom-0 z-20">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-3 rounded-2xl bg-[#F3EFE6] text-[#151515] hover:bg-[#E8E4DA] transition-all text-xs font-extrabold uppercase tracking-wider disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isAgreed || !isValidDates || isSubmitting}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
                isAgreed && isValidDates && !isSubmitting
                  ? "bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] hover:text-white cursor-pointer"
                  : "bg-[#151518]/30 text-white/40 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <span>Agree & Request to Borrow →</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BorrowRequestModal;
