"use client";

import React from "react";
import { Wallet, Plus, RefreshCw, Tag, ExternalLink } from "lucide-react";

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
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b-[3px] border-black px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FEF08A] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rounded-lg flex-shrink-0">
              <Wallet className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-black inline-flex items-center">
                  EXPENSE
                  <span className="bg-[#4EFA94] px-1.5 py-0.5 ml-1 border-2 border-black rounded text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_#000] inline-block leading-tight">
                    FLOW
                  </span>
                </span>
              </div>
              <p className="text-xs font-medium text-neutral-600 mt-1">
                Personal Expense & Category Manager
              </p>
            </div>
          </div>

          {/* Mobile-only Sync Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={() => onRefresh()}
              disabled={isRefreshing}
              className="md:hidden neo-btn bg-white hover:bg-neutral-100 text-black p-2 text-xs flex-shrink-0 shadow-[2px_2px_0px_0px_#000]"
              title="Refresh and sync data"
              aria-label="Refresh and sync data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          )}
        </div>

        {/* Action Buttons & Links */}
        <div className="flex items-center justify-center sm:justify-end w-full md:w-auto gap-2 sm:gap-2.5 text-xs">
          {/* API Docs Preview Link */}
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn bg-white hover:bg-neutral-100 text-black px-2.5 sm:px-3 py-1.5 font-semibold inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_#000] flex-1 sm:flex-initial justify-center"
            title="Open Interactive Swagger API Docs"
          >
            <span>Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Quick Add Category CTA */}
          <button
            type="button"
            onClick={() => scrollTo("category-section")}
            className="neo-btn bg-[#E9D5FF] hover:bg-purple-200 text-black px-2.5 sm:px-3 py-1.5 font-semibold shadow-[2px_2px_0px_0px_#000] flex-1 sm:flex-initial justify-center inline-flex items-center gap-1"
            title="Jump to Add Category"
          >
            <Tag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Category</span>
          </button>

          {/* Quick Add Expense CTA */}
          <button
            type="button"
            onClick={() => scrollTo("expense-form")}
            className="neo-btn bg-[#4EFA94] hover:bg-emerald-300 text-black px-3 sm:px-3.5 py-1.5 font-bold shadow-[2px_2px_0px_0px_#000] flex-1 sm:flex-initial justify-center inline-flex items-center gap-1"
            title="Jump to Record Expense"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Expense</span>
          </button>

          {/* Desktop Sync Button */}
          {onRefresh && (
            <button
              type="button"
              onClick={() => onRefresh()}
              disabled={isRefreshing}
              className="hidden md:inline-flex neo-btn bg-white hover:bg-neutral-100 text-black px-3 py-1.5 font-semibold shadow-[2px_2px_0px_0px_#000] items-center gap-1.5 flex-shrink-0"
              title="Refresh and sync data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
