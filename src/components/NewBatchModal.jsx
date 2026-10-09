import React, { useState } from 'react';
import { X, Sparkles, QrCode, Beaker, Calendar, Layers, CheckCircle2 } from 'lucide-react';
import { calculateDeterministicRSL } from '../services/mlService';

export function NewBatchModal({ isOpen, onClose, onCreateBatch }) {
  const [formData, setFormData] = useState({
    productCategory: 'Fresh Paneer',
    batchId: `GARUDA-PAN-${Math.floor(1000 + Math.random() * 9000)}`,
    quantity: 250,
    unit: 'kg',
    manufacturingTime: new Date().toISOString().slice(0, 16),
    moisturePct: 62.5,
    proteinPct: 18.2,
    initialPh: 6.4,
  });

  const [previewResult, setPreviewResult] = useState(null);

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    let defaultUnit = 'kg';
    let prefix = 'PAN';
    let moisture = 62.5;
    let protein = 18.2;
    let ph = 6.4;

    if (category === 'Pasteurized Milk') {
      defaultUnit = 'L';
      prefix = 'MLK';
      moisture = 87.5;
      protein = 3.3;
      ph = 6.7;
    } else if (category === 'Curd') {
      defaultUnit = 'kg';
      prefix = 'CRD';
      moisture = 81.0;
      protein = 9.5;
      ph = 4.5;
    } else if (category === 'Mushrooms') {
      defaultUnit = 'kg';
      prefix = 'MSH';
      moisture = 91.5;
      protein = 3.1;
      ph = 6.5;
    }

    setFormData({
      ...formData,
      productCategory: category,
      unit: defaultUnit,
      batchId: `GARUDA-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      moisturePct: moisture,
      proteinPct: protein,
      initialPh: ph,
    });
  };

  // Run instantaneous Predict 1 (Baseline Initial Estimate)
  const calculateBaselineEstimate = () => {
    const res = calculateDeterministicRSL({
      productCategory: formData.productCategory,
      quantity: Number(formData.quantity),
      manufacturingTime: formData.manufacturingTime,
      chemistry: {
        moisturePct: Number(formData.moisturePct),
        proteinPct: Number(formData.proteinPct),
        initialPh: Number(formData.initialPh),
      },
      telemetryLogs: [], // No transit abuse yet at manufacturer origin
    });
    setPreviewResult(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateBatch({
      ...formData,
      quantity: Number(formData.quantity),
      moisturePct: Number(formData.moisturePct),
      proteinPct: Number(formData.proteinPct),
      initialPh: Number(formData.initialPh),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">New Batch Digital Twin</h3>
              <p className="text-xs text-slate-500">Inbound Manufacturer Registration & Baseline Prediction 1</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Product Category</label>
              <select
                value={formData.productCategory}
                onChange={handleCategoryChange}
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Fresh Paneer">Fresh Paneer</option>
                <option value="Pasteurized Milk">Pasteurized Milk</option>
                <option value="Curd">Curd</option>
                <option value="Mushrooms">Mushrooms</option>
              </select>
            </div>

            {/* Batch ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Batch ID (Digital Twin Hash)</label>
              <input
                type="text"
                value={formData.batchId}
                onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                required
                className="w-full text-xs font-mono font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quantity ({formData.unit})
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="px-3 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl flex items-center">
                  {formData.unit}
                </span>
              </div>
            </div>

            {/* Manufacturing Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Manufacturing Timestamp</label>
              <input
                type="datetime-local"
                value={formData.manufacturingTime}
                onChange={(e) => setFormData({ ...formData, manufacturingTime: e.target.value })}
                required
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Baseline Chemistry Block */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Beaker className="w-3.5 h-3.5 text-indigo-500" /> Baseline Chemistry Parameters
              </span>
              <button
                type="button"
                onClick={calculateBaselineEstimate}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Calculate Predict 1
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Moisture (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.moisturePct}
                  onChange={(e) => setFormData({ ...formData, moisturePct: e.target.value })}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Protein (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.proteinPct}
                  onChange={(e) => setFormData({ ...formData, proteinPct: e.target.value })}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Initial pH</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.initialPh}
                  onChange={(e) => setFormData({ ...formData, initialPh: e.target.value })}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Baseline Estimate (Predict 1) banner if calculated */}
          {previewResult && (
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs text-indigo-950">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="font-bold">Predict 1 Baseline RSL: </span>
                  <span className="font-extrabold text-indigo-700">{previewResult.predictedRslHours} Hours</span>
                  <span className="text-[10px] text-indigo-600 block">
                    Under ideal 2-4°C storage (Initial Health: {previewResult.qualityScore}%)
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-indigo-200/60 text-indigo-800 text-[10px] font-bold">
                Ready for QR Mint
              </span>
            </div>
          )}

          {/* QR Code Digital Twin preview badge */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            {/* Rendered QR Code Placeholder */}
            <div className="w-12 h-12 bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full text-slate-800">
                <rect x="2" y="2" width="10" height="10" fill="currentColor" />
                <rect x="4" y="4" width="6" height="6" fill="#fff" />
                <rect x="5" y="5" width="4" height="4" fill="currentColor" />
                <rect x="28" y="2" width="10" height="10" fill="currentColor" />
                <rect x="30" y="4" width="6" height="6" fill="#fff" />
                <rect x="31" y="5" width="4" height="4" fill="currentColor" />
                <rect x="2" y="28" width="10" height="10" fill="currentColor" />
                <rect x="4" y="30" width="6" height="6" fill="#fff" />
                <rect x="5" y="31" width="4" height="4" fill="currentColor" />
                <rect x="16" y="6" width="8" height="4" fill="currentColor" />
                <rect x="18" y="16" width="6" height="6" fill="currentColor" />
                <rect x="28" y="24" width="8" height="8" fill="currentColor" />
                <rect x="14" y="28" width="8" height="6" fill="currentColor" />
              </svg>
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-800">Crypto-Secured Digital Twin QR Code</div>
              <p className="text-slate-500 text-[11px]">
                Upon creation, cryptographic token is generated for distributor handheld scanner integration.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1e1445] hover:bg-[#2c1d65] text-white text-xs font-bold transition shadow-pill flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Create Digital Twin & Dispatch Batch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
