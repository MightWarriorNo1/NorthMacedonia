import { 
  Item, 
  Supplier, 
  Shipment, 
  Invoice, 
  ShipmentLine, 
  Shipper, 
  ShipperRate, 
  TaxCategory 
} from '../types';

// Test Scenario 1: Foodstuff Import (No EBT)
export const foodstuffScenario = {
  name: 'Foodstuff Import - No EBT',
  description: 'Importing food items which are exempt from Environmental Beautification Tax',
  items: [
    {
      id: 'test-food-1',
      sku: 'FOOD-TEST-001',
      barcode: '9999999999001',
      name: 'Organic Rice - 5lb Bag',
      supplierId: '1',
      caseSize: 20,
      caseWeight: 100.0,
      weightStatus: 'confirmed',
      unitWeight: 5.0,
      defaultTaxCategoryId: '1', // Foodstuff - 1% ad valorem
      source: 'import',
      notes: 'Test scenario for foodstuff tax calculation',
      expirationDate: new Date('2025-12-31'),
      unitCost: 8.50,
      totalCost: 170.00
    }
  ],
  shipment: {
    id: 'test-ship-food',
    shipmentId: 'TEST-FOOD-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '1',
    allocationMethod: 'by_weight',
    wharfage: 150.00,
    otherFees: 75.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test foodstuff shipment - no EBT'
  },
  expectedTaxes: {
    exciseTax: 1.70, // 1% of $170.00
    ebtTax: 0, // No EBT for foodstuff
    containerFee: 0, // No container fee for rice
    totalTax: 1.70
  },
  expectedLandedCost: {
    perUnit: 8.59, // $8.50 + $0.09 tax
    perCase: 171.70 // $170.00 + $1.70 tax
  }
};

// Test Scenario 2: Beverage Import (With EBT + Container Fee)
export const beverageScenario = {
  name: 'Beverage Import - EBT + Container Fee',
  description: 'Importing soft drinks with both EBT and container fees',
  items: [
    {
      id: 'test-beverage-1',
      sku: 'BEV-TEST-001',
      barcode: '9999999999002',
      name: 'Cola Soda - 12oz Can',
      supplierId: '2',
      caseSize: 24,
      caseWeight: 20.0,
      weightStatus: 'confirmed',
      unitWeight: 0.83,
      defaultTaxCategoryId: '21', // Soft Drinks - $0.005 per fl oz + container fee
      source: 'import',
      notes: 'Test scenario for beverage tax calculation',
      expirationDate: new Date('2025-06-30'),
      unitCost: 0.75,
      totalCost: 18.00,
      volumePerUnit: 12, // 12 fl oz
      containersPerUnit: 1
    }
  ],
  shipment: {
    id: 'test-ship-beverage',
    shipmentId: 'TEST-BEVERAGE-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '2',
    allocationMethod: 'by_value',
    wharfage: 100.00,
    otherFees: 50.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test beverage shipment - EBT + container fee'
  },
  expectedTaxes: {
    exciseTax: 1.44, // 24 cans × $0.005 × 12 fl oz
    ebtTax: 0.08, // 0.42% of $18.00
    containerFee: 1.20, // 24 cans × $0.05
    totalTax: 2.72
  },
  expectedLandedCost: {
    perUnit: 0.86, // $0.75 + $0.11 tax
    perCase: 20.72 // $18.00 + $2.72 tax
  }
};

// Test Scenario 3: Tobacco Import (High Tax Rate)
export const tobaccoScenario = {
  name: 'Tobacco Import - High Tax Rate',
  description: 'Importing tobacco products with 60% ad valorem tax',
  items: [
    {
      id: 'test-tobacco-1',
      sku: 'TOB-TEST-001',
      barcode: '9999999999003',
      name: 'Premium Cigars - 10 Pack',
      supplierId: '3',
      caseSize: 50,
      caseWeight: 5.0,
      weightStatus: 'confirmed',
      unitWeight: 0.1,
      defaultTaxCategoryId: '22', // Tobacco (non-cigarette) - 60% ad valorem
      source: 'import',
      notes: 'Test scenario for tobacco tax calculation',
      expirationDate: new Date('2026-12-31'),
      unitCost: 25.00,
      totalCost: 1250.00
    }
  ],
  shipment: {
    id: 'test-ship-tobacco',
    shipmentId: 'TEST-TOBACCO-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '1',
    allocationMethod: 'by_value',
    wharfage: 200.00,
    otherFees: 100.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test tobacco shipment - 60% tax rate'
  },
  expectedTaxes: {
    exciseTax: 750.00, // 60% of $1250.00
    ebtTax: 5.25, // 0.42% of $1250.00
    containerFee: 0, // No container fee for cigars
    totalTax: 755.25
  },
  expectedLandedCost: {
    perUnit: 40.11, // $25.00 + $15.11 tax
    perCase: 2005.25 // $1250.00 + $755.25 tax
  }
};

