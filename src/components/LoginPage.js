// LoginPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import contractAbi from './registration.json';
import config from './config';

const LoginPage = ({ setAddress }) => {
  const [web3, setWeb3] = useState(null);
  const [web3Initialized, setWeb3Initialized] = useState(false);
  const navigate = useNavigate();
  const contractAddress = config.contractAddress;
  const userRegistryContract = web3 ? new web3.eth.Contract(contractAbi, contractAddress) : null;

  const handleRegisterUser = async () => {
    try {
      if (!web3Initialized) {
        console.warn('Web3 is not yet initialized.');
        return;
      }
      if (userRegistryContract) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
          const userAddress = accounts[0];
          console.log('User Address:', userAddress);
          setAddress(userAddress);

          // Check if the user is already registered
          const isExistingUser = await userRegistryContract.methods.isRegistered(userAddress).call();

          if (isExistingUser) {
            alert('Address is already registered.');
            console.log('User is already registered.');
          } else {
            // Register the user
            await userRegistryContract.methods.registerUser().send({ from: userAddress });

            console.log('User registered successfully. Redirecting to storage plan.');
            await navigate('/storageplan');
          }          
        } else {
          console.warn('No accounts found.');
        }
      } else {
        console.warn('User Registry Contract not initialized.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const newWeb3 = new Web3(window.ethereum);
          console.log('Connected to MetaMask:', newWeb3);
          setWeb3(newWeb3);
          setWeb3Initialized(true);
        } catch (error) {
          console.error('Error connecting MetaMask:', error);
        }
      } else {
        console.warn('MetaMask not found or not enabled.');
      }
    };

    initializeWeb3();
  }, []);
  
  const handleConnectWallet = async () => {
    try {
      if (!web3Initialized) {
        console.warn('Web3 is not yet initialized.');
        return;
      }
      // Ensure there is a connected wallet
      console.log('Web3:', web3); // Log web3 before using it
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        if (accounts.length > 0) {
          const userAddress = accounts[0];
          console.log('User Address:', userAddress); // Log user address
          setAddress(userAddress);
  
          // Check if the user is an existing user
          if (userRegistryContract) {
            console.log('User Registry Contract:', userRegistryContract); // Log userRegistryContract before using it
            const isExistingUser = await userRegistryContract.methods.isRegistered(userAddress).call();
  
            if (isExistingUser) {
              console.log('Existing user. Redirecting to dashboard.');
              await navigate('/dashboard');
            } else {
              alert('Your account is new. Please sign up first.');
              console.log('New user. Redirecting to storage plan.');
              // await navigate('/storageplan');
            }
          } else {
            console.warn('User Registry Contract not initialized.');
          }
        } else {
          console.warn('No accounts found.');
        }
      } else {
        console.warn('MetaMask not found.');
      }
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };
  
  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <button onClick={handleConnectWallet}>Log In</button>
      <button onClick={handleRegisterUser}>Sign Up</button>
    </div>
  );
};

export default LoginPage;
