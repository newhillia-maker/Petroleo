/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Traceability } from './pages/Traceability';
import { FuelBatches } from './pages/FuelBatches';
import { BlockchainRecords } from './pages/BlockchainRecords';
import { TransactionDetail } from './pages/TransactionDetail';
import { UserManagement } from './pages/UserManagement';
import { Alerts } from './pages/Alerts';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLogin={login} />
        } />
        
        <Route element={isAuthenticated ? <Layout onLogout={logout} /> : <Navigate to="/login" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/traceability/:id" element={<Traceability />} />
          <Route path="/batches" element={<FuelBatches />} />
          <Route path="/records" element={<BlockchainRecords />} />
          <Route path="/records/:id" element={<TransactionDetail />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/shipments" element={<Dashboard />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
