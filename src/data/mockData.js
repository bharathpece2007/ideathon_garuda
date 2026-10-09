/**
 * Mock Data for Cold-Chain Distributor Hub
 * 
 * Visually separates:
 * 1. Manufacturer Inbound Feed (Buy)
 * 2. Warehouse Inventory & Predictive Gate (Monitor & Predict)
 * 3. Retailer Demand Board (Sell & Plan)
 */

// Generate 24-hour temperature records
export function generateTempLogs(hasSpike = false) {
  const hours = ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];
  
  return hours.map((hour, idx) => {
    let temp = 3.6 + Math.sin(idx) * 0.4;
    if (hasSpike && idx >= 5 && idx <= 7) {
      temp = idx === 6 ? 14.6 : 11.2; // Thermal abuse peak at Hour 12
    }
    return {
      time: hour,
      temp: Math.round(temp * 10) / 10,
      threshold: 8.0, // Critical safety cutoff
    };
  });
}

// 1. Manufacturer Inbound Feed (The "Buy" Screen)
export const INITIAL_INBOUND_BATCHES = [
  {
    id: 'INB-MLK-101',
    category: 'Milk',
    manufacturer: 'Amul Dairy Co-op',
    quantity: 600,
    unit: 'L',
    baselineRslHours: 120, // 5 Days
    baselineRslLabel: '5 Days (120h)',
    productionDate: 'Today, 06:00 AM',
    tempLogs: generateTempLogs(false),
  },
  {
    id: 'INB-PAN-204',
    category: 'Fresh Paneer',
    manufacturer: 'Heritage Agro Foods',
    quantity: 300,
    unit: 'kg',
    baselineRslHours: 96, // 4 Days
    baselineRslLabel: '4 Days (96h)',
    productionDate: 'Today, 04:30 AM',
    tempLogs: generateTempLogs(false),
  },
  {
    id: 'INB-MSH-309',
    category: 'Mushrooms',
    manufacturer: 'Shivalik Valley Farms',
    quantity: 150,
    unit: 'kg',
    baselineRslHours: 72, // 3 Days
    baselineRslLabel: '3 Days (72h)',
    productionDate: 'Yesterday, 08:00 PM',
    tempLogs: generateTempLogs(false),
  },
  {
    id: 'INB-CHK-412',
    category: 'Chicken',
    manufacturer: "Venky's Fresh Poultry",
    quantity: 200,
    unit: 'kg',
    baselineRslHours: 48, // 2 Days
    baselineRslLabel: '2 Days (48h)',
    productionDate: 'Today, 05:00 AM',
    tempLogs: generateTempLogs(false),
  },
];

// 2. Warehouse Inventory & Predictive Gate (The "Monitor" Screen)
export const INITIAL_WAREHOUSE_BATCHES = [
  {
    id: 'WH-PAN-881',
    category: 'Fresh Paneer',
    manufacturer: 'Mother Dairy Vault',
    quantity: 250,
    unit: 'kg',
    storageZone: 'Cold Vault A-02',
    currentTemp: 14.2,
    hasSpike: true,
    mockSpikeRsl: 26, // Will yield 26h -> YELLOW
    predictedRsl: null,
    rslStatus: null, // null | 'GREEN' | 'YELLOW'
    tempLogs: generateTempLogs(true),
  },
  {
    id: 'WH-MLK-902',
    category: 'Milk',
    manufacturer: 'Nandini Dairy Farms',
    quantity: 500,
    unit: 'L',
    storageZone: 'Chiller Bay B-05',
    currentTemp: 3.6,
    hasSpike: false,
    mockNormalRsl: 76, // Will yield 76h -> GREEN
    predictedRsl: null,
    rslStatus: null,
    tempLogs: generateTempLogs(false),
  },
  {
    id: 'WH-CHK-774',
    category: 'Chicken',
    manufacturer: 'Suguna Fresh Farms',
    quantity: 180,
    unit: 'kg',
    storageZone: 'Freezer Bay C-01',
    currentTemp: 3.2,
    hasSpike: false,
    mockNormalRsl: 54, // Will yield 54h -> GREEN
    predictedRsl: null,
    rslStatus: null,
    tempLogs: generateTempLogs(false),
  },
];

// 3. Retailer Demand Board (The "Sell & Plan" Screen)
export const INITIAL_RETAILER_ORDERS = [
  {
    id: 'ORD-901',
    retailer: 'Reliance Smart Superstore',
    requestedItem: 'Fresh Paneer',
    quantity: 200,
    unit: 'kg',
    minRequiredRslHours: 48,
    minRslLabel: 'Requires min 48h (2 Days) RSL',
    status: 'PENDING_ASSIGNMENT',
    assignedBatchId: null,
  },
  {
    id: 'ORD-902',
    retailer: 'More Supermarket Express',
    requestedItem: 'Milk',
    quantity: 500,
    unit: 'L',
    minRequiredRslHours: 72,
    minRslLabel: 'Requires min 72h (3 Days) RSL',
    status: 'PENDING_ASSIGNMENT',
    assignedBatchId: null,
  },
  {
    id: 'ORD-903',
    retailer: "Nature's Basket Gourmet",
    requestedItem: 'Chicken',
    quantity: 150,
    unit: 'kg',
    minRequiredRslHours: 48,
    minRslLabel: 'Requires min 48h (2 Days) RSL',
    status: 'PENDING_ASSIGNMENT',
    assignedBatchId: null,
  },
  {
    id: 'ORD-904',
    retailer: 'Star Hypermarket',
    requestedItem: 'Mushrooms',
    quantity: 120,
    unit: 'kg',
    minRequiredRslHours: 48,
    minRslLabel: 'Requires min 48h (2 Days) RSL',
    status: 'PENDING_ASSIGNMENT',
    assignedBatchId: null,
  },
];

// Compatibility exports
export const FLASH_SALE_BUYERS = [];
export const COLD_STORAGE_HUBS = [];
export const RETAIL_BUYERS = [];
export const NGO_RESCUE_NETWORK = [];
export const RECYCLE_FACILITIES = [];
export const INITIAL_BATCHES = INITIAL_WAREHOUSE_BATCHES;
export const generate24HourLogs = generateTempLogs;
