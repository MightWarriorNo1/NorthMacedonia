import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Supplier, Item, Shipper, ShipperRate, Shipment, Invoice, ShipmentLine, TaxCategory, AuditLog, SystemSettings } from '../types';
import { defaultTaxCategories } from '../data/taxCategories';

interface AppState {
  user: User | null;
  showLanding: boolean;
  users: User[];
  suppliers: Supplier[];
  items: Item[];
  shippers: Shipper[];
  shipperRates: ShipperRate[];
  shipments: Shipment[];
  invoices: Invoice[];
  shipmentLines: ShipmentLine[];
  taxCategories: TaxCategory[];
  auditLogs: AuditLog[];
  systemSettings: SystemSettings;
}

type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SHOW_LANDING'; payload: boolean }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_SUPPLIER'; payload: Supplier }
  | { type: 'UPDATE_SUPPLIER'; payload: Supplier }
  | { type: 'DELETE_SUPPLIER'; payload: string }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'ADD_SHIPPER'; payload: Shipper }
  | { type: 'UPDATE_SHIPPER'; payload: Shipper }
  | { type: 'DELETE_SHIPPER'; payload: string }
  | { type: 'ADD_SHIPPER_RATE'; payload: ShipperRate }
  | { type: 'UPDATE_SHIPPER_RATE'; payload: ShipperRate }
  | { type: 'DELETE_SHIPPER_RATE'; payload: string }
  | { type: 'ADD_SHIPMENT'; payload: Shipment }
  | { type: 'UPDATE_SHIPMENT'; payload: Shipment }
  | { type: 'DELETE_SHIPMENT'; payload: string }
  | { type: 'ADD_INVOICE'; payload: Invoice }
  | { type: 'UPDATE_INVOICE'; payload: Invoice }
  | { type: 'DELETE_INVOICE'; payload: string }
  | { type: 'ADD_SHIPMENT_LINE'; payload: ShipmentLine }
  | { type: 'UPDATE_SHIPMENT_LINE'; payload: ShipmentLine }
  | { type: 'DELETE_SHIPMENT_LINE'; payload: string }
  | { type: 'UPDATE_TAX_CATEGORY'; payload: TaxCategory }
  | { type: 'UPDATE_SYSTEM_SETTINGS'; payload: SystemSettings }
  | { type: 'ADD_AUDIT_LOG'; payload: AuditLog };

const initialState: AppState = {
  user: null,
  showLanding: true,
  users: [
    {
      id: 'admin-1',
      email: 'admin@cnmi.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date()
    },
    {
      id: 'staff-1',
      email: 'staff@cnmi.com',
      name: 'Staff User',
      role: 'staff',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date()
    }
  ],
  suppliers: [],
  items: [],
  shippers: [],
  shipperRates: [],
  shipments: [],
  invoices: [],
  shipmentLines: [],
  taxCategories: defaultTaxCategories,
  auditLogs: [],
  systemSettings: {
    ebtRate: 0.0042,
    containerFee: 0.05,
    expirationWarning: 30
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, showLanding: false };
    case 'LOGOUT':
      return { ...state, user: null, showLanding: true };
    case 'SHOW_LANDING':
      return { ...state, showLanding: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return { ...state, users: state.users.map(u => u.id === action.payload.id ? action.payload : u) };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };
    case 'ADD_SUPPLIER':
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    case 'UPDATE_SUPPLIER':
      return { ...state, suppliers: state.suppliers.map(s => s.id === action.payload.id ? action.payload : s) };
    case 'DELETE_SUPPLIER':
      return { ...state, suppliers: state.suppliers.filter(s => s.id !== action.payload) };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? action.payload : i) };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'ADD_SHIPPER':
      return { ...state, shippers: [...state.shippers, action.payload] };
    case 'UPDATE_SHIPPER':
      return { ...state, shippers: state.shippers.map(s => s.id === action.payload.id ? action.payload : s) };
    case 'DELETE_SHIPPER':
      return { ...state, shippers: state.shippers.filter(s => s.id !== action.payload) };
    case 'ADD_SHIPPER_RATE':
      return { ...state, shipperRates: [...state.shipperRates, action.payload] };
    case 'UPDATE_SHIPPER_RATE':
      return { ...state, shipperRates: state.shipperRates.map(r => r.id === action.payload.id ? action.payload : r) };
    case 'DELETE_SHIPPER_RATE':
      return { ...state, shipperRates: state.shipperRates.filter(r => r.id !== action.payload) };
    case 'ADD_SHIPMENT':
      return { ...state, shipments: [...state.shipments, action.payload] };
    case 'UPDATE_SHIPMENT':
      return { ...state, shipments: state.shipments.map(s => s.id === action.payload.id ? action.payload : s) };
    case 'DELETE_SHIPMENT':
      return { ...state, shipments: state.shipments.filter(s => s.id !== action.payload) };
    case 'ADD_INVOICE':
      return { ...state, invoices: [...state.invoices, action.payload] };
    case 'UPDATE_INVOICE':
      return { ...state, invoices: state.invoices.map(i => i.id === action.payload.id ? action.payload : i) };
    case 'DELETE_INVOICE':
      return { ...state, invoices: state.invoices.filter(i => i.id !== action.payload) };
    case 'ADD_SHIPMENT_LINE':
      return { ...state, shipmentLines: [...state.shipmentLines, action.payload] };
    case 'UPDATE_SHIPMENT_LINE':
      return { ...state, shipmentLines: state.shipmentLines.map(l => l.id === action.payload.id ? action.payload : l) };
    case 'DELETE_SHIPMENT_LINE':
      return { ...state, shipmentLines: state.shipmentLines.filter(l => l.id !== action.payload) };
    case 'UPDATE_TAX_CATEGORY':
      return { ...state, taxCategories: state.taxCategories.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'UPDATE_SYSTEM_SETTINGS':
      return { ...state, systemSettings: action.payload };
    case 'ADD_AUDIT_LOG':
      return { ...state, auditLogs: [...state.auditLogs, action.payload] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}