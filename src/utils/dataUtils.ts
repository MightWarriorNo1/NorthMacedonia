import { 
  Item, 
  Supplier, 
  Shipment, 
  Invoice, 
  ShipmentLine, 
  Shipper, 
  ShipperRate, 
  TaxCategory, 
  SystemSettings 
} from '../types';

// Data Filtering and Search
export const filterItemsBySupplier = (items: Item[], supplierId: string): Item[] => {
  return items.filter(item => item.supplierId === supplierId);
};

export const filterItemsByTaxCategory = (items: Item[], taxCategoryId: string): Item[] => {
  return items.filter(item => item.defaultTaxCategoryId === taxCategoryId);
};

export const filterItemsBySource = (items: Item[], source: 'import' | 'CNMI/Saipan'): Item[] => {
  return items.filter(item => item.source === source);
};

export const searchItems = (items: Item[], query: string): Item[] => {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.sku.toLowerCase().includes(lowerQuery) ||
    item.barcode.includes(query)
  );
};

export const filterShipmentsByStatus = (shipments: Shipment[], status: string): Shipment[] => {
  return shipments.filter(shipment => shipment.status === status);
};

export const filterShipmentsByShipper = (shipments: Shipment[], shipperId: string): Shipment[] => {
  return shipments.filter(shipment => shipment.shipperId === shipperId);
};

export const filterShipmentsByDateRange = (shipments: Shipment[], startDate: Date, endDate: Date): Shipment[] => {
  return shipments.filter(shipment => 
    shipment.shipDate >= startDate && shipment.shipDate <= endDate
  );
};

// Data Aggregation and Calculations
export const calculateTotalValue = (items: Item[]): number => {
  return items.reduce((total, item) => total + (item.unitCost || 0), 0);
};

export const calculateTotalWeight = (items: Item[]): number => {
  return items.reduce((total, item) => total + (item.caseWeight || 0), 0);
};

export const calculateAverageUnitCost = (items: Item[]): number => {
  if (items.length === 0) return 0;
  const totalCost = items.reduce((total, item) => total + (item.unitCost || 0), 0);
  return totalCost / items.length;
};

export const calculateTotalTaxRevenue = (shipments: Shipment[], shipmentLines: ShipmentLine[]): number => {
  // This is a simplified calculation - in reality, you'd calculate actual taxes
  return shipments.reduce((total, shipment) => {
    const shipmentValue = shipmentLines
      .filter(line => line.shipmentId === shipment.id)
      .reduce((sum, line) => sum + (line.totalCost || 0), 0);
    return total + (shipmentValue * 0.05); // Assume 5% average tax rate
  }, 0);
};

export const calculateSupplierMetrics = (supplier: Supplier, items: Item[], shipments: Shipment[]): {
  totalItems: number;
  totalValue: number;
  totalShipments: number;
  averageItemCost: number;
} => {
  const supplierItems = filterItemsBySupplier(items, supplier.id);
  const supplierShipments = shipments.filter(s => 
    supplierItems.some(item => 
      supplierItems.some(supplierItem => supplierItem.id === item.id)
    )
  );

  return {
    totalItems: supplierItems.length,
    totalValue: calculateTotalValue(supplierItems),
    totalShipments: supplierShipments.length,
    averageItemCost: calculateAverageUnitCost(supplierItems)
  };
};

// Tax Calculations
export const calculateExciseTax = (
  item: Item, 
  taxCategory: TaxCategory, 
  totalCost: number,
  quantity: number
): number => {
  switch (taxCategory.type) {
    case 'ad_valorem':
      return (totalCost * taxCategory.adValoremRate) / 100;
    
    case 'per_volume':
      const volumeInUnits = (item.volumePerUnit || 0) * quantity;
      return volumeInUnits * (taxCategory.specificRate || 0);
    
    case 'per_pack':
      return quantity * (taxCategory.specificRate || 0);
    
    case 'hybrid':
      const adValoremTax = (totalCost * (taxCategory.adValoremRate || 0)) / 100;
      const specificTax = quantity * (taxCategory.specificRate || 0);
      return adValoremTax + specificTax;
    
    default:
      return 0;
  }
};

export const calculateEBTTax = (
  item: Item, 
  totalCost: number, 
  systemSettings: SystemSettings
): number => {
  // EBT is 0.42% on all consumer goods except Foodstuff
  if (item.defaultTaxCategoryId === '1') { // Foodstuff
    return 0;
  }
  return totalCost * (systemSettings.ebtRate || 0.0042);
};

export const calculateContainerFee = (
  item: Item, 
  taxCategory: TaxCategory, 
  quantity: number,
  systemSettings: SystemSettings
): number => {
  if (!taxCategory.containerFeeFlag) {
    return 0;
  }
  return quantity * (systemSettings.containerFee || 0.05);
};

