import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  School, 
  Lock, 
  Mail, 
  Loader2, 
  RefreshCw, 
  Check
} from "lucide-react";
import CircularHeroIllustration from "./CircularHeroIllustration";
import { BRAND_COLORS, COMMUNITY_STATS } from "@/lib/theme";
import { authenticateUser } from "@/lib/appStore";

interface CampusCircularLoginProps {
  onSuccess?: (role: "student" | "admin", email: string) => void;
}

export const CampusCircularLogin: React.FC<CampusCircularLoginProps> = ({ onSuccess }) => {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("CC1003");
  const [password, setPassword] = useState("pass1003");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successState, setSuccessState] = useState<{ active: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMsg(`Please enter your ${role === "student" ? "User ID (e.g. CC1001)" : "Admin email"}.`);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const authResult = authenticateUser(trimmed, password, role);

      if (!authResult.success) {
        setErrorMsg(authResult.error || "Invalid credentials. Please try again.");
        return;
      }

      const activeRole = authResult.role || role;
      const userName = authResult.user ? authResult.user.name : "Administrator";

      const successMsg = activeRole === "student" 
        ? `Welcome back, ${userName} (${authResult.user?.id})!`
        : `Admin session verified for ${userName}!`;

      setSuccessState({
        active: true,
        message: successMsg,
      });

      if (onSuccess) {
        onSuccess(activeRole, trimmed);
      }
    }, 600);
  };

  const handleRoleChange = (newRole: "student" | "admin") => {
    setRole(newRole);
    setErrorMsg(null);
    if (newRole === "admin") {
      setEmail("admin@campus.edu");
      setPassword("admin123");
    } else {
      setEmail("CC1003");
      setPassword("pass1003");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDF7] text-[#151515] flex flex-col justify-between selection:bg-[#FFD928] selection:text-[#151515] font-sans relative overflow-x-hidden">
      
      {/* Subtle Editorial Graph Paper Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #151515 1px, transparent 1px),
            linear-gradient(to bottom, #151515 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px"
        }}
      />

      {/* Main Container */}
      <div className="container max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* TOP BRAND HEADER */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD928] border border-[#151515]/10 shadow-[0_4px_12px_rgba(255,217,40,0.4)] flex items-center justify-center font-black text-lg text-[#151515]">
              ♻
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#151515] leading-none uppercase">
                CAMPUS CIRCULAR
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#151515]/50 uppercase mt-0.5">
                TRUSTED RESOURCE SHARING
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D8FF32] border border-[#151515]/20 animate-pulse" />
            <span className="text-xs font-bold text-[#151515]/80">Campus Network Online</span>
          </div>
        </div>

        {/* TWO-PART CLASSO EDITORIAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE — BRAND / HERO */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1">
            
            <div className="mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 bg-[#B92CFF]/10 border border-[#B92CFF]/20 text-[#B92CFF] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Waste · Verified Campus Trust</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#151515] leading-[1.08]">
                Your campus.<br />
                <span className="relative inline-block">
                  Your resources.
                  <svg className="absolute left-0 -bottom-1 w-full h-3 text-[#FFD928] pointer-events-none -z-10 opacity-70" viewBox="0 0 300 12" fill="none">
                    <path d="M2.5 9.5C80 2.5 220 2.5 297.5 9.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
                </span><br />
                <span className="text-[#B92CFF]">Your circle.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg font-medium text-[#151515]/75 max-w-md leading-relaxed">
                Borrow what you need. <span className="font-bold text-[#151515]">Share what you have.</span>
              </p>
            </div>

            <div className="w-full relative my-1">
              <CircularHeroIllustration />
            </div>

          </div>

          {/* RIGHT SIDE — CLASSO ORGANIC LOGIN CARD */}
          <div className="lg:col-span-5 order-2">
            
            <div className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.06)] rounded-[32px] p-6 sm:p-8 relative">
              
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  {role === "student" ? (
                    <motion.div
                      key="header-student"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
                        Welcome back 👋
                      </h2>
                      <p className="text-sm font-medium text-[#151515]/60 mt-1">
                        Sign in to your campus community.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="header-admin"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
                        Campus administration
                      </h2>
                      <p className="text-sm font-medium text-[#151515]/60 mt-1">
                        Manage your campus resource-sharing network.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ROLE SELECTOR (Classo Segmented Pill Control) */}
              <div className="bg-[#F3EFE6]/70 border border-[#151515]/10 p-1.5 rounded-2xl flex items-center mb-6 relative">
                <button
                  type="button"
                  onClick={() => handleRoleChange("student")}
                  className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 relative z-10 flex items-center justify-center gap-2 ${
                    role === "student" ? "text-[#151515]" : "text-[#151515]/50 hover:text-[#151515]"
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("admin")}
                  className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 relative z-10 flex items-center justify-center gap-2 ${
                    role === "admin" ? "text-[#FFFDF7]" : "text-[#151515]/50 hover:text-[#151515]"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin</span>
                </button>

                <motion.div
                  layout
                  className={`absolute top-1.5 bottom-1.5 rounded-xl border border-[#151515]/10 shadow-sm z-0 ${
                    role === "student" ? "left-1.5 w-[calc(50%-0.375rem)] bg-[#FFD928]" : "left-[calc(50%+0.1875rem)] w-[calc(50%-0.375rem)] bg-[#B92CFF]"
                  }`}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              </div>

              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-[#FF6755]/10 border border-[#FF6755]/40 text-[#151515] text-xs font-bold p-3 rounded-xl flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FF6755] text-white flex items-center justify-center text-[10px] font-black shrink-0">!</span>
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                    {role === "student" ? "Student ID or College Email" : "Admin Email"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#151515]/40">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={role === "student" ? "TSEC2025001 or alex@university.edu" : "admin@university.edu"}
                      className="w-full bg-[#FFFDF7] border border-[#151515]/15 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#FFD928] focus:border-transparent transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80">
                      {role === "student" ? "Password" : "Admin Password"}
                    </label>
                    <a
                      href="#forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password reset instructions have been sent to your college portal.");
                      }}
                      className="text-xs font-bold text-[#151515]/60 hover:text-[#151515] hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#151515]/40">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#FFFDF7] border border-[#151515]/15 rounded-2xl pl-10 pr-10 py-3 text-sm font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#FFD928] focus:border-transparent transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#151515]/40 hover:text-[#151515]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-0 ${
                    role === "student" 
                      ? "bg-[#FFD928] text-[#151515] hover:bg-[#FFE156]" 
                      : "bg-[#B92CFF] text-[#FFFDF7] hover:bg-[#C64EFF]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>{role === "student" ? "Sign in →" : "Admin Sign In →"}</span>
                    </>
                  )}
                </button>

                {role === "student" && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        setSuccessState({
                          active: true,
                          message: "Authenticated via College SSO!",
                        });
                      }, 1000);
                    }}
                    className="w-full py-3 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider bg-[#FFFDF7] text-[#151515] border border-[#151515]/15 hover:bg-[#F3EFE6] transition-all flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <School className="w-4 h-4 text-[#B92CFF]" />
                    <span>Continue with College SSO</span>
                  </button>
                )}

                {role === "student" && (
                  <div className="pt-2 border-t border-[#151515]/08 space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-[#151515]/60">
                      ⚡ Demo Students (Click to test cross-user flow):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["CC1001", "CC1002", "CC1003", "CC1004", "CC1005", "CC1006", "CC1007", "CC1008", "CC1009", "CC1010"].map((stId) => (
                        <button
                          key={stId}
                          type="button"
                          onClick={() => {
                            setEmail(stId);
                            setPassword(`pass${stId.toLowerCase().replace("cc", "")}`);
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                            email === stId
                              ? "bg-[#151518] text-[#FFD928]"
                              : "bg-[#F3EFE6] text-[#151515] hover:bg-[#FFD928]/40"
                          }`}
                        >
                          {stId}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              {role === "student" && (
                <div className="mt-6 pt-4 border-t border-[#151515]/08 text-center">
                  <a
                    href="#create-account"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Student Account Creation Form — Open for verified campus domains (.edu)");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#151515]/80 hover:text-[#B92CFF] transition-colors"
                  >
                    <span>New to Campus Circular? → <strong className="font-extrabold text-[#151515]">Create student account</strong></span>
                  </a>
                </div>
              )}

              <div className="mt-6 bg-[#CDEFEA]/30 border border-[#151515]/08 rounded-2xl p-3 flex items-start gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-[#151515] text-[#D8FF32] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#151515]">
                    {role === "student" ? "Campus verified" : "Authorized Access Only"}
                  </span>
                  <span className="text-[11px] text-[#151515]/60 font-medium leading-normal mt-0.5">
                    {role === "student" 
                      ? "Your college identity helps keep exchanges trusted."
                      : "Authorized campus administrators only."}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* COMMUNITY SIGNAL (EDITORIAL PROOF STRIP) */}
        <div className="mt-10 lg:mt-12">
          <div className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] rounded-2xl px-5 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#151515]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D8FF32] border border-[#151515]/20" />
              <span>COMMUNITY PROOF</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-bold text-[#151515]/90">
              <div className="flex items-center gap-1.5">
                <span className="text-base">♻</span>
                <span><strong className="font-black text-[#B92CFF]">{COMMUNITY_STATS.shared}</strong> resources shared</span>
              </div>
              <span className="hidden sm:inline text-[#151515]/20">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base">🤝</span>
                <span><strong className="font-black text-[#151515]">{COMMUNITY_STATS.exchanges}</strong> successful exchanges</span>
              </div>
              <span className="hidden sm:inline text-[#151515]/20">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base">💰</span>
                <span><strong className="font-black text-[#FF6755]">{COMMUNITY_STATS.saved}</strong> saved</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-[#151515]/50">
              <span>Updated live</span>
            </div>

          </div>
        </div>

      </div>

      {/* MOCK AUTHENTICATION SUCCESS MODAL */}
      <AnimatePresence>
        {successState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[32px] p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-[#FFD928] flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
                🎉
              </div>
              
              <h3 className="text-2xl font-black text-[#151515] mb-2">
                Authentication Successful
              </h3>
              
              <p className="text-sm font-medium text-[#151515]/75 mb-6">
                {successState.message}
              </p>

              <button
                type="button"
                onClick={() => setSuccessState(null)}
                className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm uppercase bg-[#151515] text-[#FFFDF7] hover:bg-[#B92CFF] transition-colors shadow-md"
              >
                Continue to Campus Circle →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CampusCircularLogin;
