import { TaxCategory } from '../types';

export const defaultTaxCategories: TaxCategory[] = [
  {
    id: 'agricultural',
    name: 'Agricultural Commodities',
    type: 'ad_valorem',
    adValoremRate: 1,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '1% ad valorem'
  },
  {
    id: 'aviation-fuel',
    name: 'Aviation Fuel',
    type: 'ad_valorem',
    adValoremRate: 3,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '3% ad valorem'
  },
  {
    id: 'beer-malt',
    name: 'Beer & Malt Beverage',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.02,
    unit: 'fl oz',
    containerFeeFlag: true,
    description: '$0.02 per fl oz + container fee'
  },
  {
    id: 'boats-yachts',
    name: 'Boats/Yachts > $500k',
    type: 'ad_valorem',
    adValoremRate: 5.75,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5.75% ad valorem'
  },
  {
    id: 'cigarettes',
    name: 'Cigarettes',
    type: 'per_pack',
    adValoremRate: 0,
    specificRate: 3.75,
    unit: 'pack',
    containerFeeFlag: false,
    description: '$3.75 per 20 sticks (per pack)'
  },
  {
    id: 'construction',
    name: 'Construction Material/Equipment/Machinery',
    type: 'ad_valorem',
    adValoremRate: 3,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '3% ad valorem'
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    type: 'ad_valorem',
    adValoremRate: 17.25,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '17.25% ad valorem'
  },
  {
    id: 'distilled-alcohol',
    name: 'Distilled Alcoholic Beverages',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.18,
    unit: 'fl oz',
    containerFeeFlag: true,
    description: '$0.18 per fl oz + container fee'
  },
  {
    id: 'foodstuff',
    name: 'Foodstuff',
    type: 'ad_valorem',
    adValoremRate: 1,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '1% ad valorem (no EBT)'
  },
  {
    id: 'local-goods',
    name: 'Goods Derived Locally',
    type: 'ad_valorem',
    adValoremRate: 1,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '1% ad valorem'
  },
  {
    id: 'hygiene',
    name: 'Hygiene/Toiletries',
    type: 'ad_valorem',
    adValoremRate: 1,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '1% ad valorem'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    type: 'ad_valorem',
    adValoremRate: 5.75,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5.75% ad valorem'
  },
  {
    id: 'leather',
    name: 'Leather Goods',
    type: 'ad_valorem',
    adValoremRate: 5.75,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5.75% ad valorem'
  },
  {
    id: 'liquid-fuel',
    name: 'Liquid Fuel',
    type: 'per_volume',
    adValoremRate: 0,
    specificRate: 0.15,
    unit: 'gallon',
    containerFeeFlag: false,
    description: '$0.15 per gallon'
  },
  {
    id: 'vehicle-under-30k',
    name: 'Passenger Vehicle ≤ $30k',
    type: 'ad_valorem',
    adValoremRate: 5,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5% ad valorem'
  },
  {
    id: 'vehicle-over-30k',
    name: 'Passenger Vehicle > $30k',
    type: 'ad_valorem',
    adValoremRate: 5.75,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5.75% ad valorem'
  },
  {
    id: 'perfumery',
    name: 'Perfumery',
    type: 'ad_valorem',
    adValoremRate: 23,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '23% ad valorem'
  },
  {
    id: 'precious-metals',
    name: 'Precious Metals/Stones',
    type: 'ad_valorem',
    adValoremRate: 5.75,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5.75% ad valorem'
  },
  {
    id: 'prescription-drugs',
    name: 'Prescription Drugs/Medicines',
    type: 'ad_valorem',
    adValoremRate: 1,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '1% ad valorem'
  },
  {
    id: 'soft-drinks',
    name: 'Soft Drinks',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.005,
    unit: 'fl oz',
    containerFeeFlag: true,
    description: '$0.005 per fl oz + container fee'
  },
  {
    id: 'tobacco-other',
    name: 'Tobacco (non-cigarette)',
    type: 'ad_valorem',
    adValoremRate: 60,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '60% ad valorem'
  },
  {
    id: 'wine-sake',
    name: 'Wine & Sake',
    type: 'hybrid',
    adValoremRate: 0,
    specificRate: 0.05,
    unit: 'fl oz',
    containerFeeFlag: true,
    description: '$0.05 per fl oz + container fee'
  },
  {
    id: 'all-others',
    name: 'All Others',
    type: 'ad_valorem',
    adValoremRate: 5,
    specificRate: 0,
    unit: '',
    containerFeeFlag: false,
    description: '5% ad valorem'
  }
];