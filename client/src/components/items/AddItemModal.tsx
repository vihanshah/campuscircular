import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Upload, CheckCircle2, ArrowRight, Camera, Sparkles } from "lucide-react";
import { OwnedResource } from "@/lib/itemsData";
import { BRAND_COLORS } from "@/lib/theme";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (newItem: OwnedResource) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [step, setStep] = useState(1);
  
  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState<OwnedResource["category"]>("Photography");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState<OwnedResource["condition"]>("Excellent");
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [availabilityOpt, setAvailabilityOpt] = useState("Always available");
  const [pricePerDay, setPricePerDay] = useState("100");
  const [depositAmount, setDepositAmount] = useState("300");
  const [rules, setRules] = useState([
    "Handle with care",
    "College ID required at handover",
    "Return before 6:00 PM",
    "All accessories must be returned"
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    const priceNum = parseInt(pricePerDay) || 0;
    const newItem: OwnedResource = {
      id: `item-${Date.now()}`,
      name: name || "New Campus Resource",
      category,
      cardColor: BRAND_COLORS.pastelLavender,
      status: "Available",
      statusBg: "#E2F1D0",
      statusTextColor: "#15803D",
      condition,
      pricePerDay: priceNum,
      priceDisplay: priceNum === 0 ? "Free" : `₹${priceNum}/day`,
      depositDisplay: `₹${depositAmount} deposit`,
      successfulLoansCount: 0,
      rating: 5.0,
      description: description || "Freshly listed campus resource ready to share.",
      rules,
      earningsTotal: "₹0",
    };

    setTimeout(() => {
      onAddItem(newItem);
      setIsSuccess(false);
      setStep(1);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative space-y-4"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFD928] text-[#151515] flex items-center justify-center font-black text-sm">
                +
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#151515]">
                List New Resource · Step {step} of 5
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

          {/* Progress Dots */}
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s <= step ? "bg-[#151518]" : "bg-[#151515]/10"
                }`}
              />
            ))}
          </div>

          {/* STEP 1 — RESOURCE DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#151515]">Step 1 — Resource Info</h3>
              <div>
                <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                  Resource Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sony Alpha A7 IV Camera Kit"
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#B92CFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515]"
                >
                  <option value="Photography">Photography</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="Music">Music</option>
                  <option value="Events">Events</option>
                  <option value="Tools">Tools</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                  Description & Included Accessories
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your resource and list included parts..."
                  rows={3}
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-semibold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#B92CFF] resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2 — CONDITION & PHOTOS */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#151515]">Step 2 — Condition & Photos</h3>
              <div>
                <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1.5">
                  Item Condition
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["New", "Excellent", "Good", "Fair"] as const).map((cond) => (
                    <button
                      type="button"
                      key={cond}
                      onClick={() => setCondition(cond)}
                      className={`p-3 rounded-2xl border text-xs font-black transition-all ${
                        condition === cond
                          ? "bg-[#151518] text-[#FDF0A6] border-transparent shadow-xs"
                          : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                  Resource Photo Upload
                </label>
                <div
                  onClick={() => setPhotoUploaded(true)}
                  className="border-2 border-dashed border-[#151515]/20 bg-[#F8F6F0] rounded-2xl p-5 text-center cursor-pointer hover:border-[#151518] transition-all"
                >
                  <Upload className="w-6 h-6 mx-auto mb-1 text-[#151515]/40" />
                  <span className="text-xs font-bold text-[#151515]">Photo attached & verified</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — AVAILABILITY */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#151515]">Step 3 — Availability</h3>
              <div className="space-y-2">
                {["Always available", "Specific dates only", "Currently unavailable"].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setAvailabilityOpt(opt)}
                    className={`w-full p-3.5 rounded-2xl border text-xs font-extrabold text-left transition-all ${
                      availabilityOpt === opt
                        ? "bg-[#151518] text-[#FDF0A6] border-transparent shadow-xs"
                        : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 — BORROWING TERMS */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#151515]">Step 4 — Borrowing Terms</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                    Daily Rate (₹/day)
                  </label>
                  <input
                    type="number"
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    placeholder="0 for Free"
                    className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="300"
                    className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 — RULES & PREVIEW */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#151515]">Step 5 — Final Rules & Preview</h3>
              <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 text-xs space-y-2">
                <div className="font-extrabold text-sm text-[#151515]">{name || "Sony Camera Kit"}</div>
                <div className="text-[#151515]/75">Category: {category} · Condition: {condition}</div>
                <div className="text-[#151515]/75">Terms: {pricePerDay === "0" ? "Free" : `₹${pricePerDay}/day`} · ₹{depositAmount} deposit</div>
              </div>

              <div className="space-y-1.5 text-xs font-bold text-[#151515]">
                {rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          {isSuccess ? (
            <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Your item is ready to share on campus!</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 rounded-2xl bg-[#F8F6F0] text-[#151515] font-bold text-xs uppercase hover:bg-[#E8E4DA]"
                >
                  ← Back
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex-1 py-3 rounded-2xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-all font-black text-xs uppercase shadow-md"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="flex-1 py-3.5 rounded-2xl bg-[#151518] text-[#FDF0A6] hover:bg-[#B92CFF] hover:text-white transition-all font-black text-xs uppercase tracking-wider shadow-md"
                >
                  List item →
                </button>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddItemModal;
