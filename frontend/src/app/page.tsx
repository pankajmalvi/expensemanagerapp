"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { SummaryCards } from "@/components/SummaryCards";
import { CategorySection } from "@/components/CategorySection";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { Footer } from "@/components/Footer";
import { CategorySummary, Expense, Summary } from "@/lib/types";
import { fetchCategories, fetchExpenses, fetchSummary } from "@/lib/api";
import { AlertOctagon, RefreshCw } from "lucide-react";

export default function Home() {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setErrorBanner(null);
    try {
      const [cats, exps, summ] = await Promise.all([
        fetchCategories(),
        fetchExpenses(),
        fetchSummary(),
      ]);
      setCategories(cats);
      setExpenses(exps);
      setSummary(summ);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to reach backend service.";
      setErrorBanner(`${msg} Ensure FastAPI is running on http://localhost:8000.`);
    } finally {
      setLoading(false);
      if (isManualRefresh) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F6]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Dashboard */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8 flex-1">
        {/* Connection / Backend Error Notification */}
        {errorBanner && (
          <div className="neo-card p-4 bg-[#FECDD3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center flex-shrink-0">
                <AlertOctagon className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-black">Backend Connection Notice</h4>
                <p className="text-xs font-bold text-neutral-800">{errorBanner}</p>
              </div>
            </div>
            <button
              onClick={() => loadData(true)}
              className="neo-btn bg-white hover:bg-neutral-100 px-3 py-1.5 text-xs text-black whitespace-nowrap self-end sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Top Header / Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b-2 border-neutral-300">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Expense Overview & Management
            </h1>
            <p className="text-xs sm:text-sm font-bold text-neutral-600 mt-1">
              Classify expenses into categories, enforce database relational constraints, and view real-time totals.
            </p>
          </div>
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="neo-btn bg-white hover:bg-neutral-100 text-black px-3.5 py-1.5 text-xs font-black self-start sm:self-auto"
            title="Refresh All Data from SQLite"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Syncing..." : "Sync Database"}</span>
          </button>
        </div>

        {/* 1. Summary Cards Section */}
        <SummaryCards summary={summary} loading={loading} />

        {/* 2. Middle Row: Category Section & Expense Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <CategorySection
            categories={categories}
            onCategoryAdded={async () => {
              await loadData();
            }}
          />
          <ExpenseForm
            categories={categories}
            onExpenseAdded={async () => {
              await loadData();
            }}
          />
        </div>

        {/* 3. Bottom Row: Expense List Ledger */}
        <ExpenseList expenses={expenses} loading={loading} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
