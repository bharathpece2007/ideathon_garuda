import React from 'react';
import { Store, ShoppingBag, ShieldCheck, Clock, MapPin, Truck, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { RETAIL_BUYERS, FLASH_SALE_BUYERS } from '../../data/mockData';
import { FoodDishAvatar } from '../FoodDishAvatar';

export function RetailerMarketplace({ batches = [] }) {
  // Batches that were cleared or routed to retail
  const retailDeliveries = batches.filter(
    (b) => b.status === 'CLEARED_RETAIL' || b.decisionHistory?.targetRetailer
  );

  const flashSaleDeliveries = batches.filter(
    (b) => b.status === 'FLASH_SALE_COMMERCE'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-800">Retailer Marketplace & Demand Portal</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time supermarket demand intake, minimum Remaining Shelf Life (RSL) safety gates, and inbound reefer deliveries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
            {retailDeliveries.length} Batches En-Route to Stores
          </span>
        </div>
      </div>

      {/* Active Supermarket Demand Bids */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-800 text-sm">
            Active Tier-1 Supermarket Procurement Requests
          </h3>
          <span className="text-xs text-slate-400">Strict Quality & Minimum RSL Constraints</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RETAIL_BUYERS.map((buyer) => (
            <div
              key={buyer.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{buyer.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{buyer.location} ({buyer.distanceKm} km away)</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ${buyer.bidPrice.toFixed(2)}/kg
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">SKU Demand</span>
                  <span className="font-bold text-slate-800">{buyer.acceptedCategory}</span>
                </div>

                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Req. Quantity</span>
                  <span className="font-bold text-slate-800">{buyer.orderDemandKg} kg</span>
                </div>

                <div className="bg-emerald-50/70 p-2 rounded-xl">
                  <span className="text-[10px] text-emerald-600 block font-semibold">Min RSL Gate</span>
                  <span className="font-extrabold text-emerald-700">{buyer.minRslHours}h Shelf Life</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incoming Accepted Deliveries from Distributors */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-800 text-sm">Incoming Accepted Deliveries (Quality Gate Cleared)</h3>
          <span className="text-xs text-slate-400">{retailDeliveries.length} shipments inbound</span>
        </div>

        {retailDeliveries.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 text-center border border-dashed border-slate-200 text-xs text-slate-400">
            No batches currently cleared for retail handover. Run "Pre-Dispatch Quality Gate" in the Distributor Hub to clear qualifying inventory.
          </div>
        ) : (
          <div className="space-y-3">
            {retailDeliveries.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <FoodDishAvatar category={batch.category} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{batch.name}</span>
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        CLEARED FOR RETAIL
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Batch #{batch.id} • {batch.quantity} {batch.unit} • Carrier: {batch.assignedHub}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Verified RSL</span>
                    <span className="font-bold text-emerald-600">{batch.rslHours}h remaining</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Assigned Destination</span>
                    <span className="font-bold text-slate-800">
                      {batch.decisionHistory?.targetRetailer || "Reliance Fresh Superstore"}
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Commerce Flash-Sale Inbound */}
      {flashSaleDeliveries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-slate-800 text-sm">Quick-Commerce Flash Sale Inbound (Salvaged Batches)</h3>
            <span className="text-xs text-amber-600 font-semibold">{flashSaleDeliveries.length} active</span>
          </div>

          <div className="space-y-3">
            {flashSaleDeliveries.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-3xl p-4 shadow-sm border border-amber-200 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <FoodDishAvatar category={batch.category} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{batch.name}</span>
                      <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                        60% FLASH-SALE DIVERSION
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Batch #{batch.id} • {batch.quantity} {batch.unit} • Salvaged before spoilage
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-[10px] text-slate-400 block">Destination</span>
                  <span className="font-bold text-amber-700">
                    {batch.decisionHistory?.targetRetailer || "Blinkit Instant Dark Store #14"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
