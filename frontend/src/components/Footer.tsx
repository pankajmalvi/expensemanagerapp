"use client";

import React from "react";
import { Wallet } from "lucide-react";

export function Footer() {
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-12 border-t-[3px] border-black bg-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Brief Description */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
          <div className="w-9 h-9 bg-[#FEF08A] border-[3px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rounded-lg flex-shrink-0">
            <Wallet className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="font-black text-base text-black tracking-tight">
              EXPENSE<span className="bg-[#4EFA94] px-1 py-0.5 ml-1 border-2 border-black rounded text-black text-xs">FLOW</span>
            </span>
            <p className="text-xs font-semibold text-neutral-600 mt-1 max-w-sm">
              Simple, reliable personal expense and category management.
            </p>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-black">
          <button
            type="button"
            onClick={() => scrollTo("summary-section")}
            className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#FEF08A] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => scrollTo("category-section")}
            className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#E9D5FF] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => scrollTo("expense-form")}
            className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#BBF7D0] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={() => scrollTo("expense-ledger")}
            className="px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#BAE6FD] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
          >
            Transactions
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs font-bold text-neutral-600 text-center md:text-right">
          <p>© 2026 ExpenseFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