// Test Scenario 4: Luxury Goods Import (High Value)
export const luxuryGoodsScenario = {
  name: 'Luxury Goods Import - High Value Items',
  description: 'Importing luxury items with 5.75% ad valorem tax',
  items: [
    {
      id: 'test-luxury-1',
      sku: 'LUX-TEST-001',
      barcode: '9999999999004',
      name: 'Diamond Ring - 2 Carat',
      supplierId: '7',
      caseSize: 1,
      caseWeight: 0.1,
      weightStatus: 'confirmed',
      unitWeight: 0.1,
      defaultTaxCategoryId: '12', // Jewelry - 5.75% ad valorem
      source: 'import',
      notes: 'Test scenario for luxury goods tax calculation',
      expirationDate: null,
      unitCost: 15000.00,
      totalCost: 15000.00
    }
  ],
  shipment: {
    id: 'test-ship-luxury',
    shipmentId: 'TEST-LUXURY-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '4', // Air Cargo Express
    allocationMethod: 'by_value',
    wharfage: 500.00,
    otherFees: 250.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test luxury goods shipment - air freight'
  },
  expectedTaxes: {
    exciseTax: 862.50, // 5.75% of $15000.00
    ebtTax: 63.00, // 0.42% of $15000.00
    containerFee: 0, // No container fee for jewelry
    totalTax: 925.50
  },
  expectedLandedCost: {
    perUnit: 15925.50, // $15000.00 + $925.50 tax
    perCase: 15925.50 // Same as per unit for single item
  }
};

// Test Scenario 5: Vehicle Import (Large Item)
export const vehicleScenario = {
  name: 'Vehicle Import - Large Item Tax',
  description: 'Importing a vehicle with 5.75% ad valorem tax',
  items: [
    {
      id: 'test-vehicle-1',
      sku: 'VEH-TEST-001',
      barcode: '9999999999005',
      name: 'Honda Civic - 2024 Model',
      supplierId: '1',
      caseSize: 1,
      caseWeight: 2800.0,
      weightStatus: 'confirmed',
      unitWeight: 2800.0,
      defaultTaxCategoryId: '17', // Passenger Vehicle > $30k - 5.75% ad valorem
      source: 'import',
      notes: 'Test scenario for vehicle tax calculation',
      expirationDate: null,
      unitCost: 35000.00,
      totalCost: 35000.00
    }
  ],
  shipment: {
    id: 'test-ship-vehicle',
    shipmentId: 'TEST-VEHICLE-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '5', // Ocean Freight Specialists
    allocationMethod: 'by_weight',
    wharfage: 1000.00,
    otherFees: 500.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test vehicle shipment - ocean freight'
  },
  expectedTaxes: {
    exciseTax: 2012.50, // 5.75% of $35000.00
    ebtTax: 147.00, // 0.42% of $35000.00
    containerFee: 0, // No container fee for vehicles
    totalTax: 2159.50
  },
  expectedLandedCost: {
    perUnit: 37159.50, // $35000.00 + $2159.50 tax
    perCase: 37159.50 // Same as per unit for single item
  }
};

// Test Scenario 6: CNMI Local Source (No Import Taxes)
export const localSourceScenario = {
  name: 'CNMI Local Source - No Import Taxes',
  description: 'Items sourced from CNMI/Saipan with no import taxes',
  items: [
    {
      id: 'test-local-1',
      sku: 'LOCAL-TEST-001',
      barcode: '9999999999006',
      name: 'Local Bananas - 1lb',
      supplierId: '4', // CNMI Local
      caseSize: 40,
      caseWeight: 40.0,
      weightStatus: 'confirmed',
      unitWeight: 1.0,
      defaultTaxCategoryId: '1', // Foodstuff - 1% ad valorem
      source: 'CNMI/Saipan',
      notes: 'Test scenario for local source items',
      expirationDate: new Date('2024-02-25'),
      unitCost: 2.00,
      totalCost: 80.00
    }
  ],
  shipment: {
    id: 'test-ship-local',
    shipmentId: 'TEST-LOCAL-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '3', // USPS
    allocationMethod: 'by_weight',
    wharfage: 0,
    otherFees: 0,
    uspsFlatCharge: 35.00,
    status: 'active',
    notes: 'Test local source shipment - no import taxes'
  },
  expectedTaxes: {
    exciseTax: 0.80, // 1% of $80.00 (only local tax)
    ebtTax: 0, // No EBT for local source
    containerFee: 0, // No container fee for bananas
    totalTax: 0.80
  },
  expectedLandedCost: {
    perUnit: 2.02, // $2.00 + $0.02 tax
    perCase: 80.80 // $80.00 + $0.80 tax
  }
};

