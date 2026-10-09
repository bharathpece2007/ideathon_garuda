import React from 'react';
import { CategoryIcon } from './CategoryIcon';
import { ArrowDownRight, Clock, PlusCircle, CheckCircle2, Building2 } from 'lucide-react';

export function InboundPanel({
  inboundBatches = [],
  onAcceptToWarehouse,
  onAddSampleBatch,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
            1
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Manufacturer Inbound Feed</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                BUY
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Incoming supplier batches available to accept into warehouse
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
          {inboundBatches.length} Available
        </span>
      </div>

      {/* Batches Feed */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {inboundBatches.length === 0 ? (
          <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-700">All Inbound Batches Accepted</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
              All incoming manufacturer shipments have been accepted into warehouse cold storage.
            </p>
            {onAddSampleBatch && (
              <button
                onClick={onAddSampleBatch}
                className="mt-3 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Simulate New Supplier Inbound</span>
              </button>
            )}
          </div>
        ) : (
          inboundBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-3.5 border border-slate-200/60 transition group hover:border-slate-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <CategoryIcon category={batch.category} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-xs">{batch.category}</h4>
                      <span className="text-[10px] font-mono font-medium text-slate-400">
                        {batch.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span className="font-medium">{batch.manufacturer}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-slate-800">
                    {batch.quantity} {batch.unit}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Lot Volume</span>
                </div>
              </div>

              {/* Data Row */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>General Baseline RSL:</span>
                  <strong className="text-slate-700">{batch.baselineRslLabel}</strong>
                </div>

                {/* One-Click Action Button */}
                <button
                  onClick={() => onAcceptToWarehouse(batch)}
                  className="px-3 py-1.5 bg-[#17113a] hover:bg-[#271d5c] text-white text-[11px] font-bold rounded-xl transition shadow-xs flex items-center gap-1 active:scale-95"
                >
                  <ArrowDownRight className="w-3.5 h-3.5 text-sky-300" />
                  <span>Accept to Warehouse</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Add Supplier Trigger at Bottom */}
      {inboundBatches.length > 0 && onAddSampleBatch && (
        <div className="pt-3 mt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
          <span>Supplier dock stream active</span>
          <button
            onClick={onAddSampleBatch}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <PlusCircle className="w-3 h-3" />
            <span>+ Add Supplier Batch</span>
          </button>
        </div>
      )}
    </div>
  );
}
