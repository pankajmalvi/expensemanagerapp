"use client";

import React from "react";
import { Summary } from "@/lib/types";
import { DollarSign, Layers, TrendingUp } from "lucide-react";

interface SummaryCardsProps {
  summary: Summary | null;
  loading: boolean;
}

export function SummaryCards({ summary, loading }: SummaryCardsProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const total = summary ? formatCurrency(summary.total) : "$0.00";
  const count = summary ? summary.count : 0;
  const average = summary ? formatCurrency(summary.average) : "$0.00";

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {/* Card 1: Total Amount */}
      <div className="neo-card bg-[#FECDD3] p-5 sm:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm">
            Total Spend
          </span>
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            {loading ? <span className="opacity-40 animate-pulse">$---.--</span> : total}
          </div>
          <p className="text-xs font-bold text-neutral-800 mt-1">
            Aggregated across all registered transactions
          </p>
        </div>
      </div>

      {/* Card 2: Total Count */}
      <div className="neo-card bg-[#BBF7D0] p-5 sm:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm">
            Total Count
          </span>
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black">
            <Layers className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            {loading ? <span className="opacity-40 animate-pulse">--</span> : count}
          </div>
          <p className="text-xs font-bold text-neutral-800 mt-1">
            Active expense records stored in database
          </p>
        </div>
      </div>

      {/* Card 3: Average Amount */}
      <div className="neo-card bg-[#BAE6FD] p-5 sm:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm">
            Average Spend
          </span>
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            {loading ? <span className="opacity-40 animate-pulse">$---.--</span> : average}
          </div>
          <p className="text-xs font-bold text-neutral-800 mt-1">
            Mean amount per logged transaction
          </p>
        </div>
      </div>
    </section>
  );
}
