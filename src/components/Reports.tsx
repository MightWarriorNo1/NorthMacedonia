import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, Calendar, Filter, TrendingUp, DollarSign, Package } from 'lucide-react';

export function Reports() {
  const { state } = useApp();
  const [reportType, setReportType] = useState('shipment-summary');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const reportTypes = [
    { id: 'shipment-summary', name: 'Shipment Summary', icon: Package },
    { id: 'tax-summary', name: 'Tax Summary', icon: DollarSign },
    { id: 'freight-summary', name: 'Freight Summary', icon: TrendingUp },
    { id: 'expiration-report', name: 'Expiration Report', icon: Calendar }
  ];

  const generateReport = () => {
    // In a real app, this would generate and download actual reports
    alert(`Generating ${reportTypes.find(t => t.id === reportType)?.name} report for ${dateRange.start} to ${dateRange.end}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate comprehensive reports for analysis and audit</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={generateReport}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Revenue Summary</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Shipments</span>
                <span className="font-medium">{state.shipments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium">{state.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Suppliers</span>
                <span className="font-medium">{state.suppliers.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Tax Collection</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Excise Tax</span>
                <span className="font-medium">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">EBT</span>
                <span className="font-medium">$3,210</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Container Fees</span>
                <span className="font-medium">$890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Categories Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Top Tax Categories</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {state.taxCategories.slice(0, 8).map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${(Math.random() * 5000 + 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 50 + 10)} items
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">{type.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {type.id === 'shipment-summary' && 'Detailed breakdown of shipment costs, taxes, and landed prices'}
                    {type.id === 'tax-summary' && 'Tax collection summary by category and date range'}
                    {type.id === 'freight-summary' && 'Freight costs and allocation analysis by shipper'}
                    {type.id === 'expiration-report' && 'Items approaching expiration dates'}
                  </p>
                  <button
                    onClick={() => setReportType(type.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Select Report
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}