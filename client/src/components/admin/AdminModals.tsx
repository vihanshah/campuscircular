import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Scale, UserCheck, ShieldCheck } from "lucide-react";
import { OpenDispute } from "@/lib/adminData";

interface AdminModalsProps {
  activeModal: "overdue" | "dispute" | "disputes" | "verification" | "flagged" | "add_resource" | null;
  selectedDispute: OpenDispute | null;
  onClose: () => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({
  activeModal,
  selectedDispute,
  onClose,
}) => {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!activeModal && !selectedDispute) return null;

  const handleActionClick = (actionName: string) => {
    setSuccessMsg(`Action executed: ${actionName}`);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#1A1A24] border border-white/10 shadow-2xl rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative space-y-4 text-white"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-[#00F2FE]/20 text-[#00F2FE]">
              Admin Operations Console
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* OVERDUE REVIEW MODAL */}
          {activeModal === "overdue" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#F87171]" />
                <h3 className="text-xl font-extrabold text-white">Review Overdue Items</h3>
              </div>

              <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 text-xs space-y-2 text-white/80">
                <div className="font-extrabold text-white">MacBook Pro M2 (16GB RAM)</div>
                <div>Borrower: <strong>Neha Gupta</strong> · Owner: <strong>Rahul Verma</strong></div>
                <div className="text-red-400 font-mono font-bold">Status: 2 days overdue (Due Aug 25)</div>
                <div>System action: Automated reminder SMS & email dispatched.</div>
              </div>

              {successMsg ? (
                <div className="bg-[#34D399]/20 text-[#34D399] p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick("Direct Call Borrower")}
                    className="flex-1 py-3 rounded-2xl bg-[#232332] text-white hover:bg-white/10 text-xs font-bold uppercase"
                  >
                    Call Borrower
                  </button>

                  <button
                    type="button"
                    onClick={() => handleActionClick("Freeze Borrower Account & Hold Deposit")}
                    className="flex-1 py-3 rounded-2xl bg-[#F87171] text-white hover:bg-red-600 text-xs font-black uppercase shadow-md"
                  >
                    Hold Deposit
                  </button>
                </div>
              )}
            </div>
          )}

          {/* DISPUTE REVIEW MODAL */}
          {(activeModal === "disputes" || selectedDispute) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#F87171]" />
                <h3 className="text-xl font-extrabold text-white">Review Open Dispute</h3>
              </div>

              <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 text-xs space-y-2 text-white/80">
                <div className="font-extrabold text-white">
                  {selectedDispute?.resourceName || "Sony Camera 24-70mm Lens"}
                </div>
                <div>
                  Parties: <strong>{selectedDispute?.borrowerName || "Alex Morgan"}</strong> vs{" "}
                  <strong>{selectedDispute?.ownerName || "Arjun Sharma"}</strong>
                </div>
                <div className="text-amber-300 font-bold">
                  Issue: {selectedDispute?.issueType || "Damage Reported"}
                </div>
                <p className="italic text-white/70">
                  "{selectedDispute?.description || "Hairline scratch on front element filter reported upon return."}"
                </p>
              </div>

              {successMsg ? (
                <div className="bg-[#34D399]/20 text-[#34D399] p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick("Release Deposit to Owner")}
                    className="flex-1 py-3 rounded-2xl bg-[#00F2FE] text-[#0F0F14] hover:bg-cyan-300 text-xs font-black uppercase"
                  >
                    Release Deposit to Owner
                  </button>

                  <button
                    type="button"
                    onClick={() => handleActionClick("Refund Deposit to Borrower")}
                    className="flex-1 py-3 rounded-2xl bg-[#232332] text-white hover:bg-white/10 text-xs font-bold uppercase"
                  >
                    Refund Borrower
                  </button>
                </div>
              )}
            </div>
          )}

          {/* VERIFY USERS MODAL */}
          {activeModal === "verification" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#34D399]" />
                <h3 className="text-xl font-extrabold text-white">Verify Student Identity</h3>
              </div>

              <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 text-xs space-y-2 text-white/80">
                <div className="font-extrabold text-white">Leo Vance (CS '26)</div>
                <div>Submitted ID: <strong>leo.vance@tsec.edu</strong></div>
                <div className="text-[#34D399] font-mono font-bold">.edu domain verified ✓</div>
              </div>

              {successMsg ? (
                <div className="bg-[#34D399]/20 text-[#34D399] p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick("Approve Student Verification")}
                    className="w-full py-3 rounded-2xl bg-[#34D399] text-[#0F0F14] hover:bg-emerald-300 text-xs font-black uppercase shadow-md"
                  >
                    Approve Verification Badge ✓
                  </button>
                </div>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminModals;
