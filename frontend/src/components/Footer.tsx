"use client";

import React from "react";
import { Wallet, ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-12 border-t-[3px] border-black bg-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 border-b-2 border-black">
          {/* Col 1: About ExpenseFlow */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#FEF08A] border-2 border-black rounded flex items-center justify-center flex-shrink-0">
                <Wallet className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-bold text-sm text-black uppercase tracking-tight">ExpenseFlow</h3>
            </div>
            <p className="text-xs font-normal text-neutral-600 leading-relaxed max-w-sm">
              Fast, organized personal expense management. Track purchases, categorize spending, and stay in control of your budget with verified relational database integrity.
            </p>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-black bg-[#E9D5FF] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] inline-block">
              Quick Navigation
            </span>
            <ul className="text-xs font-medium text-neutral-700 space-y-2 pt-1">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("summary-section")}
                  className="hover:underline hover:text-black flex items-center gap-1.5 text-left transition-colors"
                >
                  <span>→ Overview Summary</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("category-section")}
                  className="hover:underline hover:text-black flex items-center gap-1.5 text-left transition-colors"
                >
                  <span>→ Category Hub</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("expense-form")}
                  className="hover:underline hover:text-black flex items-center gap-1.5 text-left transition-colors"
                >
                  <span>→ Record an Expense</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("expense-ledger")}
                  className="hover:underline hover:text-black flex items-center gap-1.5 text-left transition-colors"
                >
                  <span>→ Transaction Ledger</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer & API Preview Resources */}
          <div className="space-y-2.5 sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-black bg-[#BBF7D0] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] inline-block">
              Resources & Preview
            </span>
            <ul className="text-xs font-medium text-neutral-700 space-y-2 pt-1">
              <li>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-black inline-flex items-center gap-1 transition-colors"
                >
                  <span>Interactive Swagger API Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8000/redoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-black inline-flex items-center gap-1 transition-colors"
                >
                  <span>ReDoc API Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-black inline-flex items-center gap-1 transition-colors"
                >
                  <span>Backend Health Check</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Clean copyright with zero neobrutalism mentions */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-neutral-600 gap-3 pt-2">
          <p>© 2026 ExpenseFlow. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F6] border-2 border-black rounded text-xs font-semibold text-black shadow-[2px_2px_0px_0px_#000]">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5] text-emerald-600" />
              <span>Local SQLite Database</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
