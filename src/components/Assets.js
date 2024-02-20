import React, { useState } from 'react';

const Assets = ({ onNextStep, onPreviousStep }) => {
  const [assetList, setAssetList] = useState([]);
  const [newAsset, setNewAsset] = useState({ name: '', value: '' });

  const handleAddAsset = () => {
    setAssetList((prevAssets) => [...prevAssets, newAsset]);
    setNewAsset({ name: '', value: '' });
  };

  const handleRemoveAsset = (index) => {
    setAssetList((prevAssets) => {
      const updatedAssets = [...prevAssets];
      updatedAssets.splice(index, 1);
      return updatedAssets;
    });
  };

  const handleNext = () => {
    // Validate if there are assets added
    if (assetList.length > 0) {
      onNextStep();
    } else {
      alert('Please add at least one asset.');
    }
  };

  const handlePrevious = () => {
    onPreviousStep();
  };

  return (
    <div>
      <h2>Assets</h2>

      <div>
        {assetList.map((asset, index) => (
          <div key={index}>
            <span>{`Asset Name: ${asset.name}, Value: ${asset.value}`}</span>
            <button onClick={() => handleRemoveAsset(index)}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Add New Asset</h3>
        <label>
          Asset Name:
          <input
            type="text"
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
          />
        </label>
        <label>
          Asset Value:
          <input
            type="text"
            value={newAsset.value}
            onChange={(e) => setNewAsset({ ...newAsset, value: e.target.value })}
          />
        </label>
        <button onClick={handleAddAsset}>Add Asset</button>
      </div>

      <div className="button-container">
        <button onClick={handlePrevious} className="back-button">
          Back
        </button>
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Assets;
