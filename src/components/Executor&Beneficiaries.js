import React, { useState, useEffect } from 'react';
import Web3 from 'web3';  // Import web3 library
import ExecutorContractABI from './beneficiary.json';  // Import the ABI of your smart contract
import config from './config';  // Import the contract address from your configuration

const ExecutorandBeneficiaries = ({ onNextStep, onPreviousStep }) => {
  const [executorName, setExecutorName] = useState('');
  const [executorContact, setExecutorContact] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');

  // Web3 instance and contract instance
  const [web3, setWeb3] = useState(null);
  const [executorContract, setExecutorContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const newWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(newWeb3);
          const contract = new newWeb3.eth.Contract(ExecutorContractABI, config.contractAddress1);
          setExecutorContract(contract);
        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      } else {
        console.error('Web3 not found. Consider installing MetaMask.');
      }
    };

    initializeWeb3();
  }, []);

  const handleAddBeneficiary = async () => {
    if (!web3 || !executorContract) {
      console.error('Web3 or contract not initialized');
      return;
    }
  
    if (beneficiaryAddress && isValidEthereumAddress(beneficiaryAddress)) {
      try {
        // Check if the beneficiary is not already added
        const isAdded = await executorContract.methods.beneficiaries(beneficiaryAddress).call();
  
        if (!isAdded) {
          const accounts = await web3.eth.getAccounts();
          await executorContract.methods.addBeneficiary(beneficiaryAddress).send({ from: accounts[0] });
          setBeneficiaries([...beneficiaries, { address: beneficiaryAddress }]);
          setBeneficiaryAddress('');
        } else {
          alert('Beneficiary already added.');
        }
      } catch (error) {
        console.error('Error adding beneficiary:', error);
        alert('Error adding beneficiary. Check the console for details.');
      }
    } else {
      alert('Please enter a valid beneficiary Ethereum address.');
    }
  };  

  const handleRemoveBeneficiary = (index) => {
    const updatedBeneficiaries = [...beneficiaries];
    updatedBeneficiaries.splice(index, 1);
    setBeneficiaries(updatedBeneficiaries);
  };

  const handleNext = () => {
    // Perform any necessary validation before proceeding to the next step
    // For simplicity, let's assume all fields are required
    if (executorName && executorContact && beneficiaries.length > 0) {
      onNextStep();
    } else {
      alert('Please fill in all fields for executor and add at least one beneficiary.');
    }
  };

  const isValidEthereumAddress = (address) => {
    // You can implement a more robust validation for Ethereum addresses if needed
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  };

  return (
    <div>
      <h2>Executor:</h2>
      <label>
        Executor's Name:
        <input type="text" value={executorName} onChange={(e) => setExecutorName(e.target.value)} />
      </label>
      <br />
      <label>
        Executor's Contact:
        <input type="text" value={executorContact} onChange={(e) => setExecutorContact(e.target.value)} />
      </label>
      <br />
      <h2>Beneficiaries:</h2>
      {beneficiaries.map((beneficiary, index) => (
        <div key={index}>
          <strong>Beneficiary:</strong> {beneficiary.address}
          <button onClick={() => handleRemoveBeneficiary(index)}>Remove</button>
        </div>
      ))}
      <br />
      <label>
        Beneficiary's Ethereum Address:
        <input type="text" value={beneficiaryAddress} onChange={(e) => setBeneficiaryAddress(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
      <br />
      <button onClick={onPreviousStep}>Previous</button>
      <button onClick={handleNext}>Save & Continue</button>
    </div>
  );
};

export default ExecutorandBeneficiaries;
