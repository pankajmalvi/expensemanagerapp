"use client";

import React, { useState } from "react";
import { CategorySummary } from "@/lib/types";
import { createCategory } from "@/lib/api";
import { Tag, Plus, AlertCircle, CheckCircle2 } from "lucide-react";

interface CategorySectionProps {
  categories: CategorySummary[];
  onCategoryAdded: () => Promise<void>;
}

export function CategorySection({ categories, onCategoryAdded }: CategorySectionProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = name.trim();

    // Frontend Check 1: Non-empty validation
    if (!trimmed) {
      setError("Category name cannot be empty or whitespace only.");
      return;
    }

    // Frontend Check 2: Case-insensitive duplicate prevention
    const exists = categories.some(
      (c) => c.name.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError(`Category "${trimmed}" already exists.`);
      return;
    }

    setLoading(true);
    try {
      const created = await createCategory(trimmed);
      setSuccess(`Category "${created.name}" created!`);
      setName("");
      await onCategoryAdded();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create category.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neo-card p-4 sm:p-6 bg-white flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-black">
          <div className="p-1.5 bg-[#E9D5FF] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] flex-shrink-0">
            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-black tracking-tight">Categories</h2>
            <p className="text-[11px] sm:text-xs font-semibold text-neutral-600">
              Organize your expenses into distinct buckets
            </p>
          </div>
        </div>

        {/* Create Category Form */}
        <form onSubmit={handleSubmit} className="mb-5 space-y-3">
          <div>
            <label htmlFor="category-name" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-black mb-1">
              New Category Name
            </label>
            <div className="flex gap-2">
              <input
                id="category-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g., Food, Transport, Rent"
                maxLength={40}
                className="neo-input flex-1 min-w-0 text-xs sm:text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="neo-btn bg-[#FEF08A] hover:bg-yellow-300 text-black px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 stroke-[3]" />
                <span>{loading ? "Adding..." : "Add"}</span>
              </button>
            </div>
          </div>

          {/* Validation Feedback */}
          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-[#FECDD3] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-xs font-bold text-black animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 stroke-[2.5]" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-2.5 bg-[#BBF7D0] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-xs font-bold text-black animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 stroke-[2.5]" />
              <span>{success}</span>
            </div>
          )}
        </form>

        {/* Existing Categories Badges */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-black">
              Active Categories ({categories.length})
            </span>
          </div>

          {categories.length === 0 ? (
            <div className="p-3.5 sm:p-4 border-2 border-dashed border-neutral-400 rounded-lg text-center bg-[#FAF9F6]">
              <p className="text-xs font-semibold text-neutral-600">
                No categories yet. Add your first category above to begin logging expenses!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#FAF9F6] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  <span className="text-xs font-black text-black">{cat.name}</span>
                  <span className="px-1.5 py-0.5 bg-[#FEF08A] border border-black rounded text-[10px] font-extrabold text-black">
                    {cat.total_expenses} {cat.total_expenses === 1 ? "expense" : "expenses"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
