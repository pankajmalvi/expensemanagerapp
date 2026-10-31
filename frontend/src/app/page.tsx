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
import { AlertCircle, RefreshCw } from "lucide-react";

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
      const msg = err instanceof Error ? err.message : "Unable to reach service.";
      setErrorBanner(`${msg} Please check that the server is currently online.`);
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
      {/* Top Sticky Header */}
      <Navbar onRefresh={() => loadData(true)} isRefreshing={refreshing} />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 md:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 flex-1">
        {/* Offline / Connection Error Notice */}
        {errorBanner && (
          <div className="neo-card p-3.5 sm:p-4 bg-[#FECDD3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-black">Service Unavailable</h4>
                <p className="text-xs font-semibold text-neutral-800">{errorBanner}</p>
              </div>
            </div>
            <button
              onClick={() => loadData(true)}
              className="neo-btn bg-white hover:bg-neutral-100 px-3 py-1.5 text-xs text-black whitespace-nowrap self-end sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Dashboard Title */}
        <div className="pb-2 sm:pb-3 border-b-[3px] border-black">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-tight">
            Expense Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-neutral-600 mt-0.5 sm:mt-1">
            Organize payments by category and monitor your spending in real time.
          </p>
        </div>

        {/* 1. Summary Cards Section */}
        <section id="summary-section" className="scroll-mt-24">
          <SummaryCards summary={summary} loading={loading} />
        </section>

        {/* 2. Middle Grid: Category Management & Expense Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          <section id="category-section" className="scroll-mt-24 h-full">
            <CategorySection
              categories={categories}
              onCategoryAdded={async () => {
                await loadData();
              }}
            />
          </section>
          <section id="expense-form" className="scroll-mt-24 h-full">
            <ExpenseForm
              categories={categories}
              onExpenseAdded={async () => {
                await loadData();
              }}
            />
          </section>
        </div>

        {/* 3. Transaction History */}
        <section id="expense-ledger" className="scroll-mt-24">
          <ExpenseList expenses={expenses} loading={loading} />
        </section>
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
