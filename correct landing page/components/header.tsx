"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight, Sparkles, Heart } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)

    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 rounded-full border ${
          isScrolled
            ? "bg-[#faf8f5]/85 dark:bg-[#111111]/85 backdrop-blur-xl border-[#e8e4df]/80 dark:border-white/10 shadow-lg px-4 sm:px-6 py-2.5"
            : "bg-black/40 backdrop-blur-md border-white/15 px-4 sm:px-6 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isScrolled
                ? "bg-[#1a1a1a] text-white dark:bg-white dark:text-black"
                : "bg-white/15 text-white border border-white/20"
            }`}>
              <Heart className="w-4 h-4 fill-current text-[#c8f54e]" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm sm:text-base font-serif font-semibold tracking-tight transition-colors ${
                isScrolled ? "text-[#1a1a1a] dark:text-white" : "text-white"
              }`}>
                mentebloom
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#2e7d32] dark:hover:text-[#c8f54e] ${
                isScrolled ? "text-neutral-700 dark:text-neutral-300" : "text-white/80 hover:text-white"
              }`}
            >
              Features
            </a>
            <a
              href="#stress-engine"
              onClick={(e) => handleSmoothScroll(e, "stress-engine")}
              className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#2e7d32] dark:hover:text-[#c8f54e] ${
                isScrolled ? "text-neutral-700 dark:text-neutral-300" : "text-white/80 hover:text-white"
              }`}
            >
              Academic Stress
            </a>
            <a
              href="#habits"
              onClick={(e) => handleSmoothScroll(e, "habits")}
              className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#2e7d32] dark:hover:text-[#c8f54e] ${
                isScrolled ? "text-neutral-700 dark:text-neutral-300" : "text-white/80 hover:text-white"
              }`}
            >
              Habit Matrix
            </a>
            <a
              href="#breathwork"
              onClick={(e) => handleSmoothScroll(e, "breathwork")}
              className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#2e7d32] dark:hover:text-[#c8f54e] ${
                isScrolled ? "text-neutral-700 dark:text-neutral-300" : "text-white/80 hover:text-white"
              }`}
            >
              Breathwork
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleSmoothScroll(e, "reviews")}
              className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#2e7d32] dark:hover:text-[#c8f54e] ${
                isScrolled ? "text-neutral-700 dark:text-neutral-300" : "text-white/80 hover:text-white"
              }`}
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className={`text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#2e7d32] dark:hover:text-[#c8f54e] ${
                isScrolled ? "text-neutral-700 dark:text-neutral-300" : "text-white/80 hover:text-white"
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                isScrolled
                  ? "bg-[#1a1a1a] text-white hover:bg-black dark:bg-[#c8f54e] dark:text-black"
                  : "bg-white text-black hover:bg-neutral-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isScrolled
                  ? "text-[#1a1a1a] hover:bg-black/5 dark:text-white"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-neutral-200/50 dark:border-white/10 flex flex-col gap-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="px-2 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              Platform Features
            </a>
            <a
              href="#stress-engine"
              onClick={(e) => handleSmoothScroll(e, "stress-engine")}
              className="px-2 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              Academic Stress Engine
            </a>
            <a
              href="#habits"
              onClick={(e) => handleSmoothScroll(e, "habits")}
              className="px-2 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              Habit Matrix & Streaks
            </a>
            <a
              href="#breathwork"
              onClick={(e) => handleSmoothScroll(e, "breathwork")}
              className="px-2 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              4-4-4 Breathwork
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleSmoothScroll(e, "reviews")}
              className="px-2 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              Reviews & Research
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="px-2 py-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            >
              Frequently Asked Questions
            </a>
            <div className="pt-2">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1a1a1a] text-white text-sm font-medium shadow"
              >
                <span>Launch Mentebloom</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
