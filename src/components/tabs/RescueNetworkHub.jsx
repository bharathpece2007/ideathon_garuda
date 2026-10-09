import React from 'react';
import {
  HeartHandshake,
  Recycle,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { NGO_RESCUE_NETWORK, RECYCLE_FACILITIES } from '../../data/mockData';
import { FoodDishAvatar } from '../FoodDishAvatar';

export function RescueNetworkHub({ batches = [] }) {
  const ngoRescues = batches.filter((b) => b.status === 'RE_ROUTED_NGO');
  const bioRecycles = batches.filter((b) => b.status === 'BIO_RECYCLE');

  // Calculate live cumulative metrics
  const totalMealsSaved = 14200 + ngoRescues.reduce((sum, b) => sum + b.quantity * 2.5, 0);
  const totalCo2SavedKg = 4850 + (ngoRescues.length * 450) + (bioRecycles.length * 680);

  return (
    <div className="space-y-6">
      {/* Top Banner & Impact Metrics */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-white/20 rounded-xl backdrop-blur-md">
                <HeartHandshake className="w-5 h-5 text-white" />
              </span>
              <h2 className="text-lg font-bold">Automated Food Rescue & Circular Network</h2>
            </div>
            <p className="text-xs text-rose-100 max-w-xl">
              When cold-chain anomalies make food unsuitable for standard supermarket shelf-life, our algorithmic dispatch reroutes high-protein inventory to local NGOs within minutes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-rose-200 block">Meals Rescued</span>
              <span className="text-xl font-extrabold">{Math.round(totalMealsSaved).toLocaleString()}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-rose-200 block">CO2 Diverted</span>
              <span className="text-xl font-extrabold">{Math.round(totalCo2SavedKg).toLocaleString()} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Dispatches Stream */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-800 text-sm">Active Emergency Rescue Dispatches</h3>
          <span className="text-xs text-rose-600 font-semibold">{ngoRescues.length} active emergency pickups</span>
        </div>

        {ngoRescues.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 text-center border border-dashed border-slate-200 text-xs text-slate-400">
            No active NGO emergency pickups at this second. Batches identified in the 12h - 48h RSL range will be automatically routed here.
          </div>
        ) : (
          <div className="space-y-3">
            {ngoRescues.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-3xl p-4 shadow-sm border border-rose-100 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <FoodDishAvatar category={batch.category} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{batch.name}</span>
                      <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        EMERGENCY NGO PICKUP
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Batch #{batch.id} • {batch.quantity} {batch.unit} • Salvaged before spoilage
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Matched Organization</span>
                    <span className="font-bold text-rose-700">
                      {batch.decisionHistory?.targetRetailer || 'Feeding India (Sector 4 Hub)'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Pickup Vehicle</span>
                    <span className="font-bold text-slate-800">En-Route (ETA 18 mins)</span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NGO Partners Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-800 text-sm">Verified Hunger-Relief Partner Network</h3>
          <span className="text-xs text-slate-400">Automated spatial distance matching</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NGO_RESCUE_NETWORK.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="p-2 rounded-2xl bg-rose-50 text-rose-600">
                    <HeartHandshake className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                    {ngo.distanceKm} km away
                  </span>
                </div>

                <h4 className="font-bold text-slate-800 text-sm">{ngo.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{ngo.address}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Meal Capacity:</span>
                    <span className="font-bold text-slate-700">{ngo.mealCapacity} meals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Typical Pickup ETA:</span>
                    <span className="font-bold text-slate-700">{ngo.pickupEtaMins} mins</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Coordinator:</span>
                    <span className="font-medium text-slate-600">{ngo.contactPerson}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{ngo.verifiedCertification}</span>
                <span className="text-rose-600 font-semibold">{ngo.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circular Biogas & Organic Conversion Facilities */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Recycle className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              Circular Bio-Waste & Anaerobic Conversion Hubs
            </h3>
          </div>
          <span className="text-xs text-slate-400">For Critically Degraded Batches (&lt;12h RSL)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECYCLE_FACILITIES.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{fac.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{fac.address} ({fac.distanceKm} km)</span>
                </div>
                <div className="text-xs text-slate-600 font-medium mt-2">
                  Intake: {fac.intakeType}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 block">
                  +{fac.co2OffsetKgPerTon} kg CO2/ton
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Zero Methane Emission</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
