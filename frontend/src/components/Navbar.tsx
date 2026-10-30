"use client";

import React, { useEffect, useState } from "react";
import { checkApiHealth } from "@/lib/api";
import { Wallet, ExternalLink, Activity } from "lucide-react";

export function Navbar() {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const isOnline = await checkApiHealth();
      if (mounted) setApiOnline(isOnline);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b-4 border-black px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFE043] border-3 border-black shadow-neobrutal-sm flex items-center justify-center rounded-lg">
            <Wallet className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-black">
                EXPENSE<span className="bg-[#4EFA94] px-1.5 py-0.5 ml-1 border-2 border-black rounded text-black shadow-neobrutal-sm">FLOW</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                v1.0
              </span>
            </div>
            <p className="text-xs font-semibold text-neutral-600 hidden sm:block">
              FastAPI + Next.js + SQLite Relational Architecture
            </p>
          </div>
        </div>

        {/* Status & Preview Links */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold">
          {/* API Status Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 border-black shadow-neobrutal-sm transition-colors ${
              apiOnline === true
                ? "bg-[#BBF7D0] text-neutral-900"
                : apiOnline === false
                ? "bg-[#FECDD3] text-neutral-900"
                : "bg-neutral-200 text-neutral-600"
            }`}
            title="Realtime FastAPI Health Status"
          >
            <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>
              {apiOnline === true
                ? "API CONNECTED (8000)"
                : apiOnline === false
                ? "API OFFLINE"
                : "CHECKING API..."}
            </span>
          </div>

          {/* Preview Link: Swagger API Docs */}
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-neutral-100 border-2 border-black rounded shadow-neobrutal-sm text-neutral-900 hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <span>Swagger Docs</span>
            <ExternalLink className="w-3 h-3 stroke-[2.5]" />
          </a>

          {/* Preview Link: System Architecture */}
          <a
            href="#architecture"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#BAE6FD] hover:bg-sky-300 border-2 border-black rounded shadow-neobrutal-sm text-neutral-900 hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <span>Preview Specs</span>
          </a>
        </div>
      </div>
    </header>
  );
}
