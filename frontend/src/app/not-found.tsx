import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 sm:pb-6 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <span className="font-black text-base sm:text-lg tracking-tight text-black">
            EXPENSE<span className="bg-[#4EFA94] px-1.5 py-0.5 ml-1 border-2 border-black rounded text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000]">FLOW</span>
          </span>
        </div>
        <Link
          href="/"
          className="neo-btn bg-white hover:bg-neutral-100 text-black px-3 py-1.5 text-xs font-black inline-flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </header>

      {/* Main 404 Hero Card */}
      <main className="max-w-md w-full mx-auto my-12">
        <div className="neo-card p-6 sm:p-8 bg-white text-center space-y-5">
          <div className="inline-block mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FECDD3] border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000]">
              <FileQuestion className="w-5 h-5 text-black stroke-[2.5]" />
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                404
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-neutral-600 leading-relaxed">
              We couldn’t find the page you were looking for.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="neo-btn w-full bg-[#4EFA94] hover:bg-emerald-300 text-black px-5 py-2.5 text-xs sm:text-sm font-black inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-neutral-500 font-bold py-4">
        © 2026 ExpenseFlow. All rights reserved.
      </footer>
    </div>
  );
}
