import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Truck, Plus, Calendar, DollarSign, Package, FileText } from 'lucide-react';
import { Shipment, Invoice, ShipmentLine } from '../types';
import { TaxCalculator } from '../utils/taxCalculator';
import { FreightAllocator } from '../utils/freightAllocator';

export function ShipmentManagement() {
  const { state, dispatch } = useApp();
  const { shipments, shippers, invoices, shipmentLines, items, taxCategories } = state;
  const [activeShipment, setActiveShipment] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    shipDate: new Date().toISOString().split('T')[0],
    shipperId: '',
    allocationMethod: 'by_value' as 'by_value' | 'by_weight',
    wharfage: 0,
    otherFees: 0,
    uspsFlat: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shipmentData: Shipment = {
      id: Date.now().toString(),
      shipDate: new Date(formData.shipDate),
      shipperId: formData.shipperId,
      allocationMethod: formData.allocationMethod,
      wharfage: formData.wharfage,
      otherFees: formData.otherFees,
      uspsFlat: formData.uspsFlat,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_SHIPMENT', payload: shipmentData });
    
    dispatch({
      type: 'ADD_AUDIT_LOG',
      payload: {
        id: Date.now().toString(),
        userId: state.user?.id || '',
        timestamp: new Date(),
        entity: 'Shipment',
        entityId: shipmentData.id,
        changeSummary: 'Shipment created'
      }
    });

    setShowForm(false);
    setActiveShipment(shipmentData.id);
  };

  const getShipmentLines = (shipmentId: string) => {
    return shipmentLines.filter(line => line.shipmentId === shipmentId);
  };

  const getShipmentInvoices = (shipmentId: string) => {
    const lines = getShipmentLines(shipmentId);
    const invoiceIds = [...new Set(lines.map(line => line.invoiceId))];
    return invoices.filter(invoice => invoiceIds.includes(invoice.id));
  };

  const calculateShipmentTotals = (shipmentId: string) => {
    const lines = getShipmentLines(shipmentId);
    const shipment = shipments.find(s => s.id === shipmentId);
    
    if (!shipment || lines.length === 0) {
      return { totalCIF: 0, totalTax: 0, totalLanded: 0 };
    }

    let totalCIF = 0;
    let totalTax = 0;

    // Calculate freight allocation
    const allocator = new FreightAllocator();
    const totalFreight = shipment.wharfage + shipment.otherFees + shipment.uspsFlat;
    const allocation = allocator.allocateFreight(lines, items, shipment.allocationMethod, totalFreight);

    lines.forEach(line => {
      const item = items.find(i => i.id === line.itemId);
      const taxCategory = taxCategories.find(t => t.id === item?.defaultTaxCategoryId);
      
      if (item && taxCategory) {
        const baseCost = line.unitCostUSD * line.qtyUnits;
        const allocatedFreight = allocation.perItem.find(a => a.itemId === line.itemId)?.allocatedFreight || 0;
        const cif = baseCost + allocatedFreight;
        
        const calculator = new TaxCalculator(state.systemSettings);
        const tax = calculator.calculateTax(
          cif,
          taxCategory,
          line.volumePerUnit * line.qtyUnits,
          line.containersPerUnit * line.qtyUnits,
          line.qtyUnits,
          item.source
        );

        totalCIF += cif;
        totalTax += tax.total;
      }
    });

    return {
      totalCIF,
      totalTax,
      totalLanded: totalCIF + totalTax
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipment Management</h1>
          <p className="text-gray-600">Track and calculate landed costs for shipments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Shipment</span>
        </button>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {shipments.map((shipment) => {
          const shipper = shippers.find(s => s.id === shipment.shipperId);
          const lines = getShipmentLines(shipment.id);
          const invoicesCount = getShipmentInvoices(shipment.id).length;
          const totals = calculateShipmentTotals(shipment.id);
          const isActive = activeShipment === shipment.id;

          return (
            <div key={shipment.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setActiveShipment(isActive ? null : shipment.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Shipment #{shipment.id.slice(-6)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(shipment.shipDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{invoicesCount} invoices</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4" />
                          <span>{lines.length} line items</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Landed Cost</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${totals.totalLanded.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isActive && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Shipper</p>
                        <p className="font-medium text-gray-900">{shipper?.name || 'N/A'}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Allocation Method</p>
                        <p className="font-medium text-gray-900 capitalize">
                          {shipment.allocationMethod.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Fees</p>
                        <p className="font-medium text-gray-900">
                          ${(shipment.wharfage + shipment.otherFees + shipment.uspsFlat).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">CIF Total</p>
                        <p className="text-lg font-bold text-blue-600">
                          ${totals.totalCIF.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Tax</p>
                        <p className="text-lg font-bold text-orange-600">
                          ${totals.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Landed Cost</p>
                        <p className="text-lg font-bold text-green-600">
                          ${totals.totalLanded.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {shipments.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-12">
          <div className="text-center">
            <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No shipments yet</p>
            <p className="text-sm text-gray-400">Create your first shipment to start calculating landed costs</p>
          </div>
        </div>
      )}

      {/* Shipment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Create New Shipment</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ship Date</label>
                <input
                  type="date"
                  value={formData.shipDate}
                  onChange={(e) => setFormData({ ...formData, shipDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipper</label>
                <select
                  value={formData.shipperId}
                  onChange={(e) => setFormData({ ...formData, shipperId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Shipper</option>
                  {shippers.filter(s => s.active).map(shipper => (
                    <option key={shipper.id} value={shipper.id}>{shipper.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allocation Method</label>
                <select
                  value={formData.allocationMethod}
                  onChange={(e) => setFormData({ ...formData, allocationMethod: e.target.value as 'by_value' | 'by_weight' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="by_value">By Value</option>
                  <option value="by_weight">By Weight</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wharfage ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.wharfage}
                    onChange={(e) => setFormData({ ...formData, wharfage: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Other Fees ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.otherFees}
                    onChange={(e) => setFormData({ ...formData, otherFees: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">USPS Flat Charge ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.uspsFlat}
                    onChange={(e) => setFormData({ ...formData, uspsFlat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}