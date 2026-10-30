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
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b-[3px] border-black px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FEF08A] border-[3px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rounded-lg flex-shrink-0">
            <Wallet className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-black">
                EXPENSE<span className="bg-[#4EFA94] px-1.5 py-0.5 ml-1 border-2 border-black rounded text-black shadow-[2px_2px_0px_0px_#000]">FLOW</span>
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-600 hidden sm:block">
              Personal Expense & Category Manager
            </p>
          </div>
        </div>

        {/* User-Centric Primary CTAs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-black">
          {/* Quick Add Category CTA */}
          <button
            type="button"
            onClick={() => scrollTo("category-section")}
            className="neo-btn bg-[#E9D5FF] hover:bg-purple-200 text-black px-3 py-1.5 text-xs"
            title="Jump to Add Category"
          >
            <Tag className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
            <span>+ Category</span>
          </button>

          {/* Quick Add Expense CTA */}
          <button
            type="button"
            onClick={() => scrollTo("expense-form")}
            className="neo-btn bg-[#4EFA94] hover:bg-emerald-300 text-black px-3.5 py-1.5 text-xs"
            title="Jump to Record Expense"
          >
            <Plus className="w-3.5 h-3.5 mr-1 stroke-[3]" />
            <span>+ New Expense</span>
          </button>

          {/* Sync / Refresh Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={() => onRefresh()}
              disabled={isRefreshing}
              className="neo-btn bg-white hover:bg-neutral-100 text-black px-3 py-1.5 text-xs"
              title="Refresh and sync data"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 stroke-[2.5] ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
