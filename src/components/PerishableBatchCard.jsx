import React from 'react';
import { Star, QrCode, ShieldAlert, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { FoodDishAvatar } from './FoodDishAvatar';

export function PerishableBatchCard({
  batch,
  isSelected,
  onSelect,
  onOpenQr,
}) {
  // Theme card colors matching the exact pastel palette in the reference mockup
  const themeClasses = {
    peach: 'bg-[#fed8c7]/40 hover:bg-[#fed8c7]/60 border-[#fed8c7]/80',
    sky: 'bg-[#d7ecfc]/40 hover:bg-[#d7ecfc]/60 border-[#d7ecfc]/80',
    rose: 'bg-[#fde2e4]/40 hover:bg-[#fde2e4]/60 border-[#fde2e4]/80',
    amber: 'bg-[#fef3c7]/40 hover:bg-[#fef3c7]/60 border-[#fef3c7]/80',
    mint: 'bg-[#ddf5e8]/40 hover:bg-[#ddf5e8]/60 border-[#ddf5e8]/80',
  };

  const cardStyle = themeClasses[batch.cardTheme] || themeClasses.peach;

  const isDegraded = batch.rslHours < 12 || batch.status === 'CRITICALLY_DEGRADED';
  const isCompromised = (batch.rslHours >= 12 && batch.rslHours < 48) || batch.status === 'COMPROMISED_THERMAL_SPIKE';
  const isOptimal = batch.rslHours >= 48;

  return (
    <div
      onClick={() => onSelect(batch.id)}
      className={`relative pt-12 pb-4 px-4 rounded-[28px] border transition-all duration-300 cursor-pointer text-left group min-w-[210px] max-w-[250px] flex-1 ${cardStyle} ${
        isSelected
          ? 'ring-2 ring-[#1e1445] shadow-md scale-[1.02]'
          : 'shadow-subtle hover:-translate-y-1 hover:shadow-md'
      }`}
    >
      {/* Floating circular food dish matching the exact reference UI composition */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform duration-300">
        <FoodDishAvatar category={batch.category} size="lg" />
      </div>

      {/* QR Code quick-button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenQr(batch);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 hover:bg-white text-slate-500 hover:text-slate-800 transition shadow-xs"
        title="View IoT QR Twin"
      >
        <QrCode className="w-3.5 h-3.5" />
      </button>

      {/* Card Content */}
      <div className="mt-4">
        {/* Rating and Thermal Health Badge matching "★ 4.7" in reference UI */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="font-bold text-slate-800">{batch.rating || 4.7}</span>
          <span className="text-[10px] text-slate-400 font-medium">({batch.healthScore}% Qual)</span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-slate-900 text-sm truncate leading-snug">
          {batch.name}
        </h4>

        {/* Quantity & Hub */}
        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
          {batch.quantity} {batch.unit} · {batch.id}
        </p>

        {/* Bottom Pill & Price/RSL */}
        <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-black text-slate-900">
              ${batch.pricePerUnit?.toFixed(2) || '4.99'}
            </span>
            <span className="text-[9px] text-slate-400 block font-medium">
              {batch.rslHours}h RSL
            </span>
          </div>

          {/* Status Badge */}
          <span
            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              isDegraded
                ? 'bg-rose-500 text-white shadow-xs'
                : isCompromised
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-emerald-600 text-white shadow-xs'
            }`}
          >
            {isDegraded ? 'Critical' : isCompromised ? 'Degraded' : 'Optimal'}
          </span>
        </div>
      </div>
    </div>
  );
}
