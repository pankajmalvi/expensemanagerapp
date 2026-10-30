"use client";

import React, { useState } from "react";
import { CategorySummary, ExpenseCreatePayload } from "@/lib/types";
import { createExpense } from "@/lib/api";
import { Receipt, AlertCircle, CheckCircle2, AlertTriangle, Plus } from "lucide-react";

interface ExpenseFormProps {
  categories: CategorySummary[];
  onExpenseAdded: () => Promise<void>;
}

export function ExpenseForm({ categories, onExpenseAdded }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const hasCategories = categories.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Frontend Check 1: Category existence constraint
    if (!hasCategories) {
      setError("Please create at least one category first.");
      return;
    }

    const trimmedTitle = title.trim();
    // Frontend Check 2: Non-empty title constraint
    if (!trimmedTitle) {
      setError("Expense title cannot be empty.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    // Frontend Check 3: Positive amount constraint
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be greater than $0.00.");
      return;
    }

    // Frontend Check 4: Valid category selection
    const parsedCategoryId = parseInt(categoryId, 10);
    if (isNaN(parsedCategoryId) || parsedCategoryId <= 0) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);
    try {
      const payload: ExpenseCreatePayload = {
        title: trimmedTitle,
        amount: parsedAmount,
        category_id: parsedCategoryId,
      };

      await createExpense(payload);
      setSuccess(`Expense "${trimmedTitle}" for $${parsedAmount.toFixed(2)} logged!`);
      setTitle("");
      setAmount("");
      setCategoryId("");
      await onExpenseAdded();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to record expense.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neo-card p-4 sm:p-5 lg:p-6 bg-white flex flex-col justify-between h-full min-w-0">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-black">
          <div className="p-1.5 bg-[#BBF7D0] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] flex-shrink-0">
            <Receipt className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-black tracking-tight">Add Expense</h2>
            <p className="text-xs font-bold text-neutral-600">
              Record a new payment under a category
            </p>
          </div>
        </div>

        {/* Empty Category Prerequisite Warning */}
        {!hasCategories && (
          <div className="mb-4 p-3 bg-[#FEF08A] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-black stroke-[2.5] flex-shrink-0 mt-0.5" />
            <div className="text-xs font-bold text-black">
              <span className="font-black uppercase tracking-wider block">Category Required:</span>
              You must have at least one category before adding an expense. Please add a category on the left first.
            </div>
          </div>
        )}

        {/* Expense Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Title Input */}
          <div>
            <label htmlFor="expense-title" className="block text-xs font-black uppercase tracking-wider text-black mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="expense-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g., Grocery shopping, Team lunch, Gas"
              disabled={loading || !hasCategories}
              maxLength={80}
              className="neo-input text-sm disabled:opacity-50 disabled:bg-neutral-100 min-w-0"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Amount Input */}
            <div>
              <label htmlFor="expense-amount" className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="expense-amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="0.00"
                disabled={loading || !hasCategories}
                className="neo-input text-sm disabled:opacity-50 disabled:bg-neutral-100 min-w-0"
              />
            </div>

            {/* Category Select Dropdown */}
            <div>
              <label htmlFor="expense-category" className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="expense-category"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  if (error) setError(null);
                }}
                disabled={loading || !hasCategories}
                className="neo-input text-sm font-bold disabled:opacity-50 disabled:bg-neutral-100 min-w-0"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Validation Messages */}
          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-[#FECDD3] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-xs font-bold text-black animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 stroke-[2.5]" />
              <span className="break-words">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-2.5 bg-[#BBF7D0] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-xs font-bold text-black animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 stroke-[2.5]" />
              <span className="break-words">{success}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading || !hasCategories || !title.trim() || !amount || !categoryId}
              className="neo-btn w-full bg-[#4EFA94] hover:bg-emerald-400 text-black py-2.5 px-4 text-sm font-black uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 mr-1.5 stroke-[3]" />
              <span>{loading ? "Adding Expense..." : "Add Expense"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