// Test Scenario 7: Mixed Shipment (Multiple Tax Categories)
export const mixedShipmentScenario = {
  name: 'Mixed Shipment - Multiple Tax Categories',
  description: 'Shipment containing items with different tax categories',
  items: [
    {
      id: 'test-mixed-1',
      sku: 'MIXED-TEST-001',
      barcode: '9999999999007',
      name: 'Mixed Goods Package',
      supplierId: '1',
      caseSize: 1,
      caseWeight: 50.0,
      weightStatus: 'confirmed',
      unitWeight: 50.0,
      defaultTaxCategoryId: '25', // All Others - 5% ad valorem
      source: 'import',
      notes: 'Test scenario for mixed shipment',
      expirationDate: new Date('2025-12-31'),
      unitCost: 500.00,
      totalCost: 500.00
    }
  ],
  shipment: {
    id: 'test-ship-mixed',
    shipmentId: 'TEST-MIXED-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '1',
    allocationMethod: 'by_value',
    wharfage: 300.00,
    otherFees: 150.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test mixed shipment - multiple tax categories'
  },
  expectedTaxes: {
    exciseTax: 25.00, // 5% of $500.00
    ebtTax: 2.10, // 0.42% of $500.00
    containerFee: 0, // No container fee for mixed goods
    totalTax: 27.10
  },
  expectedLandedCost: {
    perUnit: 527.10, // $500.00 + $27.10 tax
    perCase: 527.10 // Same as per unit for single item
  }
};

// Test Scenario 8: Expiring Items Alert
export const expiringItemsScenario = {
  name: 'Expiring Items Alert - 30 Day Warning',
  description: 'Items approaching expiration date with system alerts',
  items: [
    {
      id: 'test-expiring-1',
      sku: 'EXP-TEST-001',
      barcode: '9999999999008',
      name: 'Fresh Milk - 1 Gallon',
      supplierId: '2',
      caseSize: 12,
      caseWeight: 96.0,
      weightStatus: 'confirmed',
      unitWeight: 8.0,
      defaultTaxCategoryId: '1', // Foodstuff - 1% ad valorem
      source: 'import',
      notes: 'Test scenario for expiring items',
      expirationDate: new Date('2024-03-15'), // 30 days from test date
      unitCost: 4.50,
      totalCost: 54.00
    }
  ],
  shipment: {
    id: 'test-ship-expiring',
    shipmentId: 'TEST-EXPIRING-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '1',
    allocationMethod: 'by_weight',
    wharfage: 100.00,
    otherFees: 50.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test expiring items shipment'
  },
  expectedTaxes: {
    exciseTax: 0.54, // 1% of $54.00
    ebtTax: 0, // No EBT for foodstuff
    containerFee: 0, // No container fee for milk
    totalTax: 0.54
  },
  expectedLandedCost: {
    perUnit: 4.55, // $4.50 + $0.05 tax
    perCase: 54.54 // $54.00 + $0.54 tax
  },
  expirationWarning: {
    daysUntilExpiry: 30,
    alertLevel: 'warning',
    actionRequired: 'Prioritize sale or consumption'
  }
};

