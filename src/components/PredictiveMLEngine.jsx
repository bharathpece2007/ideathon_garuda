import React, { useState } from 'react';
import { Activity, CheckCircle, AlertTriangle, ShieldAlert, Loader2 } from 'lucide-react';

export default function PredictiveMLEngine() {
  const [formData, setFormData] = useState({
    productName: 'Pasteurized Milk',
    storageDuration: 24,
    avgStorageTemp: 4.5,
    minTempRecorded: 3.5,
    peakTempSpikes: 14.5,
    spikeDuration: 3.0,
    avgHumidity: 82.0,
    doorOpenFrequency: 10,
    powerFailures: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'productName' ? value : parseFloat(value),
    }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Product_Name: formData.productName,
          Storage_Duration_Hours: formData.storageDuration,
          Avg_Storage_Temp_C: formData.avgStorageTemp,
          Min_Temp_Recorded_C: formData.minTempRecorded,
          Peak_Temp_Spikes_C: formData.peakTempSpikes,
          Spike_Duration_Hours: formData.spikeDuration,
          Avg_Humidity_Percent: formData.avgHumidity,
          Door_Open_Frequency: formData.doorOpenFrequency,
          Power_Failures: formData.powerFailures
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction from the server.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getResultStyles = (action) => {
    if (!action) return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: null };
    const upperAction = action.toUpperCase();
    if (upperAction.includes('RETAIL')) {
      return { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', icon: <CheckCircle className="w-8 h-8 text-green-600" /> };
    }
    if (upperAction.includes('NGO') || upperAction.includes('DISCOUNT')) {
      return { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-8 h-8 text-amber-600" /> };
    }
    if (upperAction.includes('COMPOST') || upperAction.includes('ANIMAL')) {
      return { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: <ShieldAlert className="w-8 h-8 text-red-600" /> };
    }
    return { color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', icon: <CheckCircle className="w-8 h-8 text-indigo-600" /> };
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6 mb-6">
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Predictive ML Engine Simulator
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manually input batch telemetry to simulate sensor data and predict true Remaining Shelf Life (RSL).</p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name</label>
              <select
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="Pasteurized Milk">Pasteurized Milk</option>
                <option value="Fresh Paneer">Fresh Paneer</option>
                <option value="Curd / Yogurt">Curd / Yogurt</option>
                <option value="Button Mushrooms">Button Mushrooms</option>
                <option value="Fresh Chicken Meat">Fresh Chicken Meat</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Storage Duration (Hrs)</label>
                <input
                  type="number"
                  name="storageDuration"
                  value={formData.storageDuration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Avg Storage Temp (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="avgStorageTemp"
                  value={formData.avgStorageTemp}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Min Temp Recorded (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="minTempRecorded"
                  value={formData.minTempRecorded}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Peak Temp Spikes (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="peakTempSpikes"
                  value={formData.peakTempSpikes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Spike Duration (Hrs)</label>
                <input
                  type="number"
                  step="0.1"
                  name="spikeDuration"
                  value={formData.spikeDuration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Avg Humidity (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="avgHumidity"
                  value={formData.avgHumidity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Door Open Frequency</label>
                <input
                  type="number"
                  name="doorOpenFrequency"
                  value={formData.doorOpenFrequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Power Failures</label>
                <input
                  type="number"
                  name="powerFailures"
                  value={formData.powerFailures}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
                Run AI Evaluation
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex flex-col h-full min-h-[300px]">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 border-b border-slate-100 pb-2">Inference Output</h3>
            
            {!result && !error && !isLoading && (
              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <Activity className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-slate-600 font-medium">Awaiting Telemetry Input</p>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Adjust parameters and run evaluation to see real-time RSL predictions.</p>
              </div>
            )}

            {isLoading && (
              <div className="flex-1 border border-indigo-100 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/30 shadow-inner">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                <p className="text-indigo-700 font-medium animate-pulse">Running ML Inference...</p>
                <p className="text-xs text-indigo-400 mt-1">Analyzing kinetic decay profiles</p>
              </div>
            )}

            {error && (
              <div className="flex-1 border border-red-200 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-red-50">
                <ShieldAlert className="w-10 h-10 text-red-500 mb-4" />
                <p className="text-red-700 font-medium mb-1">Evaluation Failed</p>
                <p className="text-sm text-red-500 max-w-[250px]">{error}</p>
                <p className="text-xs text-red-400 mt-4">(Is the backend API running on port 5000?)</p>
              </div>
            )}

            {result && !isLoading && (
              <div className={`flex-1 border rounded-xl p-8 shadow-sm flex flex-col justify-center transition-all ${getResultStyles(result.recommended_action).bg} ${getResultStyles(result.recommended_action).border}`}>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${getResultStyles(result.recommended_action).color} opacity-80`}>Predicted Remaining Shelf Life</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className={`text-6xl font-black tracking-tight ${getResultStyles(result.recommended_action).color}`}>
                        {result.remaining_shelf_life_hours}
                      </h3>
                      <span className={`text-xl font-bold ${getResultStyles(result.recommended_action).color} opacity-80`}>Hours</span>
                    </div>
                    <p className={`text-sm font-medium mt-2 ${getResultStyles(result.recommended_action).color} opacity-75`}>
                      ~ {result.remaining_shelf_life_days} Days Safe Window
                    </p>
                  </div>
                  <div className="p-3 bg-white bg-opacity-60 rounded-xl shadow-sm">
                    {getResultStyles(result.recommended_action).icon}
                  </div>
                </div>

                <div className="pt-6 border-t border-black border-opacity-[0.08]">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${getResultStyles(result.recommended_action).color} opacity-80`}>Recommended System Action</p>
                  <p className={`text-xl font-bold tracking-tight ${getResultStyles(result.recommended_action).color}`}>
                    {result.recommended_action}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
