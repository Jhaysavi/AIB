import React from "react";
import "./../styles/LicenseForm.css";

const LicenseForm = ({ formData, handleInputChange, generateLicense }) => {
  return (
    <div className="license-form">
      <h2>License Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          License Type:
          <input
            type="text"
            name="licenseType"
            value={formData.licenseType}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          ID Number:
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="button" onClick={generateLicense}>
          Generate License
        </button>
      </form>
    </div>
  );
};

export default LicenseForm;