// Test Scenario 9: Currency Conversion (Non-USD Invoice)
export const currencyConversionScenario = {
  name: 'Currency Conversion - Non-USD Invoice',
  description: 'Invoice in foreign currency requiring FX conversion',
  items: [
    {
      id: 'test-currency-1',
      sku: 'CURR-TEST-001',
      barcode: '9999999999009',
      name: 'Japanese Green Tea - 100g',
      supplierId: '6', // Asian Market Wholesale
      caseSize: 50,
      caseWeight: 10.0,
      weightStatus: 'confirmed',
      unitWeight: 0.2,
      defaultTaxCategoryId: '1', // Foodstuff - 1% ad valorem
      source: 'import',
      notes: 'Test scenario for currency conversion',
      expirationDate: new Date('2026-12-31'),
      unitCost: 2.50, // USD equivalent
      totalCost: 125.00, // USD equivalent
      originalCurrency: 'JPY',
      originalAmount: 18750,
      fxRate: 0.0067
    }
  ],
  shipment: {
    id: 'test-ship-currency',
    shipmentId: 'TEST-CURRENCY-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '1',
    allocationMethod: 'by_value',
    wharfage: 150.00,
    otherFees: 75.00,
    uspsFlatCharge: 0,
    status: 'active',
    notes: 'Test currency conversion shipment'
  },
  expectedTaxes: {
    exciseTax: 1.25, // 1% of $125.00
    ebtTax: 0, // No EBT for foodstuff
    containerFee: 0, // No container fee for tea
    totalTax: 1.25
  },
  expectedLandedCost: {
    perUnit: 2.53, // $2.50 + $0.03 tax
    perCase: 126.25 // $125.00 + $1.25 tax
  },
  currencyDetails: {
    originalCurrency: 'JPY',
    originalAmount: 18750,
    fxRate: 0.0067,
    usdEquivalent: 125.00,
    conversionDate: new Date('2024-02-15')
  }
};

// Test Scenario 10: USPS Flat Rate Allocation
export const uspsFlatRateScenario = {
  name: 'USPS Flat Rate - Weight-Based Allocation',
  description: 'USPS shipment with flat rate and weight-based allocation',
  items: [
    {
      id: 'test-usps-1',
      sku: 'USPS-TEST-001',
      barcode: '9999999999010',
      name: 'Small Electronics Package',
      supplierId: '3',
      caseSize: 1,
      caseWeight: 2.0,
      weightStatus: 'confirmed',
      unitWeight: 2.0,
      defaultTaxCategoryId: '25', // All Others - 5% ad valorem
      source: 'import',
      notes: 'Test scenario for USPS flat rate',
      expirationDate: null,
      unitCost: 150.00,
      totalCost: 150.00
    }
  ],
  shipment: {
    id: 'test-ship-usps',
    shipmentId: 'TEST-USPS-001',
    shipDate: new Date('2024-02-15'),
    shipperId: '3', // USPS
    allocationMethod: 'by_weight',
    wharfage: 0,
    otherFees: 0,
    uspsFlatCharge: 35.00,
    status: 'active',
    notes: 'Test USPS flat rate shipment'
  },
  expectedTaxes: {
    exciseTax: 7.50, // 5% of $150.00
    ebtTax: 0.63, // 0.42% of $150.00
    containerFee: 0, // No container fee for electronics
    totalTax: 8.13
  },
  expectedLandedCost: {
    perUnit: 158.13, // $150.00 + $8.13 tax
    perCase: 158.13 // Same as per unit for single item
  },
  uspsDetails: {
    flatRate: 35.00,
    weight: 2.0,
    allocationMethod: 'by_weight',
    totalShippingCost: 35.00
  }
};

// All Test Scenarios
export const allTestScenarios = [
  foodstuffScenario,
  beverageScenario,
  tobaccoScenario,
  luxuryGoodsScenario,
  vehicleScenario,
  localSourceScenario,
  mixedShipmentScenario,
  expiringItemsScenario,
  currencyConversionScenario,
  uspsFlatRateScenario
];

// Test Scenario Summary
export const testScenarioSummary = {
  totalScenarios: allTestScenarios.length,
  categories: {
    foodstuff: 1,
    beverages: 1,
    tobacco: 1,
    luxuryGoods: 1,
    vehicles: 1,
    localSource: 1,
    mixedShipments: 1,
    expiringItems: 1,
    currencyConversion: 1,
    uspsFlatRate: 1
  },
  taxCategories: [
    'Foodstuff (1% ad valorem)',
    'Soft Drinks ($0.005 per fl oz + container fee)',
    'Tobacco (60% ad valorem)',
    'Jewelry (5.75% ad valorem)',
    'Passenger Vehicle > $30k (5.75% ad valorem)',
    'All Others (5% ad valorem)'
  ],
  allocationMethods: ['by_value', 'by_weight'],
  sources: ['import', 'CNMI/Saipan'],
  shippers: ['Pacific Trading', 'Island Imports', 'USPS', 'Air Cargo Express', 'Ocean Freight Specialists']
};
