// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import StoragePlan from './components/StoragePlan';
import WillCreation from './components/WillCreation';

function App() {
  const [address, setAddress] = useState('');

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<LoginPage setAddress={setAddress} />}
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard address={address} />} />

        <Route 
          path="/storageplan" 
          element={<StoragePlan address={address} />} />

        <Route 
          path="/willcreation" 
          element={<WillCreation address={address} />} />
          
      </Routes>
    </Router>
  );
}

export default App;
