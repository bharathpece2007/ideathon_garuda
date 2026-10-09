import React from 'react';
import { PlusCircle, QrCode, Beaker, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { FoodDishAvatar } from '../FoodDishAvatar';

export function ManufacturerHub({
  batches = [],
  onOpenNewBatchModal,
  onOpenQrModal,
  onSelectBatch,
  selectedBatchId,
}) {
  const pendingBatches = batches.filter((b) => b.status === 'PENDING_DISTRIBUTOR_ACCEPT');
  const activeBatches = batches.filter((b) => b.status !== 'PENDING_DISTRIBUTOR_ACCEPT');

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h2 className="text-base font-bold text-slate-800">Manufacturer Hub (Inbound Creation & Dispatch)</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Register perishable manufacturing runs, capture baseline chemical kinetics, and mint IoT Digital Twins.
          </p>
        </div>

        <button
          onClick={onOpenNewBatchModal}
          className="px-5 py-2.5 rounded-2xl bg-[#1e1445] hover:bg-[#2b1d62] text-white text-xs font-bold transition shadow-pill flex items-center gap-2 group"
        >
          <PlusCircle className="w-4 h-4 text-sky-300 group-hover:rotate-90 transition" />
          <span>New Batch Digital Twin (Predict 1)</span>
        </button>
      </div>

      {/* Pending Distributor Acceptance Queue */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm">Inbound Queue: Pending Distributor Dispatch</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              {pendingBatches.length} pending
            </span>
          </div>
          <span className="text-xs text-slate-400">Awaiting reefer acceptance at dock</span>
        </div>

        {pendingBatches.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 text-center border border-dashed border-slate-200 text-xs text-slate-400">
            No batches waiting for distributor acceptance. Click "New Batch Digital Twin" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingBatches.map((batch) => (
              <div
                key={batch.id}
                onClick={() => onSelectBatch(batch.id)}
                className={`bg-white rounded-3xl p-4 shadow-sm border transition cursor-pointer hover:shadow-md ${
                  selectedBatchId === batch.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FoodDishAvatar category={batch.category} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{batch.name}</span>
                        <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                          PENDING_DISTRIBUTOR_ACCEPT
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{batch.id}</div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQrModal(batch);
                    }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 transition"
                    title="View Crypto QR Twin"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                {/* Parameters & Predict 1 Estimate */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Quantity</span>
                    <span className="text-xs font-bold text-slate-800">
                      {batch.quantity} {batch.unit}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Chemistry (pH/M)</span>
                    <span className="text-xs font-bold text-slate-800">
                      {batch.chemistry?.initialPh} / {batch.chemistry?.moisturePct}%
                    </span>
                  </div>

                  <div className="bg-indigo-50/70 p-2 rounded-xl">
                    <span className="text-[10px] text-indigo-500 block font-semibold">Predict 1 Baseline</span>
                    <span className="text-xs font-bold text-indigo-700">
                      {batch.baselineRslHours}h RSL
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dispatched & In-Transit Batches */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-800 text-sm">All Dispatched Batches Overview</h3>
          <span className="text-xs text-slate-400">{activeBatches.length} batches in fleet</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBatches.map((batch) => {
            const isCompromised = batch.status === 'COMPROMISED_THERMAL_SPIKE';
            const isCleared = batch.status === 'CLEARED_RETAIL';
            const isRescue = batch.status === 'RE_ROUTED_NGO';
            const isFlash = batch.status === 'FLASH_SALE_COMMERCE';
            const isRecycle = batch.status === 'BIO_RECYCLE';

            return (
              <div
                key={batch.id}
                onClick={() => onSelectBatch(batch.id)}
                className={`bg-white rounded-3xl p-4 shadow-sm border transition cursor-pointer hover:shadow-md ${
                  selectedBatchId === batch.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FoodDishAvatar category={batch.category} size="md" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{batch.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{batch.id}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQrModal(batch);
                    }}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
                    title="View QR Twin"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {batch.quantity} {batch.unit} · {batch.assignedHub}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      isCleared
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCompromised
                        ? 'bg-amber-100 text-amber-800'
                        : isRescue
                        ? 'bg-rose-100 text-rose-800'
                        : isFlash
                        ? 'bg-sky-100 text-sky-800'
                        : isRecycle
                        ? 'bg-slate-100 text-slate-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {batch.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[11px]">RSL:</span>
                    <span className={`font-bold ${batch.rslHours < 12 ? 'text-rose-600' : batch.rslHours < 48 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {batch.rslHours}h
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Health: <strong className="text-slate-700">{batch.healthScore}%</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