export const calculateTotalTax = (
  item: Item,
  taxCategory: TaxCategory,
  totalCost: number,
  quantity: number,
  systemSettings: SystemSettings
): {
  exciseTax: number;
  ebtTax: number;
  containerFee: number;
  totalTax: number;
} => {
  const exciseTax = calculateExciseTax(item, taxCategory, totalCost, quantity);
  const ebtTax = calculateEBTTax(item, totalCost, systemSettings);
  const containerFee = calculateContainerFee(item, taxCategory, quantity, systemSettings);

  return {
    exciseTax,
    ebtTax,
    containerFee,
    totalTax: exciseTax + ebtTax + containerFee
  };
};

// Landed Cost Calculations
export const calculateLandedCost = (
  baseCost: number,
  freightCost: number,
  taxes: number
): number => {
  return baseCost + freightCost + taxes;
};

export const calculateFreightAllocation = (
  shipment: Shipment,
  shipmentLines: ShipmentLine[],
  shipperRate: ShipperRate
): number => {
  const totalWeight = shipmentLines.reduce((sum, line) => {
    const item = shipmentLines.find(sl => sl.itemId === line.itemId);
    return sum + ((item?.unitWeight || 0) * (line.qtyUnits || 0));
  }, 0);

  const totalValue = shipmentLines.reduce((sum, line) => sum + (line.totalCost || 0), 0);

  let freightCost = 0;
  
  if (shipment.allocationMethod === 'by_weight') {
    freightCost = totalWeight * (shipperRate.perLbRate || 0);
  } else {
    // by_value allocation
    freightCost = totalValue * 0.02; // Assume 2% of value for freight
  }

  // Add other fees
  freightCost += (shipment.wharfage || 0) + (shipment.otherFees || 0) + (shipment.uspsFlatCharge || 0);

  // Apply minimum charge if applicable
  if (freightCost < (shipperRate.minCharge || 0)) {
    freightCost = shipperRate.minCharge || 0;
  }

  return freightCost;
};

// Data Validation
export const validateItem = (item: Partial<Item>): string[] => {
  const errors: string[] = [];

  if (!item.name || item.name.trim() === '') {
    errors.push('Item name is required');
  }

  if (!item.sku || item.sku.trim() === '') {
    errors.push('SKU is required');
  }

  if (!item.supplierId) {
    errors.push('Supplier is required');
  }

  if (!item.defaultTaxCategoryId) {
    errors.push('Tax category is required');
  }

  if (item.caseSize && item.caseSize <= 0) {
    errors.push('Case size must be greater than 0');
  }

  if (item.caseWeight && item.caseWeight < 0) {
    errors.push('Case weight cannot be negative');
  }

  return errors;
};

export const validateShipment = (shipment: Partial<Shipment>): string[] => {
  const errors: string[] = [];

  if (!shipment.shipmentId || shipment.shipmentId.trim() === '') {
    errors.push('Shipment ID is required');
  }

  if (!shipment.shipDate) {
    errors.push('Ship date is required');
  }

  if (!shipment.shipperId) {
    errors.push('Shipper is required');
  }

  if (!shipment.allocationMethod) {
    errors.push('Allocation method is required');
  }

  return errors;
};

// Data Export and Formatting
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatWeight = (weight: number, unit: string = 'lbs'): string => {
  return `${weight.toFixed(2)} ${unit}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Data Sorting
export const sortItemsByName = (items: Item[]): Item[] => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortItemsByCost = (items: Item[], ascending: boolean = true): Item[] => {
  return [...items].sort((a, b) => {
    const costA = a.unitCost || 0;
    const costB = b.unitCost || 0;
    return ascending ? costA - costB : costB - costA;
  });
};

export const sortShipmentsByDate = (shipments: Shipment[], ascending: boolean = true): Shipment[] => {
  return [...shipments].sort((a, b) => {
    const dateA = new Date(a.shipDate).getTime();
    const dateB = new Date(b.shipDate).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Data Pagination
export const paginateData = <T>(
  data: T[], 
  page: number, 
  pageSize: number
): { data: T[]; totalPages: number; currentPage: number; totalItems: number } => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalPages,
    currentPage: page,
    totalItems
  };
};

// Data Statistics
export const calculateStatistics = (items: Item[]): {
  count: number;
  totalValue: number;
  averageValue: number;
  minValue: number;
  maxValue: number;
  totalWeight: number;
  averageWeight: number;
} => {
  if (items.length === 0) {
    return {
      count: 0,
      totalValue: 0,
      averageValue: 0,
      minValue: 0,
      maxValue: 0,
      totalWeight: 0,
      averageWeight: 0
    };
  }

  const values = items.map(item => item.unitCost || 0);
  const weights = items.map(item => item.caseWeight || 0);

  return {
    count: items.length,
    totalValue: values.reduce((sum, value) => sum + value, 0),
    averageValue: values.reduce((sum, value) => sum + value, 0) / values.length,
    minValue: Math.min(...values),
    maxValue: Math.max(...values),
    totalWeight: weights.reduce((sum, weight) => sum + weight, 0),
    averageWeight: weights.reduce((sum, weight) => sum + weight, 0) / weights.length
  };
};

// Data Export Functions
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (value instanceof Date) {
          return formatDate(value);
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Utility Functions
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
