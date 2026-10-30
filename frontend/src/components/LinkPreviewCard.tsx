"use client";

import React from "react";
import { ExternalLink, CheckCircle2, ShieldCheck, Code2, FileText, Activity } from "lucide-react";

interface LinkPreviewCardProps {
  title: string;
  url: string;
  description: string;
  badgeText: string;
  badgeBg?: string;
  type?: "swagger" | "redoc" | "health";
}

export function LinkPreviewCard({
  title,
  url,
  description,
  badgeText,
  badgeBg = "#FEF08A",
  type = "swagger",
}: LinkPreviewCardProps) {
  const getIcon = () => {
    switch (type) {
      case "swagger":
        return <Code2 className="w-5 h-5 text-black stroke-[2.5]" />;
      case "redoc":
        return <FileText className="w-5 h-5 text-black stroke-[2.5]" />;
      case "health":
        return <Activity className="w-5 h-5 text-black stroke-[2.5]" />;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block neo-card p-4 bg-white hover:bg-[#FAF9F6] transition-all relative overflow-hidden"
      title={`Open ${title}`}
    >
      {/* Top row: Icon + Verified Badge */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_#000]"
            style={{ backgroundColor: badgeBg }}
          >
            {getIcon()}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-black bg-neutral-100 px-2 py-0.5 border border-black rounded">
            {badgeText}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Safe</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-black group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
            <span>{title}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </h4>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Destination URL footer preview */}
      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
        <span className="truncate max-w-[220px]">{url}</span>
        <span className="text-[10px] uppercase font-bold text-neutral-600 bg-neutral-200 px-1.5 py-0.5 rounded">
          Opens in new tab
        </span>
      </div>
    </a>
  );
}
