import { ShipmentLine, Item } from '../types';

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

export class FreightAllocator {
  allocateFreight(
    lines: ShipmentLine[],
    items: Item[],
    method: 'by_value' | 'by_weight',
    totalFreight: number
  ): FreightAllocation {
    let totalBasis = 0;
    const itemBasis: { [itemId: string]: number } = {};

    // Calculate total basis for allocation
    lines.forEach(line => {
      const item = items.find(i => i.id === line.itemId);
      if (!item) return;

      let basis = 0;
      if (method === 'by_value') {
        basis = line.unitCostUSD * line.qtyUnits;
      } else {
        basis = item.unitWeight * line.qtyUnits;
      }

      itemBasis[line.itemId] = (itemBasis[line.itemId] || 0) + basis;
      totalBasis += basis;
    });

    // Allocate freight proportionally
    const perItem = Object.entries(itemBasis).map(([itemId, basis]) => ({
      itemId,
      allocatedFreight: totalBasis > 0 ? (basis / totalBasis) * totalFreight : 0,
      allocationBasis: basis
    }));

    return {
      totalFreight,
      totalValue: method === 'by_value' ? totalBasis : 0,
      totalWeight: method === 'by_weight' ? totalBasis : 0,
      perItem
    };
  }
}