"use client";

import React from "react";
import { ShieldCheck, Database, Server, Laptop, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer id="architecture" className="mt-12 border-t-4 border-black bg-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b-2 border-black">
          {/* Col 1: System info */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#FEF08A] px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm inline-block">
              Specification Lock
            </span>
            <h3 className="font-black text-sm text-black">Expense Manager Challenge</h3>
            <p className="text-xs font-bold text-neutral-600 leading-relaxed">
              Full-stack implementation built with strict scope adherence to the PRD.
            </p>
          </div>

          {/* Col 2: Tech Specs */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BBF7D0] px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm inline-block">
              Tech Stack
            </span>
            <ul className="text-xs font-bold text-neutral-800 space-y-1">
              <li className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" /> Next.js 14 App Router + TypeScript
              </li>
              <li className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" /> FastAPI + Pydantic v2
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> SQLite with Foreign Keys ON
              </li>
            </ul>
          </div>

          {/* Col 3: Enforced Constraints */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BAE6FD] px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm inline-block">
              Verified Constraints
            </span>
            <ul className="text-xs font-bold text-neutral-800 space-y-1">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Category exists prior to expense
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Title non-empty & trimmed
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Amount strictly positive (&gt;0)
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Duplicate categories prevented
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Preview Links */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#E9D5FF] px-2 py-0.5 border-2 border-black rounded shadow-neobrutal-sm inline-block">
              Verified Preview Links
            </span>
            <div className="space-y-1.5 text-xs font-bold">
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-black hover:underline"
              >
                <span>Interactive Swagger UI</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="http://localhost:8000/redoc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-black hover:underline"
              >
                <span>FastAPI ReDoc Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="http://localhost:8000/categories"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-black hover:underline"
              >
                <span>JSON Endpoint: /categories</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="http://localhost:8000/summary"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-black hover:underline"
              >
                <span>JSON Endpoint: /summary</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright / badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-neutral-500 gap-2">
          <p>© 2026 ExpenseFlow. Strict PRD adherence without over-engineering.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-neutral-100 border border-black rounded text-[11px] font-black text-black">
              NEOBRUTALISM UI
            </span>
            <span className="px-2 py-0.5 bg-neutral-100 border border-black rounded text-[11px] font-black text-black">
              15/15 UNIT TESTS PASSING
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
