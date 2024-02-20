// StoragePlan.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './StoragePlan.css'; // Import your CSS file for styling

const StoragePlan = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('Opening modal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = () => {
    closeModal(); // Close the modal upon acceptance
    navigate('/WillCreation');
  };

  return (
    <div className="storage-plan">
      <h1>Storage Plan</h1>
      <div className="plan-container">
        <div className="plan">
          <h2>Basic Plan</h2>
          <p>5 Assets</p>
          <p>0.04 ETH</p>
          <button onClick={openModal}>Select Plan</button>
        </div>
        <div className="plan">
          <h2>Standard Plan</h2>
          <p>10 Assets</p>
          <p>0.08 ETH</p>
          <button onClick={openModal}>Select Plan</button>
        </div>
        <div className="plan">
          <h2>Premium Plan</h2>
          <p>Unlimited Assets</p>
          <p>0.1 ETH</p>
          <button onClick={openModal}>Select Plan</button>
        </div>
      </div>
      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Terms and Conditions Modal"
        ariaHideApp={false} // Fix for warning about appElement not being set
      >
        <h2>Terms and Conditions</h2>
        <p>
          blablabla...
        </p>
        {/* Add more terms and conditions content as needed */}
        <button onClick={handleAccept}>Accept</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default StoragePlan;
