/**
 * AppFooter — Campus Circular Editorial Footer
 */
export function AppFooter() {
  return (
    <footer className="border-t-2 border-[#151515]/10 mt-12 py-6 bg-[#FFFDF7]">
      <div className="container max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-bold text-[#151515]/60">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#FFD928] text-[#151515] flex items-center justify-center text-xs font-black border border-[#151515]">
              ♻
            </span>
            <span className="text-[#151515] font-black uppercase tracking-wider">
              Campus Circular © {new Date().getFullYear()}
            </span>
          </div>
          <span className="italic text-[#151515]/70">"Share what you have. Borrow what you need."</span>
          <span className="text-[11px] font-mono font-bold text-[#151515]/50">
            VERIFIED CAMPUS NETWORK · ACTIVE
          </span>
        </div>
      </div>
    </footer>
  );
}
