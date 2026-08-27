"use client"

import { Sparkles, ShieldCheck, Zap, Heart } from "lucide-react"
import SpecularButton from "./ui/SpecularButton"

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#070707] text-white">
      {/* Background radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-[#c8f54e] mb-6">
          <Heart className="w-3.5 h-3.5 fill-current" />
          START TODAY
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white mb-6">
          Ready to master your academic workload & emotional balance?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of students who start their morning with a mindful WebGL mood check-in and stay on top of exams with algorithmic clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <SpecularButton
            size="lg"
            radius={22}
            tint="#ffffff"
            tintOpacity={0.15}
            blur={14}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#999999"
            intensity={1.3}
            shineSize={18}
            shineFade={45}
            thickness={1.5}
            speed={0.35}
            followMouse={true}
            proximity={250}
            autoAnimate={true}
          >
            <span className="flex items-center gap-2 text-base font-semibold px-4 py-1">
              <Sparkles className="w-4 h-4 text-[#c8f54e]" />
              Launch Mentebloom Now →
            </span>
          </SpecularButton>
        </div>

        {/* Feature Highlights Pill Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-mono">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#c8f54e]" /> Instant 10-Second Setup
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 100% Private Local Storage
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Free for All Students
          </span>
        </div>
      </div>
    </section>
  )
}
