"use client";

import React from "react";
import { Wallet, RefreshCw } from "lucide-react";

interface NavbarProps {
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

export function Navbar({ onRefresh, isRefreshing = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b-[3px] border-black px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FEF08A] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center rounded-lg flex-shrink-0">
            <Wallet className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-black text-lg sm:text-xl tracking-tight text-black leading-none">
              Expense<span className="text-emerald-700">Flow</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-neutral-600 leading-tight mt-0.5">
              Personal Expense Manager
            </span>
          </div>
        </div>

        {/* Sync Data CTA */}
        {onRefresh && (
          <button
            type="button"
            onClick={() => onRefresh()}
            disabled={isRefreshing}
            className="neo-btn bg-white hover:bg-neutral-100 text-black px-3 py-1.5 text-xs whitespace-nowrap"
            title="Refresh and sync latest data"
            aria-label="Refresh and sync data"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 stroke-[2.5] ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Data"}</span>
          </button>
        )}
      </div>
    </header>
  );
}
