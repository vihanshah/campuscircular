import React, { useState } from "react";
import { Settings, ShieldCheck, Bell, Smartphone, Mail, Lock, RefreshCw } from "lucide-react";

export const AdminSettingsTab: React.FC = () => {
  const [maxLoanDays, setMaxLoanDays] = useState("7");
  const [depositCap, setDepositCap] = useState("2000");
  const [enableTwilioSms, setEnableTwilioSms] = useState(true);
  const [enableResendEmail, setEnableResendEmail] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 text-white font-sans max-w-4xl">
      <div className="bg-[#1A1A24] p-6 rounded-3xl border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00F2FE] mb-1">
          <Settings className="w-4 h-4" />
          <span>Platform Operational Configuration</span>
        </div>
        <h2 className="text-2xl font-black text-white">Campus System Rules & API Toggles</h2>
        <p className="text-xs font-semibold text-white/60 mt-0.5">
          Configure security policies, loan boundaries, and live notification gateways.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#1A1A24] border border-white/10 rounded-3xl p-6 space-y-6">
        {savedSuccess && (
          <div className="bg-[#34D399]/20 border border-[#34D399]/40 text-[#34D399] p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
            <span>✓ Operational rules updated and saved to system memory!</span>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-black text-[#00F2FE] uppercase tracking-wider">1. Loan & Deposit Limits</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1">Max Loan Duration (Days)</label>
              <input
                type="number"
                value={maxLoanDays}
                onChange={(e) => setMaxLoanDays(e.target.value)}
                className="w-full bg-[#0F0F14] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#00F2FE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 mb-1">Max Escrow Deposit Cap (₹)</label>
              <input
                type="number"
                value={depositCap}
                onChange={(e) => setDepositCap(e.target.value)}
                className="w-full bg-[#0F0F14] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#00F2FE]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="text-sm font-black text-[#00F2FE] uppercase tracking-wider">2. Notification Gateways</h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-[#0F0F14] rounded-2xl border border-white/06 cursor-pointer">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-[#34D399]" />
                <div>
                  <div className="font-bold text-white">Twilio Automated SMS Gateway</div>
                  <div className="text-[10px] text-white/50">Send handover OTPs & overdue alerts via mobile SMS</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={enableTwilioSms}
                onChange={(e) => setEnableTwilioSms(e.target.checked)}
                className="w-4 h-4 accent-[#00F2FE]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-[#0F0F14] rounded-2xl border border-white/06 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B92CFF]" />
                <div>
                  <div className="font-bold text-white">Resend Email Delivery API</div>
                  <div className="text-[10px] text-white/50">Deliver official PDF agreements to college inbox</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={enableResendEmail}
                onChange={(e) => setEnableResendEmail(e.target.checked)}
                className="w-4 h-4 accent-[#00F2FE]"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#00F2FE] text-[#0F0F14] hover:bg-[#00F2FE]/80 font-black text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Save Settings →
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsTab;
