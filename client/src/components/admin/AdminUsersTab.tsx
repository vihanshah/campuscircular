import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ShieldCheck,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Ban,
  Star,
  Trash2,
  Lock,
} from "lucide-react";
import { CreateStudentModal } from "./CreateStudentModal";
import { loadAppStore, deleteStudentFromStore, DemoStudent, useAppStore } from "@/lib/appStore";

export const AdminUsersTab: React.FC = () => {
  const store = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const students = store.users;

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete student ${name} (${id})?`)) {
      deleteStudentFromStore(id);
    }
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1A1A24] p-6 rounded-3xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00F2FE] mb-1">
            <Users className="w-4 h-4" />
            <span>Campus Student Directory</span>
          </div>
          <h2 className="text-2xl font-black text-white">10 Verified Student Accounts</h2>
          <p className="text-xs font-semibold text-white/60 mt-0.5">
            Admin Overview: All 10 student credentials, passwords, resources, trust scores & loan activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#00F2FE] text-[#0F0F14] hover:bg-[#00F2FE]/80 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shrink-0 cursor-pointer transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision New Student</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[#1A1A24] p-4 rounded-2xl border border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID (CC1001), Name, Department, or Email..."
            className="w-full pl-10 pr-4 py-2 bg-[#0F0F14] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00F2FE]"
          />
        </div>

        <div className="text-xs font-mono font-bold text-white/50 shrink-0">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      {/* STUDENT CREDENTIALS & ACTIVITY TABLE */}
      <div className="bg-[#1A1A24] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F0F14] border-b border-white/10 text-[11px] font-mono font-black uppercase text-white/50 tracking-wider">
                <th className="p-4">User ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Demo Password</th>
                <th className="p-4">Dept / Year</th>
                <th className="p-4">Trust Score</th>
                <th className="p-4">Exchanges</th>
                <th className="p-4">Impact</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/06 font-semibold">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-white/04 transition-colors">
                  {/* User ID */}
                  <td className="p-4 font-mono font-black">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FFD928] text-[#151515]">
                      {st.id}
                    </span>
                  </td>

                  {/* Name & Handle */}
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 text-[#151515]"
                        style={{ backgroundColor: st.avatarBg }}
                      >
                        {st.avatar}
                      </div>
                      <div>
                        <div className="font-extrabold text-white flex items-center gap-1">
                          <span>{st.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                        </div>
                        <div className="text-[10px] text-white/50">{st.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Password (Visible for Admin Demo) */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0F0F14] border border-white/10 text-[#00F2FE] font-mono font-bold text-[11px] flex items-center gap-1 w-max">
                      <Lock className="w-3 h-3 text-[#00F2FE]" />
                      <span>{st.password}</span>
                    </span>
                  </td>

                  {/* Dept */}
                  <td className="p-4 text-white/80">
                    <div>{st.department}</div>
                    <div className="text-[10px] text-white/50">{st.year}</div>
                  </td>

                  {/* Trust Score */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40">
                      {st.trustScore}% Verified
                    </span>
                  </td>

                  {/* Exchanges */}
                  <td className="p-4 font-extrabold text-white">
                    {st.totalExchanges} loans
                  </td>

                  {/* Impact */}
                  <td className="p-4 text-white/80">
                    <div className="font-bold text-white">{st.co2SavedKg}kg CO2</div>
                    <div className="text-[10px] text-[#FF6755]">₹{st.moneySavedRupees} saved</div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(st.id, st.name)}
                      className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Delete Student Account"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default AdminUsersTab;
