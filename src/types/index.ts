// Core type definitions for the CNMI Supply Chain Arbitrage App

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  createdAt: Date;
  lastLogin?: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  notes: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  supplierId: string;
  caseSize: number;
  caseWeight: number; // in lbs
  weightStatus: 'estimated' | 'confirmed';
  unitWeight: number; // auto-calculated
  defaultTaxCategoryId: string;
  source: 'cnmi' | 'saipan' | 'import';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipper {
  id: string;
  name: string;
  rateModes: ('per_lb' | 'per_cu_ft')[];
  active: boolean;
  createdAt: Date;
}

export interface ShipperRate {
  id: string;
  shipperId: string;
  startDate: Date;
  endDate: Date;
  perLbRate: number;
  perCuFtRate: number;
  minCharge: number;
}

export interface TaxCategory {
  id: string;
  name: string;
  type: 'ad_valorem' | 'per_volume' | 'per_pack' | 'hybrid';
  adValoremRate: number; // percentage
  specificRate: number; // rate per unit
  unit: string; // fl oz, pack, etc.
  containerFeeFlag: boolean;
  description: string;
}

export interface Shipment {
  id: string;
  shipDate: Date;
  shipperId: string;
  allocationMethod: 'by_value' | 'by_weight';
  wharfage: number;
  otherFees: number;
  uspsFlat: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  shipmentId: string;
  invoiceNumber: string;
  vendor: string;
  currency: string;
  fxRate: number; // to USD
  fileUrl?: string;
  createdAt: Date;
}

export interface ShipmentLine {
  id: string;
  shipmentId: string;
  itemId: string;
  invoiceId: string;
  qtyCases: number;
  qtyUnits: number;
  unitCost: number; // in invoice currency
  unitCostUSD: number; // converted to USD
  volumePerUnit: number; // in fl oz
  containersPerUnit: number;
  expirationDate?: Date;
  createdAt: Date;
}

export interface SystemSettings {
  ebtRate: number; // 0.0042
  containerFee: number; // 0.05
  expirationWarning: number; // 30 days
}

export interface AuditLog {
  id: string;
  userId: string;
  timestamp: Date;
  entity: string;
  entityId: string;
  changeSummary: string;
}

export interface LandedCostResult {
  cif: number;
  exciseTax: number;
  ebt: number;
  containerFee: number;
  totalTax: number;
  landedPerUnit: number;
  landedPerCase: number;
  markups: {
    thirty: { retail: number; margin: number };
    forty: { retail: number; margin: number };
    fifty: { retail: number; margin: number };
  };
}

export interface FreightAllocation {
  totalFreight: number;
  totalValue: number;
  totalWeight: number;
  perItem: {
    itemId: string;
    allocatedFreight: number;
    allocationBasis: number;
  }[];
}