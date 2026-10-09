import React from 'react';
import { ShieldAlert, ArrowRight, Zap, Snowflake, HeartHandshake } from 'lucide-react';

export function BannerAlert({
  activeAnomalyBatch,
  onInspectTelemetry,
  onSimulateAnomaly,
}) {
  return (
    <div className="relative bg-white rounded-3xl md:rounded-[32px] p-6 shadow-sm border border-slate-100 mb-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Text Content */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Active Cold-Chain Anomaly Alert</span>
          </div>

          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Silent thermal breach detected:{' '}
            <span className="text-rose-600 font-black">
              {activeAnomalyBatch?.name || 'Fresh Malai Paneer'}
            </span>{' '}
            reached 14.8°C in transit
          </h1>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Arrhenius kinetics estimate <strong>26.5 hours Remaining Shelf Life (RSL)</strong>. Quality Gate recommends dynamic diversion before retail reject: push to <strong>60% Flash Sale</strong> or dispatch to <strong>Feeding India (3.2 km away)</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={onInspectTelemetry}
              className="px-4 py-2 bg-[#1e1445] hover:bg-[#2b1d62] text-white rounded-xl text-xs font-bold transition shadow-pill flex items-center gap-1.5"
            >
              <span>Inspect Live Telemetry & Quality Gate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onSimulateAnomaly('compressor_failure')}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-rose-500" />
              <span>Simulate Spike (16°C)</span>
            </button>
          </div>
        </div>

        {/* Right Graphic / Vector Artwork matching the reference banner layout */}
        <div className="relative shrink-0 w-48 h-36 md:w-56 md:h-40 flex items-center justify-center">
          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
            {/* Background Soft Bubble */}
            <circle cx="120" cy="80" r="60" fill="#f0fdf4" opacity="0.6" />
            <circle cx="70" cy="90" r="50" fill="#eff6ff" opacity="0.7" />

            {/* Sparkles / Confetti particles */}
            <circle cx="40" cy="30" r="3" fill="#f59e0b" />
            <circle cx="65" cy="20" r="4" fill="#3b82f6" />
            <circle cx="150" cy="35" r="3.5" fill="#ec4899" />
            <circle cx="170" cy="55" r="2.5" fill="#10b981" />
            <path d="M110 20 L113 28 L121 31 L113 34 L110 42 L107 34 L99 31 L107 28 Z" fill="#fbbf24" />

            {/* Cold Reefer Delivery Unit */}
            <rect x="50" y="60" width="70" height="46" rx="6" fill="#1e1445" />
            <rect x="120" y="74" width="28" height="32" rx="4" fill="#312e81" />
            {/* Windshield */}
            <rect x="132" y="78" width="14" height="12" rx="2" fill="#93c5fd" />
            {/* Reefer Cooling Grid */}
            <rect x="42" y="68" width="8" height="24" rx="2" fill="#64748b" />
            {/* Wheels */}
            <circle cx="70" cy="106" r="10" fill="#1e293b" />
            <circle cx="70" cy="106" r="4" fill="#94a3b8" />
            <circle cx="132" cy="106" r="10" fill="#1e293b" />
            <circle cx="132" cy="106" r="4" fill="#94a3b8" />

            {/* Cold Chain Snowflake */}
            <circle cx="85" cy="83" r="12" fill="#38bdf8" opacity="0.9" />
            <path d="M85 75 L85 91 M77 83 L93 83 M79 77 L91 89 M79 89 L91 77" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

            {/* Rescue Heart Symbol Floating Up */}
            <g transform="translate(140, 25) scale(0.9)">
              <circle cx="16" cy="16" r="16" fill="#f43f5e" />
              <path d="M16 23 C16 23 8 18 8 13 C8 10 10 8 13 8 C14.5 8 16 9.5 16 9.5 C16 9.5 17.5 8 19 8 C22 8 24 10 24 13 C24 18 16 23 16 23 Z" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
