// Main Mock Data
export * from './mockData';

// Additional Mock Data
export * from './additionalMockData';

// Combined Data Sets
export const allUsers = [
  ...require('./mockData').users,
  ...require('./additionalMockData').additionalUsers
];

export const allSuppliers = [
  ...require('./mockData').suppliers,
  ...require('./additionalMockData').additionalSuppliers
];

export const allItems = [
  ...require('./mockData').items,
  ...require('./additionalMockData').additionalItems
];

export const allShippers = [
  ...require('./mockData').shippers,
  ...require('./additionalMockData').additionalShippers
];

export const allShipperRates = [
  ...require('./mockData').shipperRates,
  ...require('./additionalMockData').additionalShipperRates
];

export const allInvoices = [
  ...require('./mockData').invoices,
  ...require('./additionalMockData').additionalInvoices
];

export const allShipments = [
  ...require('./mockData').shipments,
  ...require('./additionalMockData').additionalShipments
];

export const allShipmentLines = [
  ...require('./mockData').shipmentLines,
  ...require('./additionalMockData').additionalShipmentLines
];

export const allAuditLogs = [
  ...require('./mockData').auditLogs,
  ...require('./additionalMockData').additionalAuditLogs
];

// Data Summary
export const dataSummary = {
  totalUsers: allUsers.length,
  totalSuppliers: allSuppliers.length,
  totalItems: allItems.length,
  totalShippers: allShippers.length,
  totalInvoices: allInvoices.length,
  totalShipments: allShipments.length,
  totalShipmentLines: allShipmentLines.length,
  totalAuditLogs: allAuditLogs.length,
  totalTaxCategories: require('./mockData').taxCategories.length,
  totalSystemSettings: require('./mockData').systemSettings.length
};
