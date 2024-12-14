import React from "react";
import "./../styles/LicenseViewer.css";

const LicenseViewer = ({ license }) => {
  return (
    <div className="license-viewer">
      <h2>Generated License</h2>
      <p><strong>License Type:</strong> {license.licenseType}</p>
      <p><strong>Name:</strong> {license.name}</p>
      <p><strong>ID Number:</strong> {license.idNumber}</p>
      <p><strong>Issued At:</strong> {license.issuedAt}</p>
      <p><strong>QR Code Data:</strong> {license.qrCodeData}</p>
    </div>
  );
};

export default LicenseViewer;
