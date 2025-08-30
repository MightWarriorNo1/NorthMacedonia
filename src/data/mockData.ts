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

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@cnmi.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'staff@cnmi.com',
    password: 'staff123',
    role: 'staff',
    name: 'Staff User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-14')
  },
  {
    id: '3',
    email: 'manager@cnmi.com',
    password: 'manager123',
    role: 'staff',
    name: 'Manager User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-13')
  }
];

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Pacific Trading Co.',
    contact: 'John Smith',
    email: 'john@pacifictrading.com',
    phone: '+1-808-555-0101',
    address: '123 Harbor Blvd, Honolulu, HI 96813',
    notes: 'Reliable supplier for Asian goods',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Island Imports Ltd.',
    contact: 'Maria Santos',
    email: 'maria@islandimports.com',
    phone: '+1-808-555-0202',
    address: '456 Ocean Drive, Honolulu, HI 96814',
    notes: 'Specializes in Pacific Rim products',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Global Food Distributors',
    contact: 'David Chen',
    email: 'david@globalfood.com',
    phone: '+1-808-555-0303',
    address: '789 Market Street, Honolulu, HI 96815',
    notes: 'Premium food and beverage supplier',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: '4',
    name: 'CNMI Local Producers',
    contact: 'Lisa Santos',
    email: 'lisa@cnmilocal.com',
    phone: '+1-670-555-0404',
    address: '321 Beach Road, Saipan, MP 96950',
    notes: 'Local CNMI agricultural products',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '5',
    name: 'Guam Trading Partners',
    contact: 'Robert Cruz',
    email: 'robert@guamtrading.com',
    phone: '+1-671-555-0505',
    address: '654 Marine Drive, Hagatna, GU 96910',
    notes: 'Guam-based supplier network',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-11')
  }
];

