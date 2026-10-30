import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, FileQuestion, ExternalLink } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar / Simple Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b-2 border-black">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#FEF08A] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-bold text-sm">
            EF
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-black">
            EXPENSE<span className="bg-[#4EFA94] px-1.5 py-0.5 ml-1 border-2 border-black rounded text-xs font-bold shadow-[2px_2px_0px_0px_#000]">FLOW</span>
          </span>
        </div>
        <Link
          href="/"
          className="neo-btn bg-white hover:bg-neutral-100 text-black px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </header>

      {/* Main 404 Hero Card */}
      <main className="max-w-xl w-full mx-auto my-12">
        <div className="neo-card p-6 sm:p-8 bg-white text-center space-y-6">
          {/* Big 404 Visual Pill */}
          <div className="inline-block mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FECDD3] border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_#000]">
              <FileQuestion className="w-6 h-6 text-black stroke-[2.5]" />
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
                404
              </span>
            </div>
          </div>

          {/* Heading & Explanation */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              We couldn’t find the page you were looking for. It may have been moved, renamed, or never existed in the first place.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="neo-btn w-full sm:w-auto bg-[#4EFA94] hover:bg-emerald-300 text-black px-5 py-2.5 text-sm font-bold inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-full sm:w-auto bg-[#FEF08A] hover:bg-yellow-300 text-black px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-1.5"
            >
              <span>Explore API Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Hub Navigation Links */}
          <div className="pt-4 border-t-2 border-neutral-200">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Direct Shortcuts
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <Link
                href="/#summary-section"
                className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-neutral-200 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
              >
                Overview Summary
              </Link>
              <Link
                href="/#category-section"
                className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-neutral-200 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
              >
                Category Hub
              </Link>
              <Link
                href="/#expense-form"
                className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-neutral-200 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-black transition-all"
              >
                Record Expense
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-neutral-500 font-medium py-4">
        © 2026 ExpenseFlow. All rights reserved.
      </footer>
    </div>
  );
}
