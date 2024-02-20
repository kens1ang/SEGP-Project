import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import ExecutorandBeneficiaries from './Executor&Beneficiaries';
import Assets from './Assets';
import Payment from './Payment';

const WillCreationPage = ({ address }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo onNextStep={handleNextStep} address={address} />;
      case 2:
        return <ExecutorandBeneficiaries onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} address={address} />;
      case 3:
        return <Assets onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} address={address} />;
      case 4:
        return <Payment onPreviousStep={handlePreviousStep} address={address} />;
      default:
        return null;
    }
  };

  return (
    <div className="will-creation-page">
      <h1>Will Creation</h1>
      {renderStep()}
    </div>
  );
};

export default WillCreationPage;
