import React, { useState } from "react";
import { validateLicenseData } from "../utils/grokApi";

const LicenseForm = ({ generateLicense }) => {
  const [formData, setFormData] = useState({
    licenseType: "",
    name: "",
    idNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate the license data
      const validationResponse = await validateLicenseData(formData);
      const aiMessage = validationResponse.content;
      setValidationMessage(aiMessage);

      // Optional: Generate license or take further action
      if (generateLicense) generateLicense();
    } catch (error) {
      setValidationMessage("Error validating license. Please try again.");
      console.error("Validation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="license-form">
      <div className="input-group">
        <label>License Type:</label>
        <input
          type="text"
          name="licenseType"
          value={formData.licenseType}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label>ID Number:</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Validating..." : "Submit"}
      </button>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
    </form>
  );
};

export default LicenseForm;
