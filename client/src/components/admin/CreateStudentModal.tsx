import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserPlus,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Copy,
  Key,
  ShieldCheck,
  GraduationCap,
  Hash,
  User,
  Building2,
  Calendar,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { sendWelcomeEmail, sendWelcomeSms } from "@/lib/notificationApi";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentCreated?: (student: StudentFormData) => void;
}

export interface StudentFormData {
  studentId: string;
  fullName: string;
  email: string;
  mobile: string;
  department: string;
  year: string;
  password: string;
}

type PasswordMode = "generate" | "manual";
type DeliveryChannel = "email" | "sms";
type DeliveryStatus = "idle" | "sending" | "sent" | "error";

interface ChannelStatus {
  status: DeliveryStatus;
  error?: string;
}

function generatePassword(length = 10): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const special = "!@#$%";
  const all = upper + lower + digits + special;

  let pwd = "";
  pwd += upper[Math.floor(Math.random() * upper.length)];
  pwd += lower[Math.floor(Math.random() * lower.length)];
  pwd += digits[Math.floor(Math.random() * digits.length)];
  pwd += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    pwd += all[Math.floor(Math.random() * all.length)];
  }

  return pwd
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics & Telecom",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Data Science",
  "Artificial Intelligence",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Post-Graduate"];