// Mock Items
export const mockItems: Item[] = [
  {
    id: '1',
    sku: 'BEER-001',
    barcode: '1234567890123',
    name: 'Premium Beer - 12oz Can',
    supplierId: '3',
    caseSize: 24,
    caseWeight: 18.5,
    weightStatus: 'confirmed',
    unitWeight: 0.77,
    defaultTaxCategoryId: '3',
    source: 'import',
    notes: 'Popular premium beer brand',
    expirationDate: new Date('2024-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    sku: 'WINE-001',
    barcode: '1234567890124',
    name: 'Red Wine - 750ml Bottle',
    supplierId: '3',
    caseSize: 12,
    caseWeight: 16.8,
    weightStatus: 'confirmed',
    unitWeight: 1.4,
    defaultTaxCategoryId: '4',
    source: 'import',
    notes: 'Premium red wine variety',
    expirationDate: new Date('2025-06-30'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    sku: 'CIG-001',
    barcode: '1234567890125',
    name: 'Cigarettes - 20 Pack',
    supplierId: '1',
    caseSize: 50,
    caseWeight: 2.5,
    weightStatus: 'confirmed',
    unitWeight: 0.05,
    defaultTaxCategoryId: '5',
    source: 'import',
    notes: 'Popular cigarette brand',
    expirationDate: new Date('2025-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    sku: 'FOOD-001',
    barcode: '1234567890126',
    name: 'Rice - 5lb Bag',
    supplierId: '2',
    caseSize: 10,
    caseWeight: 55.0,
    weightStatus: 'confirmed',
    unitWeight: 5.5,
    defaultTaxCategoryId: '1',
    source: 'import',
    notes: 'Premium jasmine rice',
    expirationDate: new Date('2025-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '5',
    sku: 'COSM-001',
    barcode: '1234567890127',
    name: 'Facial Cream - 50ml',
    supplierId: '1',
    caseSize: 24,
    caseWeight: 3.6,
    weightStatus: 'confirmed',
    unitWeight: 0.15,
    defaultTaxCategoryId: '7',
    source: 'import',
    notes: 'Anti-aging facial cream',
    expirationDate: new Date('2026-06-30'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '6',
    sku: 'FUEL-001',
    barcode: '1234567890128',
    name: 'Gasoline - 1 Gallon',
    supplierId: '2',
    caseSize: 4,
    caseWeight: 24.0,
    weightStatus: 'confirmed',
    unitWeight: 6.0,
    defaultTaxCategoryId: '16',
    source: 'import',
    notes: 'Premium unleaded gasoline',
    expirationDate: new Date('2024-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '7',
    sku: 'JEWEL-001',
    barcode: '1234567890129',
    name: 'Gold Necklace - 18K',
    supplierId: '1',
    caseSize: 1,
    caseWeight: 0.5,
    weightStatus: 'confirmed',
    unitWeight: 0.5,
    defaultTaxCategoryId: '13',
    source: 'import',
    notes: '18K gold necklace',
    expirationDate: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '8',
    sku: 'PERF-001',
    barcode: '1234567890130',
    name: 'Perfume - 100ml',
    supplierId: '1',
    caseSize: 12,
    caseWeight: 4.8,
    weightStatus: 'confirmed',
    unitWeight: 0.4,
    defaultTaxCategoryId: '18',
    source: 'import',
    notes: 'Luxury perfume brand',
    expirationDate: new Date('2027-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '9',
    sku: 'CONST-001',
    barcode: '1234567890131',
    name: 'Cement - 50lb Bag',
    supplierId: '2',
    caseSize: 1,
    caseWeight: 50.0,
    weightStatus: 'confirmed',
    unitWeight: 50.0,
    defaultTaxCategoryId: '6',
    source: 'import',
    notes: 'Portland cement for construction',
    expirationDate: new Date('2025-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '10',
    sku: 'LOCAL-001',
    barcode: '1234567890132',
    name: 'Local Bananas - 1lb',
    supplierId: '4',
    caseSize: 20,
    caseWeight: 20.0,
    weightStatus: 'estimated',
    unitWeight: 1.0,
    defaultTaxCategoryId: '1',
    source: 'local',
    notes: 'Fresh local bananas',
    expirationDate: new Date('2024-01-25'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
];

// Mock Shippers
export const mockShippers: Shipper[] = [
  {
    id: '1',
    name: 'Pacific Cargo Lines',
    rateModes: ['per_lb', 'per_cu_ft'],
    active: true,
    contact: 'Mike Johnson',
    phone: '+1-808-555-0606',
    email: 'mike@pacificcargo.com',
    notes: 'Reliable shipping service',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Island Freight Services',
    rateModes: ['per_lb', 'per_cu_ft', 'flat_rate'],
    active: true,
    contact: 'Sarah Wilson',
    phone: '+1-808-555-0707',
    email: 'sarah@islandfreight.com',
    notes: 'Fast delivery options',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'USPS Express',
    rateModes: ['flat_rate'],
    active: true,
    contact: 'USPS Customer Service',
    phone: '+1-800-275-8777',
    email: 'customerservice@usps.com',
    notes: 'US Postal Service',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-13')
  }
];

// Mock Shipper Rates
export const mockShipperRates: ShipperRate[] = [
  {
    id: '1',
    shipperId: '1',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    perLbRate: 0.85,
    perCuFtRate: 45.00,
    minCharge: 150.00,
    notes: 'Standard rates for 2024'
  },
  {
    id: '2',
    shipperId: '2',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    perLbRate: 0.95,
    perCuFtRate: 50.00,
    minCharge: 125.00,
    notes: 'Premium service rates'
  },
  {
    id: '3',
    shipperId: '3',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    perLbRate: 0.00,
    perCuFtRate: 0.00,
    minCharge: 25.00,
    notes: 'USPS flat rate shipping'
  }
];

// Mock Tax Categories (Enhanced)
export const mockTaxCategories: TaxCategory[] = [
  {
    id: '1',
    name: 'Agricultural Commodities',
    type: 'ad_valorem',
    adValoremRate: 0.01,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Agricultural products and commodities',
    active: true
  },
  {
    id: '2',
    name: 'Aviation Fuel',
    type: 'ad_valorem',
    adValoremRate: 0.03,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Fuel for aircraft and aviation use',
    active: true
  },
  {
    id: '3',
    name: 'Beer & Malt Beverage',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.02,
    unit: 'fl_oz',
    containerFee: true,
    description: 'Beer and malt-based beverages',
    active: true
  },
  {
    id: '4',
    name: 'Wine & Sake',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.05,
    unit: 'fl_oz',
    containerFee: true,
    description: 'Wine, sake, and similar beverages',
    active: true
  },
  {
    id: '5',
    name: 'Cigarettes',
    type: 'per_pack',
    adValoremRate: 0,
    specificRate: 3.75,
    unit: 'pack',
    containerFee: false,
    description: 'Cigarettes and tobacco products',
    active: true
  },
  {
    id: '6',
    name: 'Construction Material',
    type: 'ad_valorem',
    adValoremRate: 0.03,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Construction materials and equipment',
    active: true
  },
  {
    id: '7',
    name: 'Cosmetics',
    type: 'ad_valorem',
    adValoremRate: 0.1725,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Cosmetic and beauty products',
    active: true
  },
  {
    id: '8',
    name: 'Distilled Alcoholic Beverages',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.18,
    unit: 'fl_oz',
    containerFee: true,
    description: 'Spirits and distilled alcohol',
    active: true
  },
  {
    id: '9',
    name: 'Foodstuff',
    type: 'ad_valorem',
    adValoremRate: 0.01,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Food and food products (no EBT)',
    active: true
  },
  {
    id: '10',
    name: 'Goods Derived Locally',
    type: 'ad_valorem',
    adValoremRate: 0.01,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Products manufactured in CNMI',
    active: true
  },
  {
    id: '11',
    name: 'Hygiene & Toiletries',
    type: 'ad_valorem',
    adValoremRate: 0.01,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Personal hygiene products',
    active: true
  },
  {
    id: '12',
    name: 'Jewelry',
    type: 'ad_valorem',
    adValoremRate: 0.0575,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Jewelry and precious items',
    active: true
  },
  {
    id: '13',
    name: 'Leather Goods',
    type: 'ad_valorem',
    adValoremRate: 0.0575,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Leather products and accessories',
    active: true
  },
  {
    id: '14',
    name: 'Liquid Fuel',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.15,
    unit: 'gallon',
    containerFee: false,
    description: 'Gasoline and liquid fuels',
    active: true
  },
  {
    id: '15',
    name: 'Passenger Vehicle ≤ $30k',
    type: 'ad_valorem',
    adValoremRate: 0.05,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Passenger vehicles under $30,000',
    active: true
  },
  {
    id: '16',
    name: 'Passenger Vehicle > $30k',
    type: 'ad_valorem',
    adValoremRate: 0.0575,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Passenger vehicles over $30,000',
    active: true
  },
  {
    id: '17',
    name: 'Perfumery',
    type: 'ad_valorem',
    adValoremRate: 0.23,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Perfumes and fragrances',
    active: true
  },
  {
    id: '18',
    name: 'Precious Metals & Stones',
    type: 'ad_valorem',
    adValoremRate: 0.0575,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Gold, silver, diamonds, etc.',
    active: true
  },
  {
    id: '19',
    name: 'Prescription Drugs',
    type: 'ad_valorem',
    adValoremRate: 0.01,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Prescription medications',
    active: true
  },
  {
    id: '20',
    name: 'Soft Drinks',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.005,
    unit: 'fl_oz',
    containerFee: true,
    description: 'Soft drinks and sodas',
    active: true
  },
  {
    id: '21',
    name: 'Tobacco (non-cigarette)',
    type: 'ad_valorem',
    adValoremRate: 0.60,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Cigars, pipe tobacco, etc.',
    active: true
  },
  {
    id: '22',
    name: 'All Others',
    type: 'ad_valorem',
    adValoremRate: 0.05,
    specificRate: 0,
    unit: '',
    containerFee: false,
    description: 'Default category for unclassified items',
    active: true
  }
];

// Mock System Settings
export const mockSystemSettings: SystemSettings = {
  id: '1',
  ebtRate: 0.0042,
  containerFee: 0.05,
  expirationWarningDays: 30,
  defaultCurrency: 'USD',
  defaultFxRate: 1.0,
  updatedAt: new Date('2024-01-15')
};

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    vendor: 'Pacific Trading Co.',
    currency: 'USD',
    fxRateToUSD: 1.0,
    totalAmount: 2500.00,
    invoiceDate: new Date('2024-01-10'),
    dueDate: new Date('2024-02-10'),
    notes: 'Beer and wine shipment',
    fileUrl: '/invoices/inv-2024-001.pdf',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    vendor: 'Island Imports Ltd.',
    currency: 'USD',
    fxRateToUSD: 1.0,
    totalAmount: 1800.00,
    invoiceDate: new Date('2024-01-12'),
    dueDate: new Date('2024-02-12'),
    notes: 'Food and construction materials',
    fileUrl: '/invoices/inv-2024-002.pdf',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    vendor: 'Global Food Distributors',
    currency: 'EUR',
    fxRateToUSD: 1.08,
    totalAmount: 3200.00,
    invoiceDate: new Date('2024-01-14'),
    dueDate: new Date('2024-02-14'),
    notes: 'Premium food products',
    fileUrl: '/invoices/inv-2024-003.pdf',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  }
];

// Mock Shipments
export const mockShipments: Shipment[] = [
  {
    id: '1',
    shipmentId: 'SHIP-2024-001',
    shipDate: new Date('2024-01-15'),
    shipperId: '1',
    allocationMethod: 'by_weight',
    wharfage: 125.00,
    otherFees: 75.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'First shipment of 2024',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    shipmentId: 'SHIP-2024-002',
    shipDate: new Date('2024-01-20'),
    shipperId: '2',
    allocationMethod: 'by_value',
    wharfage: 150.00,
    otherFees: 100.00,
    uspsFlatCharge: 0,
    status: 'pending',
    notes: 'Premium goods shipment',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    shipmentId: 'SHIP-2024-003',
    shipDate: new Date('2024-01-25'),
    shipperId: '3',
    allocationMethod: 'by_weight',
    wharfage: 0,
    otherFees: 0,
    uspsFlatCharge: 25.00,
    status: 'active',
    notes: 'USPS express shipment',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

// Mock Shipment Lines
export const mockShipmentLines: ShipmentLine[] = [
  {
    id: '1',
    shipmentId: '1',
    itemId: '1',
    invoiceId: '1',
    qtyCases: 50,
    qtyUnits: 1200,
    unitCost: 2.50,
    totalCost: 3000.00,
    volumePerUnit: 12,
    containersPerUnit: 1,
    expirationDate: new Date('2024-12-31'),
    notes: 'Premium beer shipment',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    shipmentId: '1',
    itemId: '2',
    invoiceId: '1',
    qtyCases: 25,
    qtyUnits: 300,
    unitCost: 8.00,
    totalCost: 2400.00,
    volumePerUnit: 750,
    containersPerUnit: 1,
    expirationDate: new Date('2025-06-30'),
    notes: 'Red wine shipment',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    shipmentId: '2',
    itemId: '4',
    invoiceId: '2',
    qtyCases: 100,
    qtyUnits: 1000,
    unitCost: 3.50,
    totalCost: 3500.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: new Date('2025-12-31'),
    notes: 'Rice shipment',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    shipmentId: '2',
    itemId: '9',
    invoiceId: '2',
    qtyCases: 200,
    qtyUnits: 200,
    unitCost: 12.00,
    totalCost: 2400.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: new Date('2025-12-31'),
    notes: 'Cement shipment',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '5',
    shipmentId: '3',
    itemId: '7',
    invoiceId: '3',
    qtyCases: 1,
    qtyUnits: 1,
    unitCost: 2500.00,
    totalCost: 2500.00,
    volumePerUnit: 0,
    containersPerUnit: 0,
    expirationDate: null,
    notes: 'Gold necklace',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    entity: 'shipment',
    entityId: '1',
    action: 'created',
    changeSummary: 'Created new shipment SHIP-2024-001',
    timestamp: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    userId: '2',
    entity: 'item',
    entityId: '1',
    action: 'updated',
    changeSummary: 'Updated case weight from 18.0 to 18.5 lbs',
    timestamp: new Date('2024-01-15T11:30:00Z')
  },
  {
    id: '3',
    userId: '1',
    entity: 'tax_category',
    entityId: '3',
    action: 'updated',
    changeSummary: 'Updated beer tax rate from $0.018 to $0.02 per fl oz',
    timestamp: new Date('2024-01-15T14:15:00Z')
  },
  {
    id: '4',
    userId: '3',
    entity: 'supplier',
    entityId: '4',
    action: 'created',
    changeSummary: 'Added new local supplier CNMI Local Producers',
    timestamp: new Date('2024-01-15T16:45:00Z')
  },
  {
    id: '5',
    userId: '2',
    entity: 'shipment',
    entityId: '2',
    action: 'created',
    changeSummary: 'Created new shipment SHIP-2024-002',
    timestamp: new Date('2024-01-20T09:00:00Z')
  }
];

// Sample chart data for dashboard
export const mockChartData = {
  monthlyShipments: [
    { month: 'Jan', shipments: 12, value: 45000 },
    { month: 'Feb', shipments: 15, value: 52000 },
    { month: 'Mar', shipments: 18, value: 61000 },
    { month: 'Apr', shipments: 14, value: 48000 },
    { month: 'May', shipments: 20, value: 68000 },
    { month: 'Jun', shipments: 22, value: 72000 }
  ],
  taxRevenue: [
    { category: 'Foodstuff', amount: 12500 },
    { category: 'Beverages', amount: 8900 },
    { category: 'Tobacco', amount: 15600 },
    { category: 'Cosmetics', amount: 7200 },
    { category: 'Construction', amount: 9800 },
    { category: 'Other', amount: 11200 }
  ],
  supplierPerformance: [
    { supplier: 'Pacific Trading', items: 45, value: 28000 },
    { supplier: 'Island Imports', items: 38, value: 22000 },
    { supplier: 'Global Food', items: 52, value: 35000 },
    { supplier: 'CNMI Local', items: 15, value: 8000 },
    { supplier: 'Guam Trading', items: 28, value: 18000 }
  ]
};

// Sample statistics for dashboard
export const mockStats = {
  totalShipments: 156,
  totalValue: 2850000,
  totalTaxRevenue: 125000,
  activeSuppliers: 5,
  totalItems: 178,
  expiringItems: 12
};
