import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = ({ onNextStep }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleNext = () => {
    // Perform any necessary validation before proceeding to the next step
    // For simplicity, let's assume all fields are required
    if (name && email && birthdate) {
      onNextStep();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleBack = () => {
    navigate('/storageplan');
  }

  return (
    <div>
      <h2>Personal Information</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </label>
      <br />
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Save & Continue</button>
    </div>
  );
};

export default PersonalInfo;
