import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ItemManagement } from './components/ItemManagement';
import { SupplierManagement } from './components/SupplierManagement';
import { ShipmentManagement } from './components/ShipmentManagement';
import { Reports } from './components/Reports';
import { AdminPanel } from './components/AdminPanel';
import { NotificationContainer } from './components/Notification';

function AppContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (state.showLanding) {
    return <LandingPage />;
  }

  if (!state.user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemManagement />;
      case 'suppliers':
        return <SupplierManagement />;
      case 'shipments':
        return <ShipmentManagement />;
      case 'reports':
        return <Reports />;
      case 'admin':
        return state.user.role === 'admin' ? <AdminPanel /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <NotificationContainer />
      <AppContent />
    </AppProvider>
  );
}

export default App;