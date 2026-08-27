import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, CheckCircle2, Send } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";

interface ReportIssueModalProps {
  loan: CampusLoan | null;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ loan, onClose }) => {
  const [issueType, setIssueType] = useState("Item damaged");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!loan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-md w-full relative space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#FF6755]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-xl font-black text-[#151515] tracking-tight">
                Report an Issue
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs font-semibold text-[#151515]/65">
            Reporting an issue with <strong>{loan.resourceName}</strong> borrowed from {loan.ownerName}.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                Select Issue Type
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FF6755]"
              >
                <option value="Item damaged">Item damaged</option>
                <option value="Item missing">Item missing</option>
                <option value="Owner dispute">Owner dispute</option>
                <option value="Incorrect charge">Incorrect charge</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                Issue Details & Photos
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what happened..."
                rows={3}
                className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-semibold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FF6755] resize-none"
                required
              />
            </div>

            {submitted ? (
              <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Issue reported. Campus support team notified!</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider bg-[#FF6755] text-white hover:bg-[#E05342] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Report →</span>
              </button>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReportIssueModal;
