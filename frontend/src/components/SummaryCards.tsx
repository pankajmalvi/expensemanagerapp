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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
      {/* Card 1: Total Spending */}
      <div className="neo-card bg-[#FECDD3] p-4 sm:p-5 lg:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Total Spending
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black flex-shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight truncate">
            {loading ? <span className="opacity-40 animate-pulse">$---.--</span> : total}
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-neutral-800 mt-1">
            Total amount spent to date
          </p>
        </div>
      </div>

      {/* Card 2: Total Count */}
      <div className="neo-card bg-[#BBF7D0] p-4 sm:p-5 lg:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Total Transactions
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black flex-shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight truncate">
            {loading ? <span className="opacity-40 animate-pulse">--</span> : count}
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-neutral-800 mt-1">
            Total logged expense count
          </p>
        </div>
      </div>

      {/* Card 3: Average Expense */}
      <div className="neo-card bg-[#BAE6FD] p-4 sm:p-5 lg:p-6 flex flex-col justify-between neo-card-hover sm:col-span-2 md:col-span-1">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Average Expense
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight truncate">
            {loading ? <span className="opacity-40 animate-pulse">$---.--</span> : average}
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-neutral-800 mt-1">
            Average spent per transaction
          </p>
        </div>
      </div>
    </div>
  );
}
