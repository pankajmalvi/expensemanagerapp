"use client";

import React from "react";
import { Wallet, Shield, CheckCircle, HelpCircle } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b-2 border-black">
          {/* Col 1: About ExpenseFlow */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FEF08A] border-2 border-black rounded flex items-center justify-center">
                <Wallet className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-black text-sm text-black uppercase tracking-tight">ExpenseFlow</h3>
            </div>
            <p className="text-xs font-semibold text-neutral-600 leading-relaxed">
              Fast, clear, and category-organized personal expense management designed for simplicity and control.
            </p>
          </div>

          {/* Col 2: Quick Jump */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#E9D5FF] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] inline-block">
              Quick Navigation
            </span>
            <ul className="text-xs font-bold text-neutral-800 space-y-1.5 pt-1">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("summary-section")}
                  className="hover:underline flex items-center gap-1.5 text-left"
                >
                  <span>Overview Summary</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("category-section")}
                  className="hover:underline flex items-center gap-1.5 text-left"
                >
                  <span>Category Hub</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("expense-form")}
                  className="hover:underline flex items-center gap-1.5 text-left"
                >
                  <span>Record an Expense</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("expense-ledger")}
                  className="hover:underline flex items-center gap-1.5 text-left"
                >
                  <span>Transaction Ledger</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Smart Tracking Tips */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BBF7D0] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] inline-block">
              Financial Hygiene Tips
            </span>
            <ul className="text-xs font-semibold text-neutral-700 space-y-1.5 pt-1">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-black stroke-[2.5] flex-shrink-0 mt-0.5" />
                <span>Create descriptive categories to see exact spending leaks.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-black stroke-[2.5] flex-shrink-0 mt-0.5" />
                <span>Log expenses immediately after purchasing to maintain accuracy.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-black stroke-[2.5] flex-shrink-0 mt-0.5" />
                <span>Keep your average spend per transaction within your weekly goal.</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Data Security */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BAE6FD] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] inline-block">
              Local & Private
            </span>
            <div className="p-3 bg-[#FAF9F6] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-black text-black">
                <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Secure Local Database</span>
              </div>
              <p className="font-semibold text-neutral-600 leading-normal">
                Your entries remain in your local system with relational database integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-neutral-600 gap-2">
          <p>© 2026 ExpenseFlow. Designed with authentic Neobrutalism.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FEF08A] border-2 border-black rounded text-[11px] font-black text-black shadow-[2px_2px_0px_0px_#000]">
              HIGH CONTRAST UI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
