// Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ address }) => {
  const [currentAddress, setCurrentAddress] = useState(address);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentAddress(address);
  }, [address]);

  useEffect(() => {
    const handleAccountsChanged = (newAccounts) => {
      if (newAccounts.length > 0 && newAccounts[0] !== currentAddress) {
        // Prompt the user to log out and log in again
        alert('Your MetaMask account has changed. Please log out and log in again to switch to another account.');
        // You can add a logout logic or redirect the user to the login page here
      }
    };


    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      };
    }
  }, [currentAddress, navigate]);

  const handleLogout = () => {
    // Add any additional logout logic here
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Connected Wallet Address: {currentAddress}</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Other dashboard content goes here */}
    </div>
  );
};

export default Dashboard;
