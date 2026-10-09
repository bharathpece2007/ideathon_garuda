import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  Store,
  Tag,
  HeartHandshake,
  Recycle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Truck,
  ExternalLink,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { RETAIL_BUYERS, FLASH_SALE_BUYERS, NGO_RESCUE_NETWORK, RECYCLE_FACILITIES } from '../data/mockData';

export function QualityGateCard({
  batch,
  predictionResult,
  isLoading,
  onRunPrediction,
  onApplyRoute,
}) {
  const [yellowTab, setYellowTab] = useState('NGO'); // 'FLASH_SALE' or 'NGO'
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);

  // If prediction hasn't been run yet for this batch, show the pre-dispatch trigger state
  if (!predictionResult && !isLoading) {
    return (
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              QG
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Pre-Dispatch Quality Gate (Predict 2)</h4>
              <p className="text-xs text-slate-400">ML Automated Spoilage Verification</p>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
            Ready for Evaluation
          </span>
        </div>

        <div className="bg-slate-50/80 rounded-2xl p-4 mb-4 border border-slate-100 text-xs text-slate-600 space-y-2">
          <p>
            This batch has accumulated <strong>24 hours</strong> of reefer transit logs. Evaluate against Arrhenius microbial spoilage kinetics or live XGBoost Flask API to ensure safety before retail handover.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
            <span>• Baseline RSL: {batch.baselineRslHours}h</span>
            <span>• Current Temp: {batch.currentTemp}°C</span>
            <span>• Quantity: {batch.quantity} {batch.unit}</span>
          </div>
        </div>

        <button
          onClick={() => onRunPrediction(batch)}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-[#17113a] to-[#2b1c67] hover:from-[#1f174e] hover:to-[#382684] text-white font-semibold rounded-2xl shadow-pill hover:shadow-lg transition flex items-center justify-center gap-2 text-sm group"
        >
          <Sparkles className="w-4 h-4 text-indigo-300 group-hover:rotate-12 transition" />
          <span>Run Spoilage Prediction (Predict 2)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </button>
      </div>
    );
  }

  // Loading spinner state
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 animate-spin mb-3">
          <RefreshCw className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">Evaluating Arrhenius Microbial Kinetics...</h4>
        <p className="text-xs text-slate-400 mt-1">
          Processing cumulative thermal abuse degree-hours & substrate moisture kinetics
        </p>
      </div>
    );
  }

  const { routingCategory, predictedRslHours, qualityScore, recommendationSummary, engine } =
    predictionResult;

  // Filter relevant matching retail buyers
  const matchingRetailers = RETAIL_BUYERS.filter(
    (b) => predictedRslHours >= b.minRslHours
  );

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white ${
              routingCategory === 'GREEN'
                ? 'bg-emerald-500 shadow-emerald-200'
                : routingCategory === 'YELLOW'
                ? 'bg-amber-500 shadow-amber-200'
                : 'bg-rose-500 shadow-rose-200'
            } shadow-md`}
          >
            {routingCategory === 'GREEN' && <ShieldCheck className="w-5 h-5" />}
            {routingCategory === 'YELLOW' && <AlertTriangle className="w-5 h-5" />}
            {routingCategory === 'RED' && <Flame className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Quality Gate Decision</h4>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">
                {engine === 'FLASK_XGBOOST_BACKEND' ? '⚡ XGBoost Flask Model' : '🧬 Arrhenius Kinetics'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onRunPrediction(batch)}
          className="text-xs text-slate-500 hover:text-indigo-600 px-2 py-1 rounded-lg hover:bg-slate-50 transition flex items-center gap-1 font-medium"
        >
          <RefreshCw className="w-3 h-3" /> Re-Evaluate
        </button>
      </div>

      {/* Decision Metric Badges */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Predicted RSL</span>
          <span
            className={`text-base font-extrabold ${
              routingCategory === 'GREEN'
                ? 'text-emerald-600'
                : routingCategory === 'YELLOW'
                ? 'text-amber-600'
                : 'text-rose-600'
            }`}
          >
            {predictedRslHours}h
          </span>
          <span className="text-[9px] text-slate-400 block">Remaining</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Health Score</span>
          <span className="text-base font-extrabold text-slate-800">{qualityScore}%</span>
          <span className="text-[9px] text-slate-400 block">Biochemical</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Status Tier</span>
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-md inline-block mt-0.5 ${
              routingCategory === 'GREEN'
                ? 'bg-emerald-100 text-emerald-800'
                : routingCategory === 'YELLOW'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {routingCategory === 'GREEN' ? 'Tier 1' : routingCategory === 'YELLOW' ? 'Rescue' : 'Recycle'}
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Classification</span>
        </div>
      </div>

      {/* Recommendation Summary Banner */}
      <div
        className={`p-3 rounded-2xl mb-4 text-xs ${
          routingCategory === 'GREEN'
            ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-900'
            : routingCategory === 'YELLOW'
            ? 'bg-amber-50/70 border border-amber-200 text-amber-900'
            : 'bg-rose-50/70 border border-rose-200 text-rose-900'
        }`}
      >
        <p className="leading-relaxed font-medium">{recommendationSummary}</p>
      </div>

      {/* CASE 1: GREEN (> 48h RSL) - Cleared for Retail */}
      {routingCategory === 'GREEN' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-emerald-600" /> Matching Retail Buyers (Min RSL Met)
            </span>
            <span className="text-[11px] text-slate-400">{matchingRetailers.length} eligible</span>
          </div>

          <div className="space-y-2">
            {matchingRetailers.map((buyer) => (
              <div
                key={buyer.id}
                onClick={() => setSelectedBuyerId(buyer.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between text-xs ${
                  selectedBuyerId === buyer.id
                    ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-800">{buyer.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>Demand: {buyer.orderDemandKg} kg</span>
                    <span>• Req: {buyer.minRslHours}h+ RSL</span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <MapPin className="w-2.5 h-2.5" /> {buyer.distanceKm} km
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600">${buyer.bidPrice.toFixed(2)}/kg</div>
                  <span className="text-[10px] text-slate-400">Contract Rate</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              const chosen = matchingRetailers.find((b) => b.id === selectedBuyerId) || matchingRetailers[0];
              onApplyRoute(batch.id, 'CLEARED_RETAIL', chosen?.name || 'Nature\'s Basket Superstore');
            }}
            className="w-full mt-3 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Retail Handover & Dispatch Delivery</span>
          </button>
        </div>
      )}

      {/* CASE 2: YELLOW (12h - 48h RSL) - Compromised - Dual Action Tabs */}
      {routingCategory === 'YELLOW' && (
        <div className="space-y-3">
          {/* Dual Action Tab Headers */}
          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setYellowTab('FLASH_SALE')}
              className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                yellowTab === 'FLASH_SALE'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>Tab A: Flash-Sale (-60%)</span>
            </button>
            <button
              onClick={() => setYellowTab('NGO')}
              className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                yellowTab === 'NGO'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>Tab B: NGO Rescue</span>
            </button>
          </div>

          {/* Tab A Content: Flash-Sale Marketplace */}
          {yellowTab === 'FLASH_SALE' && (
            <div className="space-y-2">
              <div className="text-[11px] text-slate-500 mb-2">
                Push degraded batch to Quick-Commerce dark stores and central cloud kitchens at a guaranteed <strong>60% discount</strong> for same-day consumption.
              </div>

              {FLASH_SALE_BUYERS.map((buyer) => (
                <div
                  key={buyer.id}
                  onClick={() => setSelectedBuyerId(buyer.id)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between text-xs ${
                    selectedBuyerId === buyer.id
                      ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20'
                      : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-800">{buyer.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="text-amber-700 font-semibold">{buyer.discountPct}% Discount</span>
                      <span>• Max {buyer.maxIntakeKg} kg</span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <Clock className="w-2.5 h-2.5" /> ETA {buyer.pickupEtaMins}m
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-600">${buyer.offeredPrice.toFixed(2)}/kg</div>
                    <span className="text-[10px] text-slate-400">Salvage Price</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const chosen = FLASH_SALE_BUYERS.find((b) => b.id === selectedBuyerId) || FLASH_SALE_BUYERS[0];
                  onApplyRoute(batch.id, 'FLASH_SALE_COMMERCE', chosen.name);
                }}
                className="w-full mt-3 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-xs"
              >
                <Tag className="w-4 h-4" />
                <span>Liquidate to Flash Sale (Zero Food Waste)</span>
              </button>
            </div>
          )}

          {/* Tab B Content: Automated NGO Redistribution */}
          {yellowTab === 'NGO' && (
            <div className="space-y-2">
              <div className="text-[11px] text-slate-500 mb-2">
                Spatial routing matched nearest certified hunger-relief charities within emergency pickup radius:
              </div>

              {NGO_RESCUE_NETWORK.map((ngo) => (
                <div
                  key={ngo.id}
                  onClick={() => setSelectedBuyerId(ngo.id)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between text-xs ${
                    selectedBuyerId === ngo.id
                      ? 'border-rose-500 bg-rose-50/40 ring-2 ring-rose-500/20'
                      : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{ngo.name}</span>
                      <span className="bg-rose-100 text-rose-700 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                        {ngo.distanceKm} km away
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Capacity: {ngo.mealCapacity} meals</span>
                      <span>• Contact: {ngo.contactPerson}</span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <Clock className="w-2.5 h-2.5" /> ETA {ngo.pickupEtaMins}m
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full border border-rose-200">
                      Tax Credit Eligible
                    </span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const chosen = NGO_RESCUE_NETWORK.find((n) => n.id === selectedBuyerId) || NGO_RESCUE_NETWORK[0];
                  onApplyRoute(batch.id, 'RE_ROUTED_NGO', chosen.name);
                }}
                className="w-full mt-3 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-xs"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Dispatch Urgent NGO Food Rescue Pickup</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* CASE 3: RED (< 12h RSL) - Critically Degraded */}
      {routingCategory === 'RED' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
              <Recycle className="w-3.5 h-3.5 text-rose-600" /> Circular Waste & Bio-Recycling Route
            </span>
            <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">
              Non-Edible Safe Disposal
            </span>
          </div>

          <div className="space-y-2">
            {RECYCLE_FACILITIES.map((fac) => (
              <div
                key={fac.id}
                onClick={() => setSelectedBuyerId(fac.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between text-xs ${
                  selectedBuyerId === fac.id
                    ? 'border-rose-500 bg-rose-50/40 ring-2 ring-rose-500/20'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-800">{fac.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{fac.intakeType}</span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <MapPin className="w-2.5 h-2.5" /> {fac.distanceKm} km
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-600 text-[11px]">
                    +{fac.co2OffsetKgPerTon} kg CO2 Offset
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              const chosen = RECYCLE_FACILITIES.find((f) => f.id === selectedBuyerId) || RECYCLE_FACILITIES[0];
              onApplyRoute(batch.id, 'BIO_RECYCLE', chosen.name);
            }}
            className="w-full mt-3 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-xs"
          >
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>Auto-Route to Circular Bio-Digestion Facility</span>
          </button>
        </div>
      )}
    </div>
  );
}
