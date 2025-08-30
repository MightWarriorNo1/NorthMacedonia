import { TaxCategory, SystemSettings } from '../types';

export interface TaxBreakdown {
  excise: number;
  ebt: number;
  containerFee: number;
  total: number;
}

export class TaxCalculator {
  constructor(private settings: SystemSettings) {}

  calculateTax(
    cif: number,
    taxCategory: TaxCategory,
    volumeFlOz: number,
    containers: number,
    units: number,
    source: 'cnmi' | 'saipan' | 'import'
  ): TaxBreakdown {
    let excise = 0;
    let ebt = 0;
    let containerFee = 0;

    // Skip all taxes for CNMI/Saipan source
    if (source === 'cnmi' || source === 'saipan') {
      return { excise: 0, ebt: 0, containerFee: 0, total: 0 };
    }

    // Calculate excise tax based on category type
    switch (taxCategory.type) {
      case 'ad_valorem':
        excise = cif * (taxCategory.adValoremRate / 100);
        break;
      
      case 'per_volume':
        if (taxCategory.unit === 'fl oz') {
          excise = volumeFlOz * taxCategory.specificRate;
        } else if (taxCategory.unit === 'gallon') {
          excise = (volumeFlOz / 128) * taxCategory.specificRate; // 128 fl oz per gallon
        }
        break;
      
      case 'per_pack':
        // For cigarettes: $3.75 per 20 sticks (per pack)
        const packs = units; // Assuming each unit is a pack
        excise = packs * taxCategory.specificRate;
        break;
      
      case 'hybrid':
        // Combination of ad valorem and specific rates
        excise = cif * (taxCategory.adValoremRate / 100);
        if (taxCategory.unit === 'fl oz') {
          excise += volumeFlOz * taxCategory.specificRate;
        }
        break;
    }

    // Calculate EBT (except for Foodstuff)
    if (taxCategory.id !== 'foodstuff') {
      ebt = cif * this.settings.ebtRate;
    }

    // Calculate container fee if applicable
    if (taxCategory.containerFeeFlag) {
      containerFee = containers * this.settings.containerFee;
    }

    return {
      excise,
      ebt,
      containerFee,
      total: excise + ebt + containerFee
    };
  }

  calculateLandedCost(
    baseCost: number,
    allocatedFreight: number,
    taxCategory: TaxCategory,
    volumeFlOz: number,
    containers: number,
    units: number,
    source: 'cnmi' | 'saipan' | 'import'
  ) {
    const cif = baseCost + allocatedFreight;
    const taxes = this.calculateTax(cif, taxCategory, volumeFlOz, containers, units, source);
    const landedPerUnit = (cif + taxes.total) / units;
    
    return {
      cif,
      ...taxes,
      landedPerUnit,
      landedPerCase: landedPerUnit * units // Assuming units is case size for this calculation
    };
  }

  calculateMarkups(landedCost: number) {
    return {
      thirty: {
        retail: landedCost * 1.3,
        margin: 30
      },
      forty: {
        retail: landedCost * 1.4,
        margin: 40
      },
      fifty: {
        retail: landedCost * 1.5,
        margin: 50
      }
    };
  }
}