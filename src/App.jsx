import React, { useState } from "react";
import LicenseForm from "./components/LicenseForm";
import LicenseViewer from "./components/LicenseViewer";
import useOnlineStatus from "./hooks/useOnlineStatus";
import "./styles/App.css";

const AIBApp = () => {
  const [formData, setFormData] = useState({
    licenseType: "",
    name: "",
    idNumber: "",
  });
  const [license, setLicense] = useState(null);
  const isOnline = useOnlineStatus();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateLicense = () => {
    const generatedLicense = {
      ...formData,
      issuedAt: new Date().toLocaleString(),
      qrCodeData: `${formData.licenseType}-${formData.name}-${formData.idNumber}`,
    };
    setLicense(generatedLicense);
    saveLicenseLocally(generatedLicense);
  };

  const saveLicenseLocally = (licenseData) => {
    const storedLicenses = JSON.parse(localStorage.getItem("licenses") || "[]");
    localStorage.setItem("licenses", JSON.stringify([...storedLicenses, licenseData]));
  };

  return (
    <div className="app-container">
      <h1>AIB - Automated License System</h1>
      <LicenseForm
        formData={formData}
        handleInputChange={handleInputChange}
        generateLicense={generateLicense}
      />
      {license && <LicenseViewer license={license} />}
      <div className="status-container">
        <p>
          Status: <strong>{isOnline ? "Online" : "Offline"}</strong>
        </p>
      </div>
    </div>
  );
};

export default AIBApp;
