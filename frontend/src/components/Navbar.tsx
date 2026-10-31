"use client";

import React from "react";
import { Wallet, Plus, RefreshCw, Tag } from "lucide-react";

interface NavbarProps {
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

export function Navbar({ onRefresh, isRefreshing = false }: NavbarProps) {
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = el.querySelector("input, select") as HTMLElement | null;
      if (input) {
        setTimeout(() => input.focus(), 300);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b-[3px] border-black px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-[0_2px_0_0_#000]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FEF08A] border-[2.5px] sm:border-[3px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rounded-lg flex-shrink-0">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center">
              <span className="font-black text-base sm:text-xl tracking-tight text-black whitespace-nowrap">
                EXPENSE<span className="bg-[#4EFA94] px-1 sm:px-1.5 py-0.5 ml-1 border-2 border-black rounded text-black text-xs sm:text-sm shadow-[1.5px_1.5px_0px_0px_#000]">FLOW</span>
              </span>
            </div>
            <p className="text-[11px] font-bold text-neutral-600 hidden md:block truncate">
              Personal Expense & Category Manager
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Quick Add Category CTA */}
          <button
            type="button"
            onClick={() => scrollTo("category-section")}
            className="neo-btn bg-[#E9D5FF] hover:bg-purple-200 text-black px-2 sm:px-3 py-1.5 text-xs font-black flex items-center"
            title="Jump to Add Category"
          >
            <Tag className="w-3.5 h-3.5 sm:mr-1 stroke-[2.5]" />
            <span className="hidden sm:inline">+ Category</span>
            <span className="sm:hidden text-[11px]">Category</span>
          </button>

          {/* Quick Add Expense CTA */}
          <button
            type="button"
            onClick={() => scrollTo("expense-form")}
            className="neo-btn bg-[#4EFA94] hover:bg-emerald-300 text-black px-2.5 sm:px-3.5 py-1.5 text-xs font-black flex items-center"
            title="Jump to Add Expense"
          >
            <Plus className="w-3.5 h-3.5 sm:mr-1 stroke-[3]" />
            <span className="hidden sm:inline">+ New Expense</span>
            <span className="sm:hidden text-[11px]">Expense</span>
          </button>

          {/* Sync / Refresh Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={() => onRefresh()}
              disabled={isRefreshing}
              className="neo-btn bg-white hover:bg-neutral-100 text-black p-1.5 sm:px-3 sm:py-1.5 text-xs font-black flex items-center"
              title="Refresh and sync data"
              aria-label="Sync data"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:mr-1 stroke-[2.5] ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isRefreshing ? "Syncing..." : "Sync"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
