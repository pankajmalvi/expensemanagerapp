"use client";

import React from "react";
import { Wallet } from "lucide-react";

export function Footer() {
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-12 border-t-[3px] border-black bg-white py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#FEF08A] border-2 border-black rounded flex items-center justify-center flex-shrink-0">
            <Wallet className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="font-black text-sm tracking-tight text-black">ExpenseFlow</span>
            <span className="text-xs text-neutral-600 ml-2 font-medium hidden sm:inline">
              Smart Personal Expense Management
            </span>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-bold text-neutral-700">
          <button
            type="button"
            onClick={() => scrollTo("summary-section")}
            className="hover:text-black hover:underline transition-colors"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => scrollTo("category-section")}
            className="hover:text-black hover:underline transition-colors"
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => scrollTo("expense-form")}
            className="hover:text-black hover:underline transition-colors"
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={() => scrollTo("expense-ledger")}
            className="hover:text-black hover:underline transition-colors"
          >
            Transactions
          </button>
        </nav>

        {/* Copyright */}
        <p className="text-xs font-semibold text-neutral-500 text-center sm:text-right">
          © {new Date().getFullYear()} ExpenseFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
