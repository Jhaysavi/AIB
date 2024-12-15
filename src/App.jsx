import React, { useState, useEffect } from "react";
import LicenseForm from "./components/LicenseForm";
import LicenseViewer from "./components/LicenseViewer";
import useOnlineStatus from "./hooks/useOnlineStatus";
import { validateLicenseData } from "./utils/grokApi";
import { downloadLicensePDF } from "./utils/downloadPDF";
import "./styles/App.css";

const AIBApp = () => {
  const [formData, setFormData] = useState({
    licenseType: "",
    name: "",
    idNumber: "",
  });
  const [license, setLicense] = useState(null);
  const isOnline = useOnlineStatus();
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const synchronizeData = () => {
      if (isOnline) {
        const storedLicenses = JSON.parse(localStorage.getItem("licenses") || "[]");
        storedLicenses.forEach(async (localLicense) => {
          try {
            const validatedLicense = await validateLicenseData(localLicense);
            if (validatedLicense) {
              setLicense(validatedLicense);
              console.log("License synchronized:", validatedLicense);
            }
          } catch (error) {
            console.error("Error synchronizing license:", error.message);
          }
        });
      }
    };
    synchronizeData();
  }, [isOnline]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateLicense = async () => {
    setValidationError("");
    const generatedLicense = {
      ...formData,
      issuedAt: new Date().toLocaleString(),
      qrCodeData: `${formData.licenseType}-${formData.name}-${formData.idNumber}`,
    };

    if (isOnline) {
      try {
        const validatedLicense = await validateLicenseData(generatedLicense);
        setLicense(validatedLicense);
        saveLicenseLocally(validatedLicense);
      } catch (error) {
        setValidationError("Validation failed. Please check your data.");
      }
    } else {
      setLicense(generatedLicense);
      saveLicenseLocally(generatedLicense);
    }
  };

  const saveLicenseLocally = (licenseData) => {
    const storedLicenses = JSON.parse(localStorage.getItem("licenses") || "[]");
    localStorage.setItem("licenses", JSON.stringify([...storedLicenses, licenseData]));
  };

  const handleDownloadPDF = () => {
    if (license) {
      downloadLicensePDF(license);
    } else {
      alert("No license data available to download.");
    }
  };

  return (
    <div className="app-container">
      <h1>AIB - Automated License System</h1>
      <LicenseForm
        formData={formData}
        handleInputChange={handleInputChange}
        generateLicense={generateLicense}
      />
      {license && (
        <LicenseViewer license={license} downloadPDF={handleDownloadPDF} />
      )}
      {validationError && <p className="error-message">{validationError}</p>}
      <div className="status-container">
        <p>
          Status: <strong>{isOnline ? "Online" : "Offline"}</strong>
        </p>
      </div>
    </div>
  );
};

export default AIBApp;
