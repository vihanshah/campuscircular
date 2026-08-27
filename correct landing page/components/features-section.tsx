"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Brain, 
  Flame, 
  Droplets, 
  Moon, 
  BookOpen, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  HeartHandshake
} from "lucide-react"

// Mood previews for interactive MoodGate demo
const MOODS = [
  { id: "sad", label: "Sad", emoji: "😔", color: "#a33d4e", quote: "Tough times never last, but tough people do." },
  { id: "low", label: "Low", emoji: "🌧️", color: "#7a52a3", quote: "Small progress is still progress. Be gentle with yourself." },
  { id: "neutral", label: "Okay", emoji: "😐", color: "#6b7280", quote: "A steady mind conquers any challenge." },
  { id: "good", label: "Good", emoji: "🙂", color: "#3b82f6", quote: "Focus on your strengths and keep moving forward." },
  { id: "great", label: "Great", emoji: "✨", color: "#10b981", quote: "You are capable of achieving extraordinary things today." },
]

export function FeaturesSection() {
  const [selectedMood, setSelectedMood] = useState(MOODS[4])
  const [waterCount, setWaterCount] = useState(5)
  const [habitsState, setHabitsState] = useState([
    { name: "Morning Meditation", done: [true, true, true, true, true, false, true] },
    { name: "Read 20 Pages", done: [true, false, true, true, true, true, true] },
    { name: "Deep Study 2h", done: [true, true, true, false, true, true, true] },
  ])
  const [academicSlider, setAcademicSlider] = useState(68)

  const toggleHabit = (hIndex: number, dIndex: number) => {
    setHabitsState(prev => {
      const next = [...prev]
      next[hIndex].done[dIndex] = !next[hIndex].done[dIndex]
      return next
    })
  }

  const getStressLevel = (val: number) => {
    if (val <= 20) return { label: "Relaxed", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }
    if (val <= 40) return { label: "Manageable", color: "text-blue-600 bg-blue-50 border-blue-200" }
    if (val <= 60) return { label: "Moderate", color: "text-amber-600 bg-amber-50 border-amber-200" }
    if (val <= 80) return { label: "Overloaded", color: "text-orange-600 bg-orange-50 border-orange-200" }
    return { label: "Critical", color: "text-rose-600 bg-rose-50 border-rose-200" }
  }

  const stressInfo = getStressLevel(academicSlider)

  return (
    <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#faf8f5] text-[#1a1a1a] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e0d8_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8e4df]/60 border border-[#d8d3cb] text-xs font-mono font-medium text-neutral-700 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            INTELLIGENT SUITE
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1a1a1a] leading-[1.15]">
            Engineered for student balance & emotional clarity
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
            Every tool is designed to work together seamlessly — from shader-driven mood check-ins to algorithmic workload tracking and accredited clinical consultation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 1. WebGL MoodGate Check-In Card (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 rounded-3xl bg-[#111111] text-white p-6 sm:p-8 border border-neutral-800 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Dynamic Mood Background Glow */}
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[90px] opacity-40 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: selectedMood.color }}
            />

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#c8f54e]">
                  <Sparkles className="w-3.5 h-3.5" /> 01 • MOODGATE
                </span>
                <span className="text-xs text-white/50 font-mono">Dynamic WebGL Sine-Plasma</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-2">
                Shader-Driven Daily Mood Check-In
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Interactive raymarching plasma shader that shifts hues in real-time as you log emotions, factors, and reflections before entering your dashboard.
              </p>

              {/* Interactive Mood Selector */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md mb-4">
                <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-3">Try Selecting Your Mood:</p>
                <div className="grid grid-cols-5 gap-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMood(m)}
                      type="button"
                      className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl transition-all ${
                        selectedMood.id === m.id
                          ? "bg-white/20 scale-105 border border-white/40 shadow-md"
                          : "hover:bg-white/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl">{m.emoji}</span>
                      <span className="text-[11px] font-medium text-white/90">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Quote Box */}
              <div
                className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3 transition-all"
                style={{ borderLeftColor: selectedMood.color, borderLeftWidth: "4px" }}
              >
                <span className="text-lg">💭</span>
                <div>
                  <p className="text-xs font-mono text-white/50 uppercase">Daily Personalized Inspiration</p>
                  <p className="text-sm text-white/90 italic font-serif">"{selectedMood.quote}"</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
              <span>RGB Lerping • Smooth Color Morphs</span>
              <span className="text-[#c8f54e]">100% Local Storage</span>
            </div>
          </motion.div>

          {/* 2. Academic Stress Engine Card (Span 5) */}
          <motion.div
            id="stress-engine"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 rounded-3xl bg-white p-6 sm:p-8 border border-[#e8e4df] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                  <Brain className="w-3.5 h-3.5 text-purple-600" /> 02 • ALGORITHMIC
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium border ${stressInfo.color}`}>
                  {stressInfo.label} ({academicSlider}/100)
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-2">
                Subject Workload & Stress Index
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Calculates weighted study hours, difficulty tags, and deadline urgency into a single, actionable 0–100 academic strain index.
              </p>

              {/* Stress Gauge Simulator */}
              <div className="bg-[#faf8f5] p-4 rounded-2xl border border-[#e8e4df] mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-neutral-600">Simulate Course Load:</span>
                  <span className="text-sm font-bold font-mono text-[#1a1a1a]">{academicSlider}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={academicSlider}
                  onChange={(e) => setAcademicSlider(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                />
                
                {/* Micro Course Items */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-[#e8e4df]">
                    <span className="font-medium text-neutral-800">Quantum Computing Assignment</span>
                    <span className="text-rose-600 font-mono font-medium bg-rose-50 px-2 py-0.5 rounded">Due 18h • Hard</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-[#e8e4df]">
                    <span className="font-medium text-neutral-800">Data Structures Problem Set</span>
                    <span className="text-amber-600 font-mono font-medium bg-amber-50 px-2 py-0.5 rounded">Due 3d • Med</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e8e4df] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Automatic Urgency Multipliers</span>
              <span className="text-emerald-700 font-medium">Prioritizes High Strain</span>
            </div>
          </motion.div>

          {/* 3. 7-Day & 30-Day Habit Matrix (Span 6) */}
          <motion.div
            id="habits"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-[#e8e4df] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                  <Flame className="w-3.5 h-3.5 text-orange-500" /> 03 • CONSISTENCY
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  <Flame className="w-3 h-3 fill-current" /> 14-DAY STREAK
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-2">
                Habit Matrix & Animated Gradient Streaks
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Interactive week-at-a-glance and 30-day calendar views with future date locking, micro-animations, and rotating conic gradient streak borders.
              </p>

              {/* Interactive Habit Table Preview */}
              <div className="border border-[#e8e4df] rounded-2xl overflow-hidden bg-[#faf8f5]">
                <div className="grid grid-cols-8 text-[11px] font-mono text-neutral-500 p-2.5 bg-[#f3efe9] border-b border-[#e8e4df]">
                  <span className="col-span-4">Habit</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>Today</span>
                </div>
                {habitsState.map((habit, hIdx) => (
                  <div key={habit.name} className="grid grid-cols-8 items-center p-2.5 text-xs border-b last:border-b-0 border-[#e8e4df]/60 hover:bg-white transition-colors">
                    <span className="col-span-4 font-medium text-neutral-800 truncate pr-1">{habit.name}</span>
                    {habit.done.slice(0, 4).map((d, dIdx) => (
                      <button
                        key={dIdx}
                        type="button"
                        onClick={() => toggleHabit(hIdx, dIdx)}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          d
                            ? "bg-[#1a1a1a] text-white shadow-sm"
                            : "border border-neutral-300 bg-white hover:border-neutral-500"
                        }`}
                      >
                        {d && <CheckCircle2 className="w-3.5 h-3.5 text-[#c8f54e]" />}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e4df] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Interactive Time-Travel Grid</span>
              <span className="text-emerald-700 font-medium">93% Weekly Consistency</span>
            </div>
          </motion.div>

          {/* 4. Sleep, Hydration & Physical Wellness (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-[#e8e4df] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" /> 04 • BIOMETRICS
                </span>
                <span className="text-xs font-mono text-neutral-500">Physical & Mental Synergy</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-2">
                Hydration & Restorative Sleep Rhythms
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Correlates sleep quality ratings and hydration targets against daily mood and academic output to uncover wellness patterns.
              </p>

              {/* Interactive Water & Sleep Widget Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e4df] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-600 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" /> Hydration
                    </span>
                    <span className="text-xs font-bold font-mono text-blue-600">{waterCount * 250} / 2000 ml</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-blue-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${Math.min((waterCount / 8) * 100, 100)}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setWaterCount(c => c >= 8 ? 0 : c + 1)}
                    className="w-full py-1.5 px-2 rounded-lg bg-white border border-[#e8e4df] text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-2xs"
                  >
                    + Add 250ml Glass
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e4df] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-600 flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5 text-indigo-500" /> Sleep Quality
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-600">8.2 hrs (Good)</span>
                  </div>
                  <div className="flex items-end gap-1 h-8 mb-2">
                    {[65, 75, 50, 85, 90, 80, 95].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${i === 6 ? "bg-emerald-500" : "bg-neutral-300"}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono text-center">7-day restorative trend</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e4df] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Automatic Correlation Engine</span>
              <span className="text-emerald-700 font-medium">Optimal Sleep Achieved</span>
            </div>
          </motion.div>

          {/* 5. Clinical Counselor Directory (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-[#e8e4df] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> 05 • CLINICAL CARE
                </span>
                <span className="text-xs font-mono text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  AIIMS & NIMHANS
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-2">
                Certified Clinical Counselor Directory
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Direct booking access with verified psychologists specializing in student burnout, exam anxiety, and emotional well-being.
              </p>

              {/* Counselor Card Sample */}
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e4df] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-serif font-bold text-lg">
                  PS
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-neutral-900">Dr. Priya Sharma, Ph.D.</h4>
                    <span className="text-xs font-mono text-amber-600 font-bold">★ 4.9 (120+)</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-mono">Senior Clinical Psychologist • NIMHANS</p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#e8e4df] text-neutral-700">Academic Anxiety</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#e8e4df] text-neutral-700">Burnout</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e4df] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Confidential 1-on-1 Sessions</span>
              <span className="text-emerald-700 font-medium">Verified Credentials</span>
            </div>
          </motion.div>

          {/* 6. Sentiment Reflection Journal (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-[#e8e4df] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" /> 06 • REFLECTION
                </span>
                <span className="text-xs font-mono text-neutral-500">Auto-Sentiment Tagging</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a] mb-2">
                Daily Journal & Sentiment Intelligence
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Guided prompt templates with instant sentiment analysis, tags, and encrypted local storage for private thoughts.
              </p>

              {/* Journal Mock */}
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e4df] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-500">Prompt: "What brought you calm today?"</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-medium">
                    ✨ Positive & Reflective
                  </span>
                </div>
                <p className="text-xs text-neutral-700 italic font-serif leading-relaxed bg-white p-3 rounded-xl border border-[#e8e4df]">
                  "Taking 10 minutes to sit by the campus trees between classes gave my mind space to reset before the algorithm exam."
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e8e4df] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Automatic Encryption</span>
              <span className="text-emerald-700 font-medium">Never Sent to Cloud</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
