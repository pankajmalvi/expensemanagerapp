"use client";

import React from "react";
import { Expense } from "@/lib/types";
import { ListOrdered, Calendar, Tag, Inbox } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
}

export function ExpenseList({ expenses, loading }: ExpenseListProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="neo-card p-4 sm:p-5 lg:p-6 bg-white min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-2 border-black gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FEF08A] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] flex-shrink-0">
            <ListOrdered className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-black tracking-tight">Recent Transactions</h2>
            <p className="text-xs font-normal text-neutral-600">
              Complete history of recorded expenses
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold bg-black text-white px-3 py-1 rounded border-2 border-black self-start sm:self-auto flex-shrink-0">
          {expenses.length} {expenses.length === 1 ? "TRANSACTION" : "TRANSACTIONS"}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-block p-4 bg-[#FAF9F6] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] animate-pulse">
            <p className="text-sm font-semibold text-black">Loading expenses...</p>
          </div>
        </div>
      ) : expenses.length === 0 ? (
        <div className="py-12 px-4 text-center border-2 border-dashed border-neutral-300 rounded-xl bg-[#FAF9F6]">
          <div className="w-14 h-14 mx-auto mb-3 bg-[#E9D5FF] border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
            <Inbox className="w-7 h-7 text-black stroke-[2.5]" />
          </div>
          <h3 className="text-base font-bold text-black mb-1">No Transactions Recorded Yet</h3>
          <p className="text-xs font-medium text-neutral-600 max-w-sm mx-auto">
            Your expense ledger is currently empty. Use the Add Expense form above to record your first transaction!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-[#FAF9F6] text-xs font-semibold uppercase tracking-wider text-neutral-700">
                <th className="py-2.5 px-3">Date & Time</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neutral-200 text-sm">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-[#FAF9F6] transition-colors"
                >
                  {/* Date */}
                  <td className="py-3 px-3 whitespace-nowrap text-xs font-normal text-neutral-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500 stroke-[2.5]" />
                      {formatDate(expense.created_at)}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="py-3 px-3 font-medium text-black max-w-[180px] sm:max-w-xs truncate">
                    {expense.title}
                  </td>

                  {/* Category Pill */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FAF9F6] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] text-xs font-semibold text-black">
                      <Tag className="w-3 h-3 stroke-[2.5] text-black" />
                      {expense.category}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#BBF7D0] border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] font-bold text-black text-sm">
                      {formatCurrency(expense.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
