import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, Truck, AlertTriangle, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { StatsCard, Card, CardHeader, CardTitle, CardContent, Chart, SimpleBarChart } from './ui';

export function Dashboard() {
  const { state } = useApp();
  const { items, shipments, shipmentLines } = state;

  // Calculate dashboard metrics
  const totalItems = items.length;
  const totalShipments = shipments.length;
  const expiringItems = items.filter(item => {
    // For demo purposes, randomly mark some items as expiring
    return Math.random() > 0.8;
  }).length;

  const recentShipments = shipments
    .sort((a, b) => new Date(b.shipDate).getTime() - new Date(a.shipDate).getTime())
    .slice(0, 5);

  const stats = [
    {
      name: 'Total Items',
      value: totalItems.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Active Shipments',
      value: totalShipments.toString(),
      icon: Truck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Expiring Soon',
      value: expiringItems.toString(),
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'Monthly Revenue',
      value: '$127K',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Supply chain overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StatsCard
              key={stat.name}
              title={stat.name}
              value={stat.value}
              icon={Icon}
              variant="primary"
              size="md"
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <Card>
          <CardHeader>
            <CardTitle size="lg">Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            {recentShipments.length > 0 ? (
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Truck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Shipment #{shipment.id.slice(-6)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(shipment.shipDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No shipments yet</p>
                <p className="text-sm text-gray-400">Create your first shipment to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle size="lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-left hover:shadow-md transform hover:-translate-y-1">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Create Shipment</p>
                  <p className="text-sm text-blue-600">Start a new shipment calculation</p>
                </div>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 text-left hover:shadow-md transform hover:-translate-y-1">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Add Item</p>
                  <p className="text-sm text-green-600">Register a new inventory item</p>
                </div>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 text-left hover:shadow-md transform hover:-translate-y-1">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-purple-900">Generate Report</p>
                  <p className="text-sm text-purple-600">View cost analysis reports</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle size="lg">CNMI Tax Categories</CardTitle>
          <p className="text-sm text-gray-600">Current excise tax rates and categories</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.taxCategories.slice(0, 6).map((category) => (
              <div key={category.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200">
                <p className="font-medium text-gray-900 mb-2">{category.name}</p>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {state.taxCategories.length} total tax categories configured
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}