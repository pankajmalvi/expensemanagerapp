"use client";

import React from "react";
import { Wallet } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t-[3px] border-black bg-white py-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Brand info */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FEF08A] border-2 border-black rounded flex items-center justify-center flex-shrink-0">
            <Wallet className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          </div>
          <span className="font-black text-sm tracking-tight text-black">ExpenseFlow</span>
          <span className="text-xs text-neutral-400 font-semibold hidden sm:inline">•</span>
          <span className="text-xs text-neutral-600 font-medium hidden sm:inline">
            Simple & Reliable Expense Management
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs font-semibold text-neutral-500">
          © {new Date().getFullYear()} ExpenseFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
