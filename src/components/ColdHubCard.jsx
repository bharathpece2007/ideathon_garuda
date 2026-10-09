import React from 'react';
import { Star, Truck, Building2, MapPin, ShieldCheck, Thermometer } from 'lucide-react';

export function ColdHubCard({ hub, isSelected, onSelect }) {
  const isTruck = hub.thumbnail === 'facility_truck' || hub.thumbnail === 'facility_apex';

  return (
    <div
      onClick={() => onSelect && onSelect(hub.id)}
      className="bg-white/90 hover:bg-white rounded-2xl p-3.5 border border-slate-100 shadow-subtle hover:shadow-md transition-all duration-200 flex items-center gap-3.5 min-w-[240px] flex-1 cursor-pointer group"
    >
      {/* Facility Thumbnail matching the rounded photo in reference UI */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 p-2.5 flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-105 transition-transform">
        {isTruck ? (
          <Truck className="w-7 h-7 text-indigo-600" />
        ) : (
          <Building2 className="w-7 h-7 text-indigo-600" />
        )}
      </div>

      {/* Hub Details */}
      <div className="min-w-0 flex-1">
        <h5 className="font-bold text-slate-900 text-xs truncate group-hover:text-indigo-600 transition">
          {hub.name}
        </h5>

        {/* Stars */}
        <div className="flex items-center gap-1 my-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2.5 h-2.5 ${
                i < Math.floor(hub.rating)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200'
              }`}
            />
          ))}
          <span className="text-[10px] text-slate-500 font-semibold ml-1">
            {hub.rating.toFixed(1)}
          </span>
        </div>

        {/* Location & Temp Range */}
        <div className="flex items-center gap-1 text-[10px] text-slate-400 truncate">
          <MapPin className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">{hub.location}</span>
        </div>
      </div>
    </div>
  );
}
