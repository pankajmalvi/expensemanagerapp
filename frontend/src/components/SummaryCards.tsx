"use client";

import React from "react";
import { Summary } from "@/lib/types";
import { DollarSign, Layers, TrendingUp } from "lucide-react";

interface SummaryCardsProps {
  summary: Summary | null;
  loading: boolean;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const hasExpenses = summary !== null && summary.count > 0;
  const total = summary ? formatCurrency(summary.total) : "$0.00";
  const count = summary ? summary.count : 0;
  const average = summary ? formatCurrency(summary.average) : "$0.00";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {/* Card 1: Total Spending */}
      <div className="neo-card bg-[#FECDD3] p-4 sm:p-5 md:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Total Spending
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black flex-shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
            {total}
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-neutral-800 mt-1">
            {hasExpenses ? "Total amount spent to date" : "No expenses recorded yet"}
          </p>
        </div>
      </div>

      {/* Card 2: Total Transactions */}
      <div className="neo-card bg-[#BBF7D0] p-4 sm:p-5 md:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Total Transactions
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black flex-shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
            {count}
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-neutral-800 mt-1">
            {hasExpenses ? "Total logged expense count" : "0 transactions logged"}
          </p>
        </div>
      </div>

      {/* Card 3: Average Expense */}
      <div className="neo-card bg-[#BAE6FD] p-4 sm:p-5 md:p-6 flex flex-col justify-between neo-card-hover">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Average Expense
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white flex items-center justify-center rounded border-2 border-black flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
            {average}
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-neutral-800 mt-1">
            {hasExpenses ? "Average spent per transaction" : "Awaiting first transaction"}
          </p>
        </div>
      </div>
    </section>
  );
}
