import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { CategoryIcon } from './CategoryIcon';
import {
  Sparkles,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  HeartHandshake,
  Thermometer,
  Zap,
  ArrowRight,
  Warehouse,
} from 'lucide-react';

export function WarehousePanel({
  warehouseBatches = [],
  selectedBatchId,
  onSelectBatch,
  onRunPrediction,
  isPredicting,
  onRouteToRescue,
}) {
  const selectedBatch =
    warehouseBatches.find((b) => b.id === selectedBatchId) || warehouseBatches[0];

  const hasSpike = selectedBatch?.tempLogs?.some((p) => p.temp > 8.0) || selectedBatch?.hasSpike;

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs border border-amber-100">
            2
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Warehouse Inventory & Predictive Gate</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                MONITOR & PREDICT
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Sitting in cold storage · Thermal logs · AI shelf life verification
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
          {warehouseBatches.length} in Vault
        </span>
      </div>

      {warehouseBatches.length === 0 ? (
        <div className="py-16 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl flex-1 flex flex-col items-center justify-center">
          <Warehouse className="w-8 h-8 text-slate-300 mb-2" />
          <h4 className="text-xs font-bold text-slate-700">Cold Storage Empty</h4>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
            Accept inbound manufacturer batches from Screen 1 (Buy) to monitor and predict RSL.
          </p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {/* Batches Selector Pills */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">
              Select Batch to Inspect:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {warehouseBatches.map((batch) => {
                const isSelected = selectedBatch?.id === batch.id;
                const isGreen = batch.rslStatus === 'GREEN';
                const isYellow = batch.rslStatus === 'YELLOW';

                return (
                  <button
                    key={batch.id}
                    onClick={() => onSelectBatch(batch.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#17113a] text-white border-[#17113a] shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/70 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {batch.id}
                      </span>
                      {isGreen && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-200" title="GREEN: Retail Ready" />
                      )}
                      {isYellow && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-200" title="YELLOW: Unfit for Retail" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={batch.category} size="sm" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">{batch.category}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {batch.quantity} {batch.unit}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Batch Inspection & Recharts Graph */}
          {selectedBatch && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-slate-800">
                    24h Temperature Fluctuation Log: {selectedBatch.id}
                  </span>
                </div>
                {hasSpike ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-rose-600" /> Thermal Spike Detected
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Optimal Cold-Chain
                  </span>
                )}
              </div>

              {/* Small Recharts Line Graph with 8°C dashed reference line */}
              <div className="h-32 w-full my-2 bg-white rounded-xl p-2 border border-slate-200/60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={selectedBatch.tempLogs || []}
                    margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tick={{ fill: '#94a3b8', fontSize: 9 }}
                      interval={2}
                    />
                    <YAxis
                      domain={[0, 18]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#64748b', fontSize: 9 }}
                      unit="°C"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg">
                              <div>Hour: {data.time}</div>
                              <div className="font-bold text-rose-300">Temp: {data.temp}°C</div>
                              <div className="text-slate-400">Limit: 8.0°C</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    {/* 8.0°C Critical safety limit reference line */}
                    <ReferenceLine
                      y={8.0}
                      stroke="#f43f5e"
                      strokeDasharray="3 3"
                      label={{
                        value: '8°C Limit',
                        fill: '#e11d48',
                        fontSize: 9,
                        position: 'insideTopLeft',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke={hasSpike ? '#e11d48' : '#3b82f6'}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#e11d48' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* The Model Integration Placeholder Button */}
              <div className="mt-3 pt-3 border-t border-slate-200/60">
                <button
                  onClick={() => onRunPrediction(selectedBatch)}
                  disabled={isPredicting}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#17113a] to-[#2c1d68] hover:from-[#211854] hover:to-[#382684] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 group active:scale-98 disabled:opacity-75"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-300" />
                      <span>Evaluating Thermal Kinetics...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-sky-300 group-hover:rotate-12 transition-transform" />
                      <span>Run Pre-Dispatch RSL Prediction</span>
                    </>
                  )}
                </button>
              </div>

              {/* Prediction Result Display (GREEN vs YELLOW) */}
              {selectedBatch.predictedRsl !== null && (
                <div className="mt-3 animate-fade-in">
                  {selectedBatch.rslStatus === 'GREEN' ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-extrabold text-emerald-800 block text-[11px] uppercase tracking-wider">
                            GREEN: Retail Ready
                          </span>
                          <span className="text-slate-600 text-[11px]">
                            True RSL: <strong className="text-emerald-700">{selectedBatch.predictedRsl}h</strong> (&gt; 48h required). Cleared for Supermarkets in Screen 3.
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-extrabold text-amber-800 block text-[11px] uppercase tracking-wider">
                              YELLOW: Unfit for Retail
                            </span>
                            <span className="text-slate-600 text-[11px]">
                              True RSL: <strong className="text-amber-700">{selectedBatch.predictedRsl}h</strong> (&lt; 48h limit). Degraded due to thermal spike.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Prominent Action: Route to NGO / Flash-Sale */}
                      <button
                        onClick={() => onRouteToRescue(selectedBatch)}
                        className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Route to NGO / Flash-Sale (Zero Waste)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
