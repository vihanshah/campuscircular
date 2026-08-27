"use client"

import { Heart, Sparkles, ShieldCheck, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: "smooth",
      })
    }
  }

  return (
    <footer className="relative z-10 border-t border-[#e8e4df] py-16 px-4 sm:px-6 bg-[#faf8f5] text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 fill-current text-[#c8f54e]" />
              </div>
              <span className="font-serif font-semibold text-lg tracking-tight text-[#1a1a1a]">
                mentebloom
              </span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              A state-of-the-art mental wellness and academic stress management platform built for students.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>

          {/* Col 2: Platform Modules */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4">
              Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-700">
              <li>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, "features")} className="hover:text-black transition-colors">
                  WebGL MoodGate
                </a>
              </li>
              <li>
                <a href="#stress-engine" onClick={(e) => handleSmoothScroll(e, "stress-engine")} className="hover:text-black transition-colors">
                  Academic Stress Index
                </a>
              </li>
              <li>
                <a href="#habits" onClick={(e) => handleSmoothScroll(e, "habits")} className="hover:text-black transition-colors">
                  Habit Matrix & Streaks
                </a>
              </li>
              <li>
                <a href="#breathwork" onClick={(e) => handleSmoothScroll(e, "breathwork")} className="hover:text-black transition-colors">
                  4-4-4 Box Breathing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical & Support */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4">
              Clinical & Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-700">
              <li>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, "features")} className="hover:text-black transition-colors">
                  Counselor Directory
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleSmoothScroll(e, "reviews")} className="hover:text-black transition-colors">
                  Student Case Studies
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSmoothScroll(e, "faq")} className="hover:text-black transition-colors">
                  Privacy & Encryption
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSmoothScroll(e, "faq")} className="hover:text-black transition-colors">
                  Emergency Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Privacy & Standards */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4">
              Privacy First
            </h4>
            <div className="p-3.5 rounded-2xl bg-white border border-[#e8e4df] text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Local Device Storage
              </div>
              <p className="text-[11px] leading-relaxed">
                Your daily reflections and mood telemetry never leave your browser unencrypted.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#e8e4df] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center md:text-left text-[11px] leading-relaxed max-w-2xl">
            <strong>Medical Disclaimer:</strong> Mentebloom is a wellness and academic productivity tool. It is not intended to be a substitute for professional medical advice, clinical diagnosis, or emergency psychiatric treatment.
          </p>
          <div className="flex items-center gap-4 text-neutral-600 font-mono text-[11px]">
            <span>© {new Date().getFullYear()} Mentebloom</span>
            <span>•</span>
            <span className="text-emerald-700">v3.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
