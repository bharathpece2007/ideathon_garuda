import React from 'react';
import { Search, Calendar, Cpu, Sparkles, Filter } from 'lucide-react';

export function Header({
  searchQuery,
  onSearchChange,
  isFlaskMode,
  onToggleFlaskMode,
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Pill Search Input matching reference UI */}
      <div className="relative flex-1 min-w-[240px] max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by batch ID, SKU, reefer fleet..."
          className="w-full bg-white text-slate-700 placeholder-slate-400 text-xs font-medium pl-11 pr-4 py-3 rounded-full shadow-subtle border border-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Date & ML Engine Toggle on Right */}
      <div className="flex items-center gap-3 text-xs">
        {/* ML Engine Pill */}
        <button
          onClick={onToggleFlaskMode}
          className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold flex items-center gap-1.5 transition ${
            isFlaskMode
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title="Toggle Flask XGBoost API Mode vs Deterministic Arrhenius Kinetics"
        >
          <Cpu className={`w-3 h-3 ${isFlaskMode ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
          <span>{isFlaskMode ? 'XGBoost Flask (5000)' : 'Arrhenius Kinetics'}</span>
        </button>

        {/* Date Display matching reference UI "7th December 2019" */}
        <div className="text-slate-500 font-medium flex items-center gap-1.5 text-xs bg-white/60 px-3 py-1.5 rounded-full border border-slate-100">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Friday, 9th October 2026</span>
        </div>
      </div>
    </header>
  );
}
