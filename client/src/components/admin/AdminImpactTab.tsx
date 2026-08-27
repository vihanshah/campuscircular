import React from "react";
import { Leaf, Award, ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/appStore";

export const AdminImpactTab: React.FC = () => {
  return (
    <div className="space-y-6 text-white font-sans">
      {/* IMPACT BANNER */}
      <div className="bg-[#1A1A24] border border-white/10 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase mb-3">
              <Leaf className="w-3.5 h-3.5" />
              <span>Campus Sustainability Report 2026</span>
            </div>
            <h2 className="text-3xl font-black text-white">Campus Circular Eco-Impact</h2>
            <p className="text-sm font-medium text-white/70 max-w-xl mt-1">
              By reusing gear across departments, TSEC students have prevented high-carbon manufacturing and saved thousands of rupees.
            </p>
          </div>

          <div className="bg-[#0F0F14] border border-white/10 p-5 rounded-2xl shrink-0 text-center space-y-1">
            <div className="text-3xl font-black text-[#34D399]">482 kg</div>
            <div className="text-[10px] font-mono uppercase text-white/50">Total CO2 Emissions Prevented</div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/08 relative z-10">
          <div className="bg-[#0F0F14] p-4 rounded-2xl border border-white/06">
            <span className="text-[10px] font-mono uppercase text-white/50">Student Financial Savings</span>
            <div className="text-2xl font-black text-[#FFD928] mt-1">₹63,100</div>
          </div>

          <div className="bg-[#0F0F14] p-4 rounded-2xl border border-white/06">
            <span className="text-[10px] font-mono uppercase text-white/50">Successful Exchanges</span>
            <div className="text-2xl font-black text-[#00F2FE] mt-1">244</div>
          </div>

          <div className="bg-[#0F0F14] p-4 rounded-2xl border border-white/06">
            <span className="text-[10px] font-mono uppercase text-white/50">E-Waste Avoided</span>
            <div className="text-2xl font-black text-[#B92CFF] mt-1">118 units</div>
          </div>

          <div className="bg-[#0F0F14] p-4 rounded-2xl border border-white/06">
            <span className="text-[10px] font-mono uppercase text-white/50">On-Time Return Rate</span>
            <div className="text-2xl font-black text-[#34D399] mt-1">98.4%</div>
          </div>
        </div>
      </div>

      {/* DEPARTMENT LEADERBOARD & TOP CONTRIBUTORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1A24] border border-white/10 p-6 rounded-3xl space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>🏆 Department Leaderboard</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { dept: "Media & Cinema Guild", items: 68, co2: "142kg", score: 99 },
              { dept: "Computer Science", items: 54, co2: "116kg", score: 98 },
              { dept: "Mechanical Engineering", items: 42, co2: "89kg", score: 96 },
              { dept: "Robotics & AI", items: 35, co2: "74kg", score: 95 },
            ].map((d, idx) => (
              <div key={d.dept} className="flex items-center justify-between bg-[#0F0F14] p-3 rounded-2xl border border-white/06">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center font-mono font-black text-xs">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-white">{d.dept}</div>
                    <div className="text-[10px] text-white/50">{d.items} resources shared</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#34D399]">{d.co2} CO2</div>
                  <div className="text-[10px] text-white/50">{d.score}% Trust</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A24] border border-white/10 p-6 rounded-3xl space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>🌟 Top 10 Student Eco Champions</span>
          </h3>

          <div className="space-y-2 text-xs overflow-y-auto max-h-[300px] pr-1">
            {DEMO_STUDENTS.map((st) => (
              <div key={st.id} className="flex items-center justify-between bg-[#0F0F14] p-2.5 rounded-2xl border border-white/06">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-[#151515]"
                    style={{ backgroundColor: st.avatarBg }}
                  >
                    {st.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{st.name} ({st.id})</div>
                    <div className="text-[10px] text-white/50">{st.department}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-black text-[#34D399]">{st.co2SavedKg}kg CO2</div>
                  <div className="text-[10px] text-[#FFD928]">₹{st.moneySavedRupees}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminImpactTab;
