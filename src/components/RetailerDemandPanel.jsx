import React, { useState } from 'react';
import { CategoryIcon } from './CategoryIcon';
import { Store, ShieldCheck, CheckCircle2, Clock, ArrowUpRight, AlertCircle } from 'lucide-react';

export function RetailerDemandPanel({
  retailerOrders = [],
  warehouseBatches = [],
  onFulfillOrder,
}) {
  // Local state for which batch is currently selected for each order dropdown
  const [selectedAssignments, setSelectedAssignments] = useState({});

  const handleSelectBatchForOrder = (orderId, batchId) => {
    setSelectedAssignments((prev) => ({
      ...prev,
      [orderId]: batchId,
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-100">
            3
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Retailer Demand Board</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                SELL & PLAN
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Active supermarket procurement orders with strict RSL constraints
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
          {retailerOrders.filter((o) => o.status !== 'FULFILLED').length} Active Orders
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {retailerOrders.map((order) => {
          const isFulfilled = order.status === 'FULFILLED';

          // Candidate batches in warehouse matching the requested item
          const matchingBatches = warehouseBatches.filter(
            (b) => b.category === order.requestedItem
          );

          const chosenBatchId = selectedAssignments[order.id] || '';
          const chosenBatch = warehouseBatches.find((b) => b.id === chosenBatchId);

          // Validation: Can only fulfill if:
          // 1. Batch is chosen
          // 2. Batch has been predicted
          // 3. Batch's predicted RSL >= retailer's minRequiredRslHours
          const isEligibleToFulfill =
            chosenBatch &&
            chosenBatch.predictedRsl !== null &&
            chosenBatch.predictedRsl >= order.minRequiredRslHours;

          return (
            <div
              key={order.id}
              className={`rounded-2xl p-3.5 border transition ${
                isFulfilled
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-slate-50/70 border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <CategoryIcon category={order.requestedItem} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-xs">{order.retailer}</h4>
                      {isFulfilled ? (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Fulfilled
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">
                          {order.id}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Requested: <strong className="text-slate-800">{order.quantity} {order.unit}</strong> of{' '}
                      <span className="font-semibold text-slate-700">{order.requestedItem}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 block">
                    {order.minRslLabel}
                  </span>
                </div>
              </div>

              {/* Assignment Controls */}
              {!isFulfilled ? (
                <div className="mt-3 pt-2.5 border-t border-slate-200/50 space-y-2">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {/* "Assign Batch" Dropdown */}
                    <div className="flex-1">
                      <select
                        value={chosenBatchId}
                        onChange={(e) => handleSelectBatchForOrder(order.id, e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="">-- Assign Batch from Cold Warehouse --</option>
                        {matchingBatches.length === 0 ? (
                          <option disabled value="">
                            No {order.requestedItem} in warehouse
                          </option>
                        ) : (
                          matchingBatches.map((b) => {
                            const isPredicted = b.predictedRsl !== null;
                            const meetsRequirement = isPredicted && b.predictedRsl >= order.minRequiredRslHours;

                            let label = `${b.id} (${b.quantity}${b.unit})`;
                            if (!isPredicted) {
                              label += ' - [Needs Prediction 1st]';
                            } else if (meetsRequirement) {
                              label += ` - [Eligible: ${b.predictedRsl}h RSL]`;
                            } else {
                              label += ` - [Unfit: ${b.predictedRsl}h < ${order.minRequiredRslHours}h req]`;
                            }

                            return (
                              <option
                                key={b.id}
                                value={b.id}
                                disabled={!meetsRequirement}
                              >
                                {label}
                              </option>
                            );
                          })
                        )}
                      </select>
                    </div>

                    {/* Fulfill Action Button */}
                    <button
                      onClick={() => onFulfillOrder(order.id, chosenBatchId)}
                      disabled={!isEligibleToFulfill}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 shrink-0 ${
                        isEligibleToFulfill
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fulfill Order</span>
                    </button>
                  </div>

                  {/* Informative Hint / Warning */}
                  {chosenBatch && chosenBatch.predictedRsl === null && (
                    <p className="text-[10px] text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>Batch #{chosenBatch.id} has not been predicted yet. Click "Run Pre-Dispatch RSL Prediction" in Screen 2 first.</span>
                    </p>
                  )}

                  {chosenBatch && chosenBatch.predictedRsl !== null && chosenBatch.predictedRsl < order.minRequiredRslHours && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>Disqualified: True RSL ({chosenBatch.predictedRsl}h) is below {order.retailer}'s requirement ({order.minRequiredRslHours}h).</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-2.5 pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800">
                  <span>Assigned & Dispatched: <strong>{order.assignedBatchId}</strong></span>
                  <span className="font-semibold text-emerald-600">Dispatched via Reefer Truck</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