export const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
  onStudentCreated,
}) => {
  // Form state
  const [form, setForm] = useState<StudentFormData>({
    studentId: "",
    fullName: "",
    email: "",
    mobile: "",
    department: "",
    year: "",
    password: "",
  });

  const [passwordMode, setPasswordMode] = useState<PasswordMode>("generate");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<Set<DeliveryChannel>>(
    new Set<DeliveryChannel>(["email", "sms"])
  );

  // Step state
  const [step, setStep] = useState<"form" | "preview" | "result">("form");
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  // Delivery state
  const [emailStatus, setEmailStatus] = useState<ChannelStatus>({ status: "idle" });
  const [smsStatus, setSmsStatus] = useState<ChannelStatus>({ status: "idle" });
  const [copied, setCopied] = useState(false);

  const updateForm = (field: keyof StudentFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleChannel = (ch: DeliveryChannel) => {
    setSelectedChannels((prev) => {
      const next = new Set(prev);
      if (next.has(ch)) next.delete(ch);
      else next.add(ch);
      return next;
    });
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof StudentFormData, string>> = {};

    if (!form.studentId.trim()) errors.studentId = "Student ID is required";
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.email.trim() || !form.email.includes("@")) errors.email = "Valid email is required";
    if (selectedChannels.has("sms") && !form.mobile.trim()) errors.mobile = "Mobile number is required for SMS";
    if (!form.department) errors.department = "Select a department";
    if (!form.year) errors.year = "Select a year";

    if (passwordMode === "manual" && (!form.password || form.password.length < 6)) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPreview = () => {
    if (!validateForm()) return;

    if (passwordMode === "generate") {
      setForm((prev) => ({ ...prev, password: generatePassword() }));
    }

    setStep("preview");
  };

  const handleSendCredentials = async () => {
    const promises: Promise<void>[] = [];

    if (selectedChannels.has("email")) {
      setEmailStatus({ status: "sending" });
      promises.push(
        sendWelcomeEmail({
          to: form.email,
          studentName: form.fullName,
          studentId: form.studentId,
          email: form.email,
          password: form.password,
        }).then((res) => {
          if (res.success) {
            setEmailStatus({ status: "sent" });
          } else {
            setEmailStatus({ status: "error", error: res.error });
          }
        })
      );
    }

    if (selectedChannels.has("sms") && form.mobile) {
      setSmsStatus({ status: "sending" });
      promises.push(
        sendWelcomeSms({
          to: form.mobile,
          studentName: form.fullName,
          studentId: form.studentId,
          password: form.password,
        }).then((res) => {
          if (res.success) {
            setSmsStatus({ status: "sent" });
          } else {
            setSmsStatus({ status: "error", error: res.error });
          }
        })
      );
    }

    await Promise.allSettled(promises);
    setStep("result");
  };

  const handleCopyCredentials = () => {
    const text = `Student ID: ${form.studentId}\nEmail: ${form.email}\nPassword: ${form.password}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDone = () => {
    if (onStudentCreated) {
      onStudentCreated(form);
    }
    resetAndClose();
  };

  const resetAndClose = () => {
    setForm({ studentId: "", fullName: "", email: "", mobile: "", department: "", year: "", password: "" });
    setPasswordMode("generate");
    setShowPassword(false);
    setSelectedChannels(new Set<DeliveryChannel>(["email", "sms"]));
    setStep("form");
    setFormErrors({});
    setEmailStatus({ status: "idle" });
    setSmsStatus({ status: "idle" });
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  const isSending = emailStatus.status === "sending" || smsStatus.status === "sending";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSending) resetAndClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          className="bg-[#1A1A24] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-[28px] w-full max-w-xl max-h-[90vh] overflow-y-auto relative"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#1A1A24] border-b border-white/06 px-6 py-4 flex items-center justify-between rounded-t-[28px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#00F2FE]/15 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#00F2FE]" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight">Add Student</h2>
                <p className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-wider">
                  {step === "form"
                    ? "Step 1 — Student Details"
                    : step === "preview"
                    ? "Step 2 — Review & Send"
                    : "Step 3 — Delivery Status"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              disabled={isSending}
              className="p-2 text-white/40 hover:text-white hover:bg-white/06 rounded-xl transition-all disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* ─── STEP 1: FORM ─── */}
            {step === "form" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Student ID + Full Name */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="Student ID"
                    icon={<Hash className="w-3.5 h-3.5" />}
                    value={form.studentId}
                    onChange={(v) => updateForm("studentId", v)}
                    placeholder="TSEC2025001"
                    error={formErrors.studentId}
                  />
                  <FormField
                    label="Full Name"
                    icon={<User className="w-3.5 h-3.5" />}
                    value={form.fullName}
                    onChange={(v) => updateForm("fullName", v)}
                    placeholder="Alex Morgan"
                    error={formErrors.fullName}
                  />
                </div>

                {/* Email + Mobile */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="College Email"
                    icon={<Mail className="w-3.5 h-3.5" />}
                    value={form.email}
                    onChange={(v) => updateForm("email", v)}
                    placeholder="alex@university.edu"
                    type="email"
                    error={formErrors.email}
                  />
                  <FormField
                    label="Mobile Number"
                    icon={<Phone className="w-3.5 h-3.5" />}
                    value={form.mobile}
                    onChange={(v) => updateForm("mobile", v)}
                    placeholder="+919876543210"
                    error={formErrors.mobile}
                  />
                </div>

                {/* Department + Year */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" />
                      Department
                    </label>
                    <select
                      value={form.department}
                      onChange={(e) => updateForm("department", e.target.value)}
                      className={`w-full bg-[#232332] border ${
                        formErrors.department ? "border-red-500/60" : "border-white/08"
                      } rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#00F2FE]/40 transition-all appearance-none cursor-pointer`}
                    >
                      <option value="">Select department</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {formErrors.department && (
                      <p className="text-[10px] text-red-400 font-bold mt-1">{formErrors.department}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      Year
                    </label>
                    <select
                      value={form.year}
                      onChange={(e) => updateForm("year", e.target.value)}
                      className={`w-full bg-[#232332] border ${
                        formErrors.year ? "border-red-500/60" : "border-white/08"
                      } rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#00F2FE]/40 transition-all appearance-none cursor-pointer`}
                    >
                      <option value="">Select year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {formErrors.year && (
                      <p className="text-[10px] text-red-400 font-bold mt-1">{formErrors.year}</p>
                    )}
                  </div>
                </div>

                {/* Separator */}
                <div className="border-t border-white/06 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-4 h-4 text-[#00F2FE]" />
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider">
                      Password Setup
                    </span>
                  </div>

                  {/* Password Mode Toggle */}
                  <div className="bg-[#232332] p-1 rounded-xl flex mb-3">
                    <button
                      type="button"
                      onClick={() => setPasswordMode("generate")}
                      className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                        passwordMode === "generate"
                          ? "bg-[#00F2FE] text-[#0F0F14] font-extrabold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Auto-Generate & Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setPasswordMode("manual")}
                      className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                        passwordMode === "manual"
                          ? "bg-[#00F2FE] text-[#0F0F14] font-extrabold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Set Manually
                    </button>
                  </div>

                  {passwordMode === "manual" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="relative"
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => updateForm("password", e.target.value)}
                        placeholder="Enter password (min 6 chars)"
                        className={`w-full bg-[#232332] border ${
                          formErrors.password ? "border-red-500/60" : "border-white/08"
                        } rounded-xl px-3 py-2.5 pr-10 text-xs font-semibold text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00F2FE]/40 transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {formErrors.password && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{formErrors.password}</p>
                      )}
                    </motion.div>
                  )}

                  {passwordMode === "generate" && (
                    <p className="text-[11px] text-white/50 font-medium leading-relaxed">
                      A secure password will be auto-generated and sent via the selected channels below.
                    </p>
                  )}
                </div>

                {/* Delivery Channels */}
                <div className="border-t border-white/06 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Send className="w-4 h-4 text-[#00F2FE]" />
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider">
                      Send Credentials Via
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <ChannelToggle
                      label="Email (Resend)"
                      icon={<Mail className="w-4 h-4" />}
                      checked={selectedChannels.has("email")}
                      onChange={() => toggleChannel("email")}
                      color="#34D399"
                    />
                    <ChannelToggle
                      label="SMS (Twilio)"
                      icon={<MessageSquare className="w-4 h-4" />}
                      checked={selectedChannels.has("sms")}
                      onChange={() => toggleChannel("sms")}
                      color="#00F2FE"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleProceedToPreview}
                  className="w-full py-3.5 rounded-2xl bg-[#00F2FE] text-[#0F0F14] font-extrabold text-sm uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_24px_rgba(0,242,254,0.2)] flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  Review & Create Student
                </button>
              </motion.div>
            )}

            {/* ─── STEP 2: PREVIEW ─── */}
            {step === "preview" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Student Summary Card */}
                <div className="bg-[#232332] border border-white/06 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#00F2FE]/15 flex items-center justify-center text-[#00F2FE] font-black text-lg">
                      {form.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white">{form.fullName}</div>
                      <div className="text-[11px] text-white/50 font-mono font-bold">
                        {form.studentId} · {form.department} · {form.year}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#1A1A24] rounded-xl p-2.5">
                      <div className="text-white/40 font-bold text-[10px] uppercase mb-0.5">Email</div>
                      <div className="text-white font-semibold truncate">{form.email}</div>
                    </div>
                    <div className="bg-[#1A1A24] rounded-xl p-2.5">
                      <div className="text-white/40 font-bold text-[10px] uppercase mb-0.5">Mobile</div>
                      <div className="text-white font-semibold">{form.mobile || "—"}</div>
                    </div>
                  </div>
                </div>

                {/* Password Preview */}
                <div className="bg-[#232332] border border-white/06 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">
                      Generated Password
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCredentials}
                      className="flex items-center gap-1 text-[10px] font-bold text-[#00F2FE] hover:text-cyan-300 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-[#1A1A24] rounded-xl p-3 font-mono text-sm font-bold text-[#00F2FE] tracking-wider select-all">
                    {form.password}
                  </div>
                </div>

                {/* Delivery Channels Summary */}
                <div className="bg-[#232332] border border-white/06 rounded-2xl p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 mb-2">
                    Will be sent via
                  </div>
                  <div className="flex gap-2">
                    {selectedChannels.has("email") && (
                      <span className="flex items-center gap-1.5 bg-[#34D399]/15 text-[#34D399] px-3 py-1.5 rounded-lg text-[11px] font-bold">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </span>
                    )}
                    {selectedChannels.has("sms") && (
                      <span className="flex items-center gap-1.5 bg-[#00F2FE]/15 text-[#00F2FE] px-3 py-1.5 rounded-lg text-[11px] font-bold">
                        <MessageSquare className="w-3.5 h-3.5" /> SMS
                      </span>
                    )}
                    {selectedChannels.size === 0 && (
                      <span className="text-[11px] text-white/40 font-medium">
                        No channels selected — credentials will only be shown here
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    disabled={isSending}
                    className="flex-1 py-3 rounded-2xl bg-[#232332] text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    Back to Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleSendCredentials}
                    disabled={isSending}
                    className="flex-1 py-3 rounded-2xl bg-[#00F2FE] text-[#0F0F14] font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_24px_rgba(0,242,254,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Create & Send
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: RESULT ─── */}
            {step === "result" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {/* Student Created Success */}
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-[#34D399]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#34D399]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">Student Account Created</h3>
                  <p className="text-xs text-white/50 font-medium">
                    {form.fullName} ({form.studentId}) has been provisioned.
                  </p>
                </div>

                {/* Delivery Status Cards */}
                {selectedChannels.has("email") && (
                  <DeliveryStatusCard
                    label="Email Delivery"
                    icon={<Mail className="w-4 h-4" />}
                    target={form.email}
                    channelStatus={emailStatus}
                    color="#34D399"
                  />
                )}

                {selectedChannels.has("sms") && (
                  <DeliveryStatusCard
                    label="SMS Delivery"
                    icon={<MessageSquare className="w-4 h-4" />}
                    target={form.mobile}
                    channelStatus={smsStatus}
                    color="#00F2FE"
                  />
                )}

                {/* Credentials Copy Section */}
                <div className="bg-[#232332] border border-white/06 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">
                      Credentials
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCredentials}
                      className="flex items-center gap-1 text-[10px] font-bold text-[#00F2FE] hover:text-cyan-300 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Credentials
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-[#1A1A24] rounded-xl p-3 text-xs space-y-1 font-mono">
                    <div>
                      <span className="text-white/40">ID:</span>{" "}
                      <span className="text-white font-bold">{form.studentId}</span>
                    </div>
                    <div>
                      <span className="text-white/40">Email:</span>{" "}
                      <span className="text-white font-bold">{form.email}</span>
                    </div>
                    <div>
                      <span className="text-white/40">Password:</span>{" "}
                      <span className="text-[#00F2FE] font-bold">{form.password}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDone}
                  className="w-full py-3.5 rounded-2xl bg-[#00F2FE] text-[#0F0F14] font-extrabold text-sm uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_24px_rgba(0,242,254,0.2)]"
                >
                  Done
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Sub-components ─────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon, value, onChange, placeholder, type = "text", error }) => (
  <div>
    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1.5">
      {icon}
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-[#232332] border ${
        error ? "border-red-500/60" : "border-white/08"
      } rounded-xl px-3 py-2.5 text-xs font-semibold text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00F2FE]/40 transition-all`}
    />
    {error && <p className="text-[10px] text-red-400 font-bold mt-1">{error}</p>}
  </div>
);

interface ChannelToggleProps {
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  color: string;
}

const ChannelToggle: React.FC<ChannelToggleProps> = ({ label, icon, checked, onChange, color }) => (
  <button
    type="button"
    onClick={onChange}
    className={`flex-1 flex items-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
      checked
        ? "border-opacity-40 bg-opacity-15"
        : "border-white/08 text-white/40 hover:text-white/60"
    }`}
    style={
      checked
        ? { borderColor: color, backgroundColor: `${color}15`, color }
        : undefined
    }
  >
    {icon}
    <span>{label}</span>
    <div
      className={`ml-auto w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black transition-all ${
        checked ? "text-[#0F0F14]" : "border border-white/20"
      }`}
      style={checked ? { backgroundColor: color } : undefined}
    >
      {checked && "✓"}
    </div>
  </button>
);

interface DeliveryStatusCardProps {
  label: string;
  icon: React.ReactNode;
  target: string;
  channelStatus: ChannelStatus;
  color: string;
}

const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({
  label,
  icon,
  target,
  channelStatus,
  color,
}) => (
  <div className="bg-[#232332] border border-white/06 rounded-2xl p-4 flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-extrabold text-white">{label}</div>
        <div className="text-[11px] text-white/40 font-mono truncate">{target}</div>
      </div>
      <div className="shrink-0">
        {channelStatus.status === "sending" && (
          <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
        )}
        {channelStatus.status === "sent" && (
          <div className="flex items-center gap-1 text-[#34D399]">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Sent</span>
          </div>
        )}
        {channelStatus.status === "error" && (
          <div className="flex items-center gap-1 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold">Failed</span>
          </div>
        )}
      </div>
    </div>
    {channelStatus.status === "error" && channelStatus.error && (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-[11px] text-red-300 font-mono leading-relaxed break-words">
        ⚠️ {channelStatus.error}
      </div>
    )}
  </div>
);

export default CreateStudentModal;
