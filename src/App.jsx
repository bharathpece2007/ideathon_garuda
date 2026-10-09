import React, { useState } from 'react';
import {
  INITIAL_INBOUND_BATCHES,
  INITIAL_WAREHOUSE_BATCHES,
  INITIAL_RETAILER_ORDERS,
  generateTempLogs,
} from './data/mockData';
import { predictShelfLife } from './services/mlService';
import { LeftTabNavigation } from './components/LeftTabNavigation';
import { InboundPanel } from './components/InboundPanel';
import { WarehousePanel } from './components/WarehousePanel';
import { RetailerDemandPanel } from './components/RetailerDemandPanel';
import { ToastContainer } from './components/Toast';
import PredictiveMLEngine from './components/PredictiveMLEngine';

export default function App() {
  const [inboundBatches, setInboundBatches] = useState(INITIAL_INBOUND_BATCHES);
  const [warehouseBatches, setWarehouseBatches] = useState(INITIAL_WAREHOUSE_BATCHES);
  const [retailerOrders, setRetailerOrders] = useState(INITIAL_RETAILER_ORDERS);
  const [selectedBatchId, setSelectedBatchId] = useState('WH-PAN-881');
  const [activeTab, setActiveTab] = useState('BUY'); // Default to Tab 1 on left: 'BUY' | 'MONITOR' | 'SELL' | 'ALL'
  const [isPredicting, setIsPredicting] = useState(false);
  const [rescuedCount, setRescuedCount] = useState(1);
  const [toasts, setToasts] = useState([]);

  // Toast dispatcher
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Action: Accept Inbound to Warehouse (The "Buy" Action)
  const handleAcceptToWarehouse = (batch) => {
    // Remove from inbound
    setInboundBatches((prev) => prev.filter((b) => b.id !== batch.id));

    // Convert into warehouse batch
    const newWarehouseBatch = {
      ...batch,
      storageZone: `Cold Vault ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-0${Math.floor(1 + Math.random() * 8)}`,
      currentTemp: 3.6,
      hasSpike: false,
      predictedRsl: null,
      rslStatus: null,
      mockNormalRsl: batch.baselineRslHours * 0.8,
    };

    setWarehouseBatches((prev) => [newWarehouseBatch, ...prev]);
    setSelectedBatchId(newWarehouseBatch.id);

    addToast(
      'Inbound Batch Accepted',
      `Batch #${batch.id} (${batch.quantity} ${batch.unit} of ${batch.category}) transferred to warehouse cold storage.`,
      'success'
    );
  };

  // 2. Action: Run Pre-Dispatch RSL Prediction (The "Monitor & Predict" Action)
  const handleRunPrediction = async (batch) => {
    if (!batch) return;
    setIsPredicting(true);

    try {
      const result = await predictShelfLife(batch);

      setWarehouseBatches((prev) =>
        prev.map((b) => {
          if (b.id === batch.id) {
            return {
              ...b,
              predictedRsl: result.rslHours,
              rslStatus: result.status,
            };
          }
          return b;
        })
      );

      if (result.status === 'GREEN') {
        addToast(
          'Prediction: GREEN (Retail Ready)',
          `Batch #${batch.id} has ${result.rslHours}h True RSL. Verified safe for supermarket distribution.`,
          'success'
        );
      } else {
        addToast(
          'Prediction: YELLOW (Unfit for Retail)',
          `Batch #${batch.id} has only ${result.rslHours}h True RSL due to thermal abuse. Route to NGO or Flash-Sale.`,
          'warning'
        );
      }
    } catch (err) {
      addToast('Prediction Error', err.message, 'warning');
    } finally {
      setIsPredicting(false);
    }
  };

  // Action: Route Degraded Batch to NGO / Flash-Sale
  const handleRouteToRescue = (batch) => {
    // Remove from warehouse
    setWarehouseBatches((prev) => prev.filter((b) => b.id !== batch.id));
    setRescuedCount((c) => c + 1);

    addToast(
      'Rescued to NGO / Flash-Sale',
      `Batch #${batch.id} (${batch.quantity} ${batch.unit} ${batch.category}) routed to hunger relief & flash sale. Zero food waste!`,
      'rescue'
    );
  };

  // 3. Action: Fulfill Retailer Order (The "Sell & Plan" Action)
  const handleFulfillOrder = (orderId, batchId) => {
    const targetOrder = retailerOrders.find((o) => o.id === orderId);
    const targetBatch = warehouseBatches.find((b) => b.id === batchId);

    if (!targetOrder || !targetBatch) return;

    // Mark order fulfilled
    setRetailerOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'FULFILLED', assignedBatchId: batchId }
          : o
      )
    );

    // Remove fulfilled batch from warehouse inventory
    setWarehouseBatches((prev) => prev.filter((b) => b.id !== batchId));

    addToast(
      'Retail Order Dispatched',
      `${targetOrder.retailer} order fulfilled using Batch #${batchId} (${targetBatch.predictedRsl}h RSL). Dispatched via cold reefer truck!`,
      'success'
    );
  };

  // Helper to add a sample supplier batch if all are accepted
  const handleAddSampleBatch = () => {
    const sampleCategories = ['Milk', 'Fresh Paneer', 'Mushrooms', 'Chicken'];
    const cat = sampleCategories[Math.floor(Math.random() * sampleCategories.length)];
    const units = cat === 'Milk' ? 'L' : 'kg';
    const randNum = Math.floor(100 + Math.random() * 900);
    const newInbound = {
      id: `INB-${cat.substring(0, 3).toUpperCase()}-${randNum}`,
      category: cat,
      manufacturer: 'Dairy Valley Agro Logistics',
      quantity: Math.floor(150 + Math.random() * 400),
      unit: units,
      baselineRslHours: cat === 'Milk' ? 120 : cat === 'Fresh Paneer' ? 96 : 72,
      baselineRslLabel: `${cat === 'Milk' ? '5' : '4'} Days Baseline`,
      productionDate: 'Just Now',
      tempLogs: generateTempLogs(false),
    };

    setInboundBatches((prev) => [newInbound, ...prev]);
    addToast('New Supplier Inbound', `Batch #${newInbound.id} arrived at inbound receiving dock.`, 'info');
  };

  // Reset demo data
  const handleResetDemo = () => {
    setInboundBatches(INITIAL_INBOUND_BATCHES);
    setWarehouseBatches(INITIAL_WAREHOUSE_BATCHES);
    setRetailerOrders(INITIAL_RETAILER_ORDERS);
    setSelectedBatchId('WH-PAN-881');
    addToast('Demo Reset', 'Reset mock data to initial baseline state.', 'info');
  };

  const activeRetailOrdersCount = retailerOrders.filter((o) => o.status !== 'FULFILLED').length;

  return (
    <div className="min-h-screen bg-[#f1f4f9] text-slate-800 p-3 sm:p-5 md:p-8 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Container with Tabs strictly on the Left */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-5 items-start flex-1">
        {/* Left Vertical Tab Navigation */}
        <LeftTabNavigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          inboundCount={inboundBatches.length}
          warehouseCount={warehouseBatches.length}
          retailOrdersCount={activeRetailOrdersCount}
          rescuedCount={rescuedCount}
          onResetDemo={handleResetDemo}
        />

        {/* Right Content Area: Displays the Active Tab View */}
        <main className="flex-1 w-full min-w-0">
          {/* Machine Learning Simulator Card (Rendered globally for easy testing) */}
          <PredictiveMLEngine />

          {/* TAB 1: BUY - Manufacturer Inbound Feed */}
          {activeTab === 'BUY' && (
            <div className="animate-fade-in min-h-[640px]">
              <InboundPanel
                inboundBatches={inboundBatches}
                onAcceptToWarehouse={handleAcceptToWarehouse}
                onAddSampleBatch={handleAddSampleBatch}
              />
            </div>
          )}

          {/* TAB 2: MONITOR & PREDICT - Warehouse Inventory & Predictive Gate */}
          {activeTab === 'MONITOR' && (
            <div className="animate-fade-in min-h-[640px]">
              <WarehousePanel
                warehouseBatches={warehouseBatches}
                selectedBatchId={selectedBatchId}
                onSelectBatch={setSelectedBatchId}
                onRunPrediction={handleRunPrediction}
                isPredicting={isPredicting}
                onRouteToRescue={handleRouteToRescue}
              />
            </div>
          )}

          {/* TAB 3: SELL & PLAN - Retailer Demand Board */}
          {activeTab === 'SELL' && (
            <div className="animate-fade-in min-h-[640px]">
              <RetailerDemandPanel
                retailerOrders={retailerOrders}
                warehouseBatches={warehouseBatches}
                onFulfillOrder={handleFulfillOrder}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[1600px] mx-auto mt-6 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <span>Garuda Cold-Chain Distributor Hub · Central Middleman Logistics</span>
        <span>Tabs On Left · Critical Thermal Limit: 8.0°C · RSL Gate: 48h (Retail vs. NGO)</span>
      </footer>

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
