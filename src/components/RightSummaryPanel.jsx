import React from 'react';
import {
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Edit2,
  CheckCircle2,
  TrendingDown,
  AlertTriangle,
  Building,
  HeartHandshake,
  Store,
  RefreshCw,
  QrCode,
} from 'lucide-react';
import { FoodDishAvatar } from './FoodDishAvatar';

export function RightSummaryPanel({
  selectedBatch,
  batches = [],
  onSelectBatch,
  onRunPrediction,
  onOpenQualityGate,
  onOpenQr,
  predictionResult,
  isLoadingPrediction,
}) {
  // Compute fleet risk statistics
  const compromisedCount = batches.filter(
    (b) => b.status === 'COMPROMISED_THERMAL_SPIKE' || b.rslHours < 48
  ).length;

  const totalAtRiskValue = batches
    .filter((b) => b.status === 'COMPROMISED_THERMAL_SPIKE' || b.rslHours < 48)
    .reduce((sum, b) => sum + (b.quantity * (b.pricePerUnit || 5)), 0);

  // Dynamic destination based on batch status
  let destinationTitle = "Feeding India - 3.2 km away (NGO Hub)";
  let destinationType = "NGO Rescue Destination";
  let destinationIcon = HeartHandshake;

  if (selectedBatch?.status === 'CLEARED_RETAIL') {
    destinationTitle = selectedBatch.decisionHistory?.targetRetailer || "Nature's Basket Hypermarket #104";
    destinationType = "Supermarket Retail Destination";
    destinationIcon = Store;
  } else if (selectedBatch?.status === 'FLASH_SALE_COMMERCE') {
    destinationTitle = "Blinkit Instant Dark Store #14";
    destinationType = "Quick-Commerce Salvage Destination";
    destinationIcon = Store;
  } else if (selectedBatch?.status === 'BIO_RECYCLE') {
    destinationTitle = "Green Earth Biogas Digester (11.0 km)";
    destinationType = "Circular Bio-Energy Destination";
    destinationIcon = Building;
  }

  const DestinationIcon = destinationIcon;

  return (
    <aside className="w-full lg:w-80 xl:w-88 bg-white rounded-3xl md:rounded-[36px] p-6 shadow-float border border-slate-100 flex flex-col justify-between shrink-0">
      <div>
        {/* User Profile Header matching "David Alonso" in reference UI */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            {/* User Avatar Circle */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-indigo-100 shadow-sm bg-slate-100 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="50" fill="#1e1445" />
                <circle cx="50" cy="40" r="20" fill="#fdba74" />
                {/* Hair */}
                <path d="M30 35 C30 18 70 18 70 35 C65 24 35 24 30 35 Z" fill="#331405" />
                {/* Body / Suit */}
                <path d="M22 88 C22 65 78 65 78 88 Z" fill="#4338ca" />
                <polygon points="50,68 44,80 56,80" fill="#ffffff" />
              </svg>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">David Alonso</h4>
              <p className="text-[11px] text-slate-400 font-medium">Cold-Chain Fleet Director</p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            IoT Live
          </span>
        </div>

        {/* Section Heading matching "Your order summary" in reference UI */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-slate-900 text-sm">
            Active Batch Telemetry
          </h3>
          <button
            onClick={() => onSelectBatch(batches[0]?.id)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            Filter
          </button>
        </div>

        {/* Monitored Perishable Batches List matching order items in reference UI */}
        <div className="space-y-3 mb-5">
          {batches.slice(0, 3).map((batch) => {
            const isCurrent = selectedBatch?.id === batch.id;
            const isAnomaly = batch.rslHours < 48;

            return (
              <div
                key={batch.id}
                onClick={() => onSelectBatch(batch.id)}
                className={`flex items-center justify-between p-2.5 rounded-2xl transition cursor-pointer border ${
                  isCurrent
                    ? 'bg-slate-50 border-indigo-200 ring-1 ring-indigo-500/20'
                    : 'hover:bg-slate-50/60 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="shrink-0">
                    <FoodDishAvatar category={batch.category} size="sm" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-slate-800 text-xs truncate">
                        {batch.name}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{batch.quantity} {batch.unit}</span>
                      <span>•</span>
                      <span className={isAnomaly ? 'text-rose-500 font-bold' : 'text-emerald-600 font-semibold'}>
                        {batch.rslHours}h RSL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">
                    ${(batch.pricePerUnit * (batch.quantity > 50 ? 1 : batch.quantity)).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    × 1 lot
                  </span>
                </div>
              </div>
            );
          })}

          {/* Environmental Compliance metric row matching "free delivery $0.00" in reference */}
          <div className="flex items-center justify-between pt-1 px-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span>Sensor Compliance SLA</span>
            </span>
            <span className="font-bold text-emerald-600">99.8%</span>
          </div>
        </div>

        {/* Dotted / Dashed Divider Line matching reference UI */}
        <div className="border-t border-dashed border-slate-200 my-4" />

        {/* Total Risk / Salvage Metric matching "Total: $11.97" in reference UI */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div>
            <span className="text-xs font-medium text-slate-400 block">Total Value at Risk:</span>
            <span className="text-[10px] text-rose-500 font-semibold">
              {compromisedCount} batches requiring action
            </span>
          </div>
          <span className="text-lg font-black text-slate-900">
            ${totalAtRiskValue.toFixed(2)}
          </span>
        </div>

        {/* Dynamic Destination Card matching "Your delivery address" in reference UI */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-700">Dynamic Dispatch Address</span>
            <button
              onClick={onOpenQualityGate}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
            >
              <span>Edit</span>
            </button>
          </div>

          <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <DestinationIcon className="w-4 h-4 text-[#1e1445]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 text-xs truncate">
                {destinationTitle}
              </p>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                {destinationType}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button matching signature "Checkout ->" deep purple pill button */}
      <div>
        <button
          onClick={() => {
            if (selectedBatch) {
              onRunPrediction(selectedBatch);
            }
          }}
          disabled={isLoadingPrediction}
          className="w-full py-4 px-5 bg-[#1e1445] hover:bg-[#2c1d68] active:scale-[0.98] text-white font-bold rounded-full shadow-pill hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-sm"
        >
          {isLoadingPrediction ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-sky-300" />
              <span>Analyzing Arrhenius Model...</span>
            </>
          ) : (
            <>
              <span>Run Spoilage Prediction</span>
              <ArrowRight className="w-4 h-4 text-sky-300 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-2">
          Calculates RSL & triggers dynamic supermarket vs. NGO routing
        </p>
      </div>
    </aside>
  );
}
