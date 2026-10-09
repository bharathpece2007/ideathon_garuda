import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { Thermometer, Droplets, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

// Custom Tooltip component for high precision telemetry hover
function CustomTelemetryTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const isExcursion = dataPoint.temp > 8.0;

    return (
      <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 text-xs">
        <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-slate-100">
          <span className="font-bold text-slate-800">Timeline Hour: {label}</span>
          {isExcursion ? (
            <span className="inline-flex items-center gap-1 font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px]">
              <AlertTriangle className="w-3 h-3" /> Thermal Breach
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
              <ShieldCheck className="w-3 h-3" /> Cold Compliant
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-rose-500" /> Temperature:
            </span>
            <span className={`font-bold ${isExcursion ? 'text-rose-600' : 'text-slate-700'}`}>
              {dataPoint.temp}°C
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500 flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-500" /> Relative Humidity:
            </span>
            <span className="font-bold text-slate-700">{dataPoint.humidity}%</span>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-50">
            <span className="text-slate-400">Critical Threshold:</span>
            <span className="font-mono text-slate-600">8.0°C</span>
          </div>

          {dataPoint.event && (
            <div className="mt-1.5 pt-1.5 border-t border-rose-100 text-[10px] text-rose-700 font-semibold bg-rose-50/60 p-1.5 rounded-lg flex items-center gap-1">
              <Zap className="w-3 h-3 text-rose-500 shrink-0" />
              <span>{dataPoint.event}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export function TelemetryChart({ logs = [], batchId, onSimulateAnomaly, onResetOptimal }) {
  // Find peak excursion point for the visual event marker
  const peakExcursion = logs.reduce(
    (max, item) => (item.temp > (max ? max.temp : -Infinity) ? item : max),
    null
  );

  const hasBreach = logs.some((l) => l.temp > 8.0);

  return (
    <div className="w-full bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm md:text-base">
              24-Hour Continuous Telemetry Stream
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
              {batchId || 'GARUDA-PAN-9021'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-sensor telemetry log with 8.0°C critical dairy safety threshold
          </p>
        </div>

        {/* Anomaly simulation triggers for interactive demonstration */}
        <div className="flex items-center gap-2">
          {onSimulateAnomaly && (
            <button
              onClick={() => onSimulateAnomaly('compressor_failure')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                hasBreach
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/60'
              }`}
              title="Simulate compressor failure at Hour 12 peaking at 16°C"
            >
              <Zap className="w-3.5 h-3.5 text-rose-500" />
              <span>Simulate Spike (16°C)</span>
            </button>
          )}

          {onResetOptimal && (
            <button
              onClick={onResetOptimal}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 transition flex items-center gap-1"
              title="Reset telemetry back to steady optimal 3.8°C"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Reset Optimal</span>
            </button>
          )}
        </div>
      </div>

      {/* Legend & Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
        <div className="bg-slate-50/70 p-2.5 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span>Temperature (Y1)</span>
          </div>
          <div className="font-bold text-slate-800 text-sm">
            {logs[logs.length - 1]?.temp ?? 3.8}°C{' '}
            <span className="text-[10px] font-normal text-slate-400">Current</span>
          </div>
        </div>

        <div className="bg-slate-50/70 p-2.5 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
            <span>Humidity (Y2)</span>
          </div>
          <div className="font-bold text-slate-800 text-sm">
            {logs[logs.length - 1]?.humidity ?? 88}%{' '}
            <span className="text-[10px] font-normal text-slate-400">RH</span>
          </div>
        </div>

        <div className="bg-slate-50/70 p-2.5 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-rose-600 mb-0.5 font-medium">
            <span className="w-2.5 h-0.5 bg-rose-500 inline-block"></span>
            <span>Safety Gate</span>
          </div>
          <div className="font-bold text-rose-600 text-sm">
            8.0°C <span className="text-[10px] font-normal text-rose-400">Critical Max</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-2xl border ${hasBreach ? 'bg-amber-50/60 border-amber-200 text-amber-900' : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'}`}>
          <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">
            {hasBreach ? 'Thermal Excursion' : 'Cold Integrity'}
          </div>
          <div className="font-bold text-sm">
            {hasBreach ? `Peak: ${peakExcursion?.temp}°C (H${peakExcursion?.hour})` : 'Stable 100%'}
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Composed Chart */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={logs} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tick={{ fill: '#64748b', fontSize: 10 }}
              interval={2}
            />

            {/* Left Y-Axis: Temperature (°C) */}
            <YAxis
              yAxisId="left"
              domain={[0, 24]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#f43f5e', fontSize: 10 }}
              unit="°C"
            />

            {/* Right Y-Axis: Humidity (%) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[40, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#0284c7', fontSize: 10 }}
              unit="%"
            />

            <Tooltip content={<CustomTelemetryTooltip />} />

            {/* Critical Dairy Safety Line at 8°C */}
            <ReferenceLine
              yAxisId="left"
              y={8}
              stroke="#e11d48"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: 'Critical Threshold: 8.0°C',
                position: 'insideTopLeft',
                fill: '#be123c',
                fontSize: 10,
                fontWeight: 600,
              }}
            />

            {/* Visual Heat Spike Event Marker */}
            {peakExcursion && peakExcursion.temp > 8.0 && (
              <ReferenceDot
                yAxisId="left"
                x={peakExcursion.hour}
                y={peakExcursion.temp}
                r={6}
                fill="#e11d48"
                stroke="#ffffff"
                strokeWidth={2}
              />
            )}

            {/* Humidity Area */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              name="Humidity"
              stroke="#38bdf8"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#humidityGradient)"
            />

            {/* Temperature Line / Area */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="temp"
              name="Temperature"
              stroke="#f43f5e"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#tempGradient)"
              activeDot={{ r: 6, fill: '#e11d48', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Visual Marker Explanation */}
      {hasBreach && peakExcursion && (
        <div className="mt-3 bg-rose-50/70 border border-rose-200/80 rounded-2xl px-3 py-2 flex items-center justify-between text-xs text-rose-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping shrink-0" />
            <span className="font-semibold">
              Heat Spike Event Marker: Hour {peakExcursion.hour} reached {peakExcursion.temp}°C
            </span>
          </div>
          <span className="text-[11px] font-medium text-rose-600">
            {peakExcursion.event || 'Compressor Anomaly Detected'}
          </span>
        </div>
      )}
    </div>
  );
}
