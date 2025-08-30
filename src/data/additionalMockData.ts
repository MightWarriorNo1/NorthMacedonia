import { 
  Item, 
  Supplier, 
  Shipment, 
  Invoice, 
  ShipmentLine, 
  Shipper, 
  ShipperRate, 
  TaxCategory, 
  SystemSettings, 
  AuditLog,
  User 
} from '../types';

// Additional Mock Users
export const additionalUsers: User[] = [
  {
    id: '4',
    email: 'accountant@cnmi.com',
    password: 'accountant123',
    role: 'staff',
    name: 'Accountant User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-10')
  },
  {
    id: '5',
    email: 'supervisor@cnmi.com',
    password: 'supervisor123',
    role: 'admin',
    name: 'Supervisor User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-12')
  }
];

// Additional Mock Suppliers
export const additionalSuppliers: Supplier[] = [
  {
    id: '6',
    name: 'Asian Market Wholesale',
    contact: 'Kenji Tanaka',
    email: 'kenji@asianmarket.com',
    phone: '+1-808-555-0808',
    address: '987 Oriental Plaza, Honolulu, HI 96816',
    notes: 'Asian specialty foods and goods',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '7',
    name: 'European Luxury Imports',
    contact: 'Pierre Dubois',
    email: 'pierre@europeanluxury.com',
    phone: '+1-808-555-0909',
    address: '654 Luxury Lane, Honolulu, HI 96817',
    notes: 'High-end European products',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-09')
  },
  {
    id: '8',
    name: 'Pacific Seafood Co.',
    contact: 'Hiroshi Yamamoto',
    email: 'hiroshi@pacificseafood.com',
    phone: '+1-808-555-1010',
    address: '321 Harbor View, Honolulu, HI 96818',
    notes: 'Fresh and frozen seafood',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-08')
  }
];

