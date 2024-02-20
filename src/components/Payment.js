// Payment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({ onPreviousStep }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePayment = () => {
    // Perform payment logic (this is a simulated function)
    console.log('Payment successful!');
    setShowConfirmation(true);
  };

  const handleBack = () => {
    // Navigate back to the previous step
    onPreviousStep();
  };

  const handleConfirm = () => {
    // Perform any additional confirmation logic
    // Then, redirect to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="payment">
      <h1>Payment</h1>
      {/* Payment Form */}
      <label>
        Card Number:
        <input
          type="text"
          value={paymentDetails.cardNumber}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
        />
      </label>
      <br />
      <label>
        Expiry Date:
        <input
          type="text"
          value={paymentDetails.expiryDate}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
        />
      </label>
      <br />
      <label>
        CVV:
        <input
          type="text"
          value={paymentDetails.cvv}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
        />
      </label>
      <br />
      <button onClick={handlePayment}>Pay Now</button>
      <button onClick={handleBack}>Back</button>

      {/* Payment Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <h2>Payment Confirmation</h2>
          <p>Your payment was successful!</p>
          <button onClick={handleConfirm}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Payment;
