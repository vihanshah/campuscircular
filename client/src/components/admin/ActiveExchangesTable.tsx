import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Repeat } from "lucide-react";
import { ActiveExchange } from "@/lib/adminData";

interface ActiveExchangesTableProps {
  exchanges: ActiveExchange[];
  onViewAll: () => void;
}

export const ActiveExchangesTable: React.FC<ActiveExchangesTableProps> = ({
  exchanges,
  onViewAll,
}) => {
  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Repeat className="w-5 h-5 text-[#34D399]" />
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Active exchanges
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#00F2FE] hover:underline flex items-center gap-1"
        >
          <span>View all exchanges ({exchanges.length}) →</span>
        </button>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-mono uppercase text-white/50">
              <th className="pb-3 font-extrabold">Resource</th>
              <th className="pb-3 font-extrabold">Borrower</th>
              <th className="pb-3 font-extrabold">Owner</th>
              <th className="pb-3 font-extrabold">Status</th>
              <th className="pb-3 font-extrabold">Return Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/06">
            {exchanges.map((ex) => (
              <tr key={ex.id} className="hover:bg-white/04 transition-colors">
                <td className="py-3.5 font-bold text-white pr-3">{ex.resourceName}</td>
                <td className="py-3.5 text-white/80 font-semibold">{ex.borrowerName}</td>
                <td className="py-3.5 text-white/80 font-semibold">{ex.ownerName}</td>
                <td className="py-3.5">
                  <span
                    className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full inline-block"
                    style={{
                      backgroundColor: ex.statusBg,
                      color: ex.statusTextColor,
                    }}
                  >
                    ● {ex.status}
                  </span>
                </td>
                <td className="py-3.5 font-mono text-[11px] text-white/70 font-semibold">{ex.returnDueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ActiveExchangesTable;