// Additional Mock Items
export const additionalItems: Item[] = [
  {
    id: '11',
    sku: 'SEAFOOD-001',
    barcode: '1234567890133',
    name: 'Fresh Tuna - 1lb',
    supplierId: '8',
    caseSize: 20,
    caseWeight: 20.0,
    weightStatus: 'estimated',
    unitWeight: 1.0,
    defaultTaxCategoryId: '1',
    source: 'import',
    notes: 'Premium fresh tuna',
    expirationDate: new Date('2024-01-30'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '12',
    sku: 'LUXURY-001',
    barcode: '1234567890134',
    name: 'Swiss Watch - Luxury',
    supplierId: '7',
    caseSize: 1,
    caseWeight: 0.3,
    weightStatus: 'confirmed',
    unitWeight: 0.3,
    defaultTaxCategoryId: '12',
    source: 'import',
    notes: 'Swiss luxury timepiece',
    expirationDate: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '13',
    sku: 'ASIAN-001',
    barcode: '1234567890135',
    name: 'Soy Sauce - 500ml',
    supplierId: '6',
    caseSize: 24,
    caseWeight: 30.0,
    weightStatus: 'confirmed',
    unitWeight: 1.25,
    defaultTaxCategoryId: '1',
    source: 'import',
    notes: 'Premium soy sauce',
    expirationDate: new Date('2026-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '14',
    sku: 'VEHICLE-001',
    barcode: '1234567890136',
    name: 'Toyota Camry - 2024',
    supplierId: '1',
    caseSize: 1,
    caseWeight: 3300.0,
    weightStatus: 'confirmed',
    unitWeight: 3300.0,
    defaultTaxCategoryId: '16',
    source: 'import',
    notes: '2024 Toyota Camry sedan',
    expirationDate: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '15',
    sku: 'AVIATION-001',
    barcode: '1234567890137',
    name: 'Aviation Fuel - 1 Gallon',
    supplierId: '2',
    caseSize: 55,
    caseWeight: 330.0,
    weightStatus: 'confirmed',
    unitWeight: 6.0,
    defaultTaxCategoryId: '2',
    source: 'import',
    notes: 'Jet fuel for aircraft',
    expirationDate: new Date('2025-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
];

// Additional Mock Shippers
export const additionalShippers: Shipper[] = [
  {
    id: '4',
    name: 'Air Cargo Express',
    rateModes: ['per_lb', 'per_cu_ft', 'flat_rate'],
    active: true,
    contact: 'Alex Rodriguez',
    phone: '+1-808-555-1111',
    email: 'alex@aircargo.com',
    notes: 'Fast air freight service',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-07')
  },
  {
    id: '5',
    name: 'Ocean Freight Specialists',
    rateModes: ['per_lb', 'per_cu_ft'],
    active: true,
    contact: 'Emma Thompson',
    phone: '+1-808-555-1212',
    email: 'emma@oceanfreight.com',
    notes: 'Bulk ocean shipping',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-06')
  }
];

// Additional Mock Shipper Rates
export const additionalShipperRates: ShipperRate[] = [
  {
    id: '4',
    shipperId: '4',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    perLbRate: 2.50,
    perCuFtRate: 120.00,
    minCharge: 500.00,
    notes: 'Premium air freight rates'
  },
  {
    id: '5',
    shipperId: '5',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    perLbRate: 0.45,
    perCuFtRate: 25.00,
    minCharge: 2000.00,
    notes: 'Bulk ocean shipping rates'
  }
];

// Additional Mock Invoices
export const additionalInvoices: Invoice[] = [
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    vendor: 'Asian Market Wholesale',
    currency: 'JPY',
    fxRateToUSD: 0.0067,
    totalAmount: 150000,
    invoiceDate: new Date('2024-01-16'),
    dueDate: new Date('2024-02-16'),
    notes: 'Asian specialty foods',
    fileUrl: '/invoices/inv-2024-004.pdf',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    vendor: 'European Luxury Imports',
    currency: 'EUR',
    fxRateToUSD: 1.08,
    totalAmount: 8500,
    invoiceDate: new Date('2024-01-18'),
    dueDate: new Date('2024-02-18'),
    notes: 'Luxury watches and jewelry',
    fileUrl: '/invoices/inv-2024-005.pdf',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '6',
    invoiceNumber: 'INV-2024-006',
    vendor: 'Pacific Seafood Co.',
    currency: 'USD',
    fxRateToUSD: 1.0,
    totalAmount: 3200,
    invoiceDate: new Date('2024-01-22'),
    dueDate: new Date('2024-02-22'),
    notes: 'Fresh seafood shipment',
    fileUrl: '/invoices/inv-2024-006.pdf',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  }
];

// Additional Mock Shipments
export const additionalShipments: Shipment[] = [
  {
    id: '4',
    shipmentId: 'SHIP-2024-004',
    shipDate: new Date('2024-01-28'),
    shipperId: '4',
    allocationMethod: 'by_value',
    wharfage: 200.00,
    otherFees: 150.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Air freight luxury goods',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '5',
    shipmentId: 'SHIP-2024-005',
    shipDate: new Date('2024-02-01'),
    shipperId: '5',
    allocationMethod: 'by_weight',
    wharfage: 500.00,
    otherFees: 300.00,
    uspsFlatCharge: 0,
    status: 'pending',
    notes: 'Bulk ocean shipment',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '6',
    shipmentId: 'SHIP-2024-006',
    shipDate: new Date('2024-02-05'),
    shipperId: '3',
    allocationMethod: 'by_weight',
    wharfage: 0,
    otherFees: 0,
    uspsFlatCharge: 35.00,
    status: 'active',
    notes: 'USPS priority shipment',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];

// Additional Mock Shipment Lines
export const additionalShipmentLines: ShipmentLine[] = [
  {
    id: '6',
    shipmentId: '4',
    itemId: '12',
    invoiceId: '5',
    qtyCases: 1,
    qtyUnits: 1,
    unitCost: 8500.00,
    totalCost: 8500.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: null,
    notes: 'Luxury Swiss watch',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '7',
    shipmentId: '4',
    itemId: '7',
    invoiceId: '5',
    qtyCases: 1,
    qtyUnits: 1,
    unitCost: 2500.00,
    totalCost: 2500.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: null,
    notes: 'Gold necklace',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '8',
    shipmentId: '5',
    itemId: '14',
    invoiceId: '1',
    qtyCases: 1,
    qtyUnits: 1,
    unitCost: 25000.00,
    totalCost: 25000.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: null,
    notes: 'Toyota Camry vehicle',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '9',
    shipmentId: '6',
    itemId: '11',
    invoiceId: '6',
    qtyCases: 10,
    qtyUnits: 200,
    unitCost: 16.00,
    totalCost: 3200.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: new Date('2024-01-30'),
    notes: 'Fresh tuna shipment',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  }
];

// Additional Mock Audit Logs
export const additionalAuditLogs: AuditLog[] = [
  {
    id: '6',
    userId: '4',
    entity: 'invoice',
    entityId: '4',
    action: 'created',
    changeSummary: 'Created new invoice INV-2024-004 for Asian Market Wholesale',
    timestamp: new Date('2024-01-16T09:00:00Z')
  },
  {
    id: '7',
    userId: '5',
    entity: 'shipment',
    entityId: '4',
    action: 'created',
    changeSummary: 'Created air freight shipment SHIP-2024-004',
    timestamp: new Date('2024-01-28T14:30:00Z')
  },
  {
    id: '8',
    userId: '2',
    entity: 'item',
    entityId: '11',
    action: 'created',
    changeSummary: 'Added new seafood item Fresh Tuna',
    timestamp: new Date('2024-01-15T16:00:00Z')
  },
  {
    id: '9',
    userId: '1',
    entity: 'shipper_rate',
    entityId: '4',
    action: 'updated',
    changeSummary: 'Updated air freight rates for 2024',
    timestamp: new Date('2024-01-15T17:45:00Z')
  },
  {
    id: '10',
    userId: '3',
    entity: 'supplier',
    entityId: '8',
    action: 'created',
    changeSummary: 'Added new seafood supplier Pacific Seafood Co.',
    timestamp: new Date('2024-01-08T11:20:00Z')
  }
];

// Seasonal and Trend Data
export const seasonalData = {
  monthlyTrends: [
    { month: 'Jan', shipments: 12, value: 45000, taxRevenue: 8900 },
    { month: 'Feb', shipments: 15, value: 52000, taxRevenue: 10200 },
    { month: 'Mar', shipments: 18, value: 61000, taxRevenue: 11800 },
    { month: 'Apr', shipments: 14, value: 48000, taxRevenue: 9500 },
    { month: 'May', shipments: 20, value: 68000, taxRevenue: 13200 },
    { month: 'Jun', shipments: 22, value: 72000, taxRevenue: 14100 },
    { month: 'Jul', shipments: 25, value: 78000, taxRevenue: 15200 },
    { month: 'Aug', shipments: 28, value: 85000, taxRevenue: 16500 },
    { month: 'Sep', shipments: 26, value: 82000, taxRevenue: 15900 },
    { month: 'Oct', shipments: 23, value: 75000, taxRevenue: 14600 },
    { month: 'Nov', shipments: 19, value: 65000, taxRevenue: 12700 },
    { month: 'Dec', shipments: 16, value: 58000, taxRevenue: 11300 }
  ],
  
  categoryPerformance: [
    { category: 'Foodstuff', q1: 12500, q2: 13800, q3: 14200, q4: 13100 },
    { category: 'Beverages', q1: 8900, q2: 10200, q3: 11800, q4: 9500 },
    { category: 'Tobacco', q1: 15600, q2: 16200, q3: 15800, q4: 15100 },
    { category: 'Cosmetics', q1: 7200, q2: 8100, q3: 8900, q4: 7800 },
    { category: 'Construction', q1: 9800, q2: 11200, q3: 12500, q4: 10800 },
    { category: 'Luxury Goods', q1: 6800, q2: 7200, q3: 8100, q4: 7500 }
  ],
  
  supplierMetrics: [
    { 
      supplier: 'Pacific Trading', 
      totalItems: 45, 
      totalValue: 28000, 
      onTimeDelivery: 95,
      qualityRating: 4.8,
      lastShipment: new Date('2024-01-28')
    },
    { 
      supplier: 'Island Imports', 
      totalItems: 38, 
      totalValue: 22000, 
      onTimeDelivery: 92,
      qualityRating: 4.6,
      lastShipment: new Date('2024-01-25')
    },
    { 
      supplier: 'Global Food', 
      totalItems: 52, 
      totalValue: 35000, 
      onTimeDelivery: 98,
      qualityRating: 4.9,
      lastShipment: new Date('2024-02-01')
    },
    { 
      supplier: 'CNMI Local', 
      totalItems: 15, 
      totalValue: 8000, 
      onTimeDelivery: 100,
      qualityRating: 4.7,
      lastShipment: new Date('2024-01-30')
    },
    { 
      supplier: 'Guam Trading', 
      totalItems: 28, 
      totalValue: 18000, 
      onTimeDelivery: 89,
      qualityRating: 4.4,
      lastShipment: new Date('2024-01-22')
    }
  ]
};

// Risk and Compliance Data
export const complianceData = {
  expiringItems: [
    { itemId: '10', name: 'Local Bananas', daysUntilExpiry: 5, quantity: 200 },
    { itemId: '11', name: 'Fresh Tuna', daysUntilExpiry: 12, quantity: 150 },
    { itemId: '1', name: 'Premium Beer', daysUntilExpiry: 25, quantity: 1200 },
    { itemId: '6', name: 'Gasoline', daysUntilExpiry: 28, quantity: 400 }
  ],
  
  taxCompliance: [
    { category: 'Foodstuff', compliance: 100, lastAudit: new Date('2024-01-10') },
    { category: 'Beverages', compliance: 98, lastAudit: new Date('2024-01-12') },
    { category: 'Tobacco', compliance: 100, lastAudit: new Date('2024-01-08') },
    { category: 'Cosmetics', compliance: 95, lastAudit: new Date('2024-01-15') },
    { category: 'Construction', compliance: 97, lastAudit: new Date('2024-01-05') }
  ],
  
  auditFindings: [
    {
      id: '1',
      date: new Date('2024-01-15'),
      category: 'Tax Calculation',
      finding: 'Minor discrepancy in EBT calculation for hybrid tax items',
      severity: 'low',
      status: 'resolved',
      resolution: 'Updated calculation logic for hybrid tax items'
    },
    {
      id: '2',
      date: new Date('2024-01-10'),
      category: 'Documentation',
      finding: 'Missing invoice attachments for 3 shipments',
      severity: 'medium',
      status: 'in_progress',
      resolution: 'Requesting missing documents from suppliers'
    }
  ]
};

// Performance Metrics
export const performanceMetrics = {
  kpis: {
    totalShipments: 156,
    totalValue: 2850000,
    totalTaxRevenue: 125000,
    activeSuppliers: 5,
    totalItems: 178,
    expiringItems: 12,
    onTimeDelivery: 94.2,
    taxCompliance: 98.5,
    costSavings: 156000,
    processingTime: 2.3
  },
  
  trends: {
    shipmentGrowth: 12.5,
    valueGrowth: 8.7,
    taxRevenueGrowth: 15.2,
    supplierGrowth: 0,
    itemGrowth: 6.8
  },
  
  targets: {
    shipmentTarget: 200,
    valueTarget: 3500000,
    taxRevenueTarget: 150000,
    complianceTarget: 99.0,
    deliveryTarget: 95.0
  }
};
