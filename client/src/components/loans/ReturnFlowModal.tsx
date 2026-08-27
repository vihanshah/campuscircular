import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Camera, ShieldCheck, MapPin, Star, ArrowRight, Upload } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";

interface ReturnFlowModalProps {
  loan: CampusLoan | null;
  onClose: () => void;
  onCompleteReturn: (loanId: string, rating: number) => void;
}

export const ReturnFlowModal: React.FC<ReturnFlowModalProps> = ({
  loan,
  onClose,
  onCompleteReturn,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [rating, setRating] = useState(5);
  const [returnSuccess, setReturnSuccess] = useState(false);

  if (!loan) return null;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setReturnSuccess(true);
      setTimeout(() => {
        onCompleteReturn(loan.id, rating);
        setReturnSuccess(false);
        setCurrentStep(1);
        onClose();
      }, 1800);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative"
        >
          
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E2F1D0] text-[#151515] flex items-center justify-center font-black text-xs">
                📦
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#151515]">
                Return Workflow · Step {currentStep} of 4
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl font-black text-[#151515] tracking-tight leading-tight mb-1">
            Ready to return your {loan.resourceName.split(" ")[0]}?
          </h3>
          <p className="text-xs font-semibold text-[#151515]/65 mb-4">
            Return deadline: <strong>{loan.dueDate}</strong> · {loan.locationName}
          </p>

          {/* Workflow Step Tracker */}
          <div className="grid grid-cols-4 gap-1.5 mb-6">
            {["Drop-off", "Condition", "Photos", "Rating"].map((stepLabel, idx) => {
              const stepNum = idx + 1;
              const isDone = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div
                  key={stepLabel}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-black text-center uppercase tracking-wider transition-all ${
                    isCurrent
                      ? "bg-[#151518] text-[#FDF0A6]"
                      : isDone
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-[#F8F6F0] text-[#151515]/40"
                  }`}
                >
                  {isDone ? "✓ " : ""}{stepLabel}
                </div>
              );
            })}
          </div>

          {/* STEP CONTENT SWITCHER */}
          <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 mb-6 space-y-3">
            {currentStep === 1 && (
              <div className="space-y-2">
                <h4 className="text-sm font-black text-[#151515]">1. Confirm Drop-off Location</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-[#151515]/80">
                  <MapPin className="w-4 h-4 text-[#151515]" />
                  <span>{loan.locationName} (0.8 km away)</span>
                </div>
                <div className="text-xs text-[#151515]/65 font-medium">
                  Owner: <strong>{loan.ownerName}</strong> ({loan.ownerTrustScore} Trust Score)
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-2">
                <h4 className="text-sm font-black text-[#151515]">2. Condition & Accessories Check</h4>
                <div className="space-y-1 text-xs">
                  {loan.includedAccessories.map((acc, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-bold text-[#151515]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-3 text-center">
                <h4 className="text-sm font-black text-[#151515] text-left">3. Handover Proof Photos</h4>
                <div
                  onClick={() => setPhotoUploaded(true)}
                  className={`border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
                    photoUploaded
                      ? "bg-[#DCFCE7]/50 border-[#16A34A] text-[#15803D]"
                      : "bg-[#FFFDF7] border-[#151515]/20 text-[#151515]/60 hover:border-[#151518]"
                  }`}
                >
                  {photoUploaded ? (
                    <div className="flex items-center justify-center gap-2 font-black text-xs">
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                      <span>Photo uploaded & verified!</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-xs font-bold">
                      <Upload className="w-6 h-6 text-[#151515]/40" />
                      <span>Click to upload gear return photo (optional)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-3 text-center">
                <h4 className="text-sm font-black text-[#151515] text-left">4. Rate Experience & Settlement</h4>
                <div className="text-xs text-[#151515]/70 font-semibold text-left">
                  Deposit Release: <strong>{loan.depositDisplay}</strong> will be refunded to your account upon owner confirmation.
                </div>

                <div className="flex justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1.5 rounded-full text-xl transition-transform hover:scale-125 ${
                        star <= rating ? "text-[#EAB308]" : "text-[#151515]/20"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {returnSuccess ? (
            <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Resource returned! Deposit released & rating saved.</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl font-bold text-xs uppercase bg-[#F8F6F0] text-[#151515] hover:bg-[#E8E4DA]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-3 rounded-2xl font-black text-xs uppercase bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <span>{currentStep === 4 ? "Complete Return ✓" : "Next Step →"}</span>
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReturnFlowModal;
