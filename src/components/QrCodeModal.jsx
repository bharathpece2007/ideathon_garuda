import React from 'react';
import { X, QrCode, Scan, ShieldCheck, Thermometer, Droplets, CheckCircle2, ArrowRight } from 'lucide-react';

export function QrCodeModal({ isOpen, onClose, batch, onScanBatch }) {
  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 text-center">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-slate-800 text-sm">IoT Digital Twin QR Pass</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="my-4 p-5 bg-gradient-to-b from-slate-50 to-indigo-50/30 rounded-3xl border border-slate-100 inline-block shadow-inner">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-md border border-slate-200 mx-auto flex items-center justify-center relative group">
            {/* Real SVG QR Pattern */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
              {/* Corner 1 */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="currentColor" />
              <rect x="10" y="10" width="16" height="16" rx="2" fill="#fff" />
              <rect x="14" y="14" width="8" height="8" rx="1" fill="currentColor" />

              {/* Corner 2 */}
              <rect x="69" y="5" width="26" height="26" rx="4" fill="currentColor" />
              <rect x="74" y="10" width="16" height="16" rx="2" fill="#fff" />
              <rect x="78" y="14" width="8" height="8" rx="1" fill="currentColor" />

              {/* Corner 3 */}
              <rect x="5" y="69" width="26" height="26" rx="4" fill="currentColor" />
              <rect x="10" y="74" width="16" height="16" rx="2" fill="#fff" />
              <rect x="14" y="78" width="8" height="8" rx="1" fill="currentColor" />

              {/* Data matrix nodes */}
              <rect x="36" y="8" width="6" height="12" fill="currentColor" />
              <rect x="46" y="12" width="10" height="6" fill="currentColor" />
              <rect x="58" y="6" width="6" height="18" fill="currentColor" />
              <rect x="38" y="26" width="18" height="6" fill="currentColor" />

              <rect x="8" y="38" width="8" height="18" fill="currentColor" />
              <rect x="22" y="44" width="16" height="6" fill="currentColor" />
              <rect x="28" y="36" width="6" height="14" fill="currentColor" />

              <rect x="40" y="40" width="20" height="20" rx="4" fill="#1e1445" />
              <circle cx="50" cy="50" r="5" fill="#38bdf8" />

              <rect x="68" y="38" width="10" height="16" fill="currentColor" />
              <rect x="82" y="46" width="10" height="8" fill="currentColor" />

              <rect x="38" y="68" width="8" height="14" fill="currentColor" />
              <rect x="50" y="76" width="16" height="8" fill="currentColor" />
              <rect x="70" y="68" width="14" height="6" fill="currentColor" />
              <rect x="74" y="78" width="18" height="14" fill="currentColor" />
            </svg>

            <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-[1px]">
              <span className="bg-white/95 px-3 py-1.5 rounded-xl shadow-md text-xs font-bold text-slate-800 flex items-center gap-1">
                <Scan className="w-3.5 h-3.5 text-indigo-600" /> Click to Scan
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-xs font-mono font-bold text-slate-800 block">{batch.id}</span>
            <span className="text-[10px] text-slate-400 font-mono truncate max-w-xs block mt-0.5">
              {batch.qrHash || 'sha256-cryptographic-cold-token'}
            </span>
          </div>
        </div>

        {/* Batch Info */}
        <div className="text-left bg-slate-50 p-3.5 rounded-2xl mb-4 border border-slate-100 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Product:</span>
            <span className="font-bold text-slate-800">{batch.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Quantity:</span>
            <span className="font-bold text-slate-800">
              {batch.quantity} {batch.unit}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Baseline Chemistry:</span>
            <span className="font-mono text-slate-700">
              M:{batch.chemistry?.moisturePct}% | P:{batch.chemistry?.proteinPct}% | pH:{batch.chemistry?.initialPh}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Current Temp:</span>
            <span className={`font-bold ${batch.currentTemp > 8 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {batch.currentTemp}°C
            </span>
          </div>
        </div>

        {/* Simulate Scan Button */}
        <button
          onClick={() => {
            onScanBatch(batch);
            onClose();
          }}
          className="w-full py-3 px-4 bg-[#1e1445] hover:bg-[#2b1d62] text-white font-bold rounded-2xl shadow-pill transition flex items-center justify-center gap-2 text-xs"
        >
          <Scan className="w-4 h-4 text-sky-300" />
          <span>Simulate Handheld QR Scan at Receiving Bay</span>
        </button>
      </div>
    </div>
  );
}
