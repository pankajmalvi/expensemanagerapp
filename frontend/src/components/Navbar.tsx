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
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      const input = el.querySelector("input, select") as HTMLElement | null;
      if (input) {
        setTimeout(() => input.focus(), 350);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b-[3px] border-black px-3 sm:px-6 md:px-8 py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FEF08A] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rounded-lg flex-shrink-0">
            <Wallet className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-lg sm:text-xl tracking-tight text-black leading-none">
              Expense<span className="text-emerald-700">Flow</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-neutral-600 leading-tight mt-0.5 hidden xs:inline-block sm:inline-block">
              Personal Expense Manager
            </span>
          </div>
        </div>

        {/* Primary Action CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-black">
          {/* Quick Add Category */}
          <button
            type="button"
            onClick={() => scrollTo("category-section")}
            className="neo-btn bg-[#E9D5FF] hover:bg-purple-200 text-black px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
            title="Add a new category"
          >
            <Tag className="w-3.5 h-3.5 sm:mr-1 stroke-[2.5]" />
            <span className="hidden sm:inline">Add </span>
            <span>Category</span>
          </button>

          {/* Quick Add Expense */}
          <button
            type="button"
            onClick={() => scrollTo("expense-form")}
            className="neo-btn bg-[#4EFA94] hover:bg-emerald-300 text-black px-2.5 sm:px-3.5 py-1.5 text-xs whitespace-nowrap"
            title="Record an expense"
          >
            <Plus className="w-3.5 h-3.5 sm:mr-1 stroke-[3]" />
            <span className="hidden sm:inline">New </span>
            <span>Expense</span>
          </button>

          {/* Sync Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={() => onRefresh()}
              disabled={isRefreshing}
              className="neo-btn bg-white hover:bg-neutral-100 text-black p-1.5 sm:px-3 sm:py-1.5 text-xs whitespace-nowrap"
              title="Refresh and sync data"
              aria-label="Refresh and sync data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""} ${onRefresh ? "sm:mr-1" : ""}`} />
              <span className="hidden md:inline">{isRefreshing ? "Syncing..." : "Sync"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
