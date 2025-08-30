import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Users, Truck, Calculator, FileText } from 'lucide-react';

export function AdminPanel() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('users');

  const sections = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'shippers', name: 'Shipper Rates', icon: Truck },
    { id: 'taxes', name: 'Tax Categories', icon: Calculator },
    { id: 'settings', name: 'System Settings', icon: Settings },
    { id: 'audit', name: 'Audit Logs', icon: FileText }
  ];

  const handleSettingsUpdate = (updates: Partial<typeof state.systemSettings>) => {
    dispatch({
      type: 'UPDATE_SYSTEM_SETTINGS',
      payload: { ...state.systemSettings, ...updates }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">System configuration and management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'users' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {state.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.lastLogin ? `Last login: ${new Date(user.lastLogin).toLocaleDateString()}` : 'Never logged in'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">System Settings</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EBT Rate (Environmental Beautification Tax)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      step="0.0001"
                      value={state.systemSettings.ebtRate}
                      onChange={(e) => handleSettingsUpdate({ ebtRate: parseFloat(e.target.value) })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600">({(state.systemSettings.ebtRate * 100).toFixed(2)}%)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Container Fee
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={state.systemSettings.containerFee}
                      onChange={(e) => handleSettingsUpdate({ containerFee: parseFloat(e.target.value) })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-600">per container</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Warning (days)
                  </label>
                  <input
                    type="number"
                    value={state.systemSettings.expirationWarning}
                    onChange={(e) => handleSettingsUpdate({ expirationWarning: parseInt(e.target.value) })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'taxes' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Tax Categories</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {state.taxCategories.map((category) => (
                    <div key={category.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          category.containerFeeFlag ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      {category.containerFeeFlag && (
                        <p className="text-xs text-orange-600 mt-1">+ Container fee applies</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'audit' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Audit Logs</h2>
              </div>
              <div className="p-6">
                {state.auditLogs.length > 0 ? (
                  <div className="space-y-3">
                    {state.auditLogs
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .slice(0, 20)
                      .map((log) => {
                        const user = state.users.find(u => u.id === log.userId);
                        return (
                          <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{log.changeSummary}</p>
                              <p className="text-xs text-gray-500">
                                {log.entity} • {user?.name} • {new Date(log.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No audit logs yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}