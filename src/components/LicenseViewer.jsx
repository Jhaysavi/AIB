import { downloadLicensePDF } from "../utils/downloadPDF";
import "../styles/LicenseViewer.css";

const LicenseViewer = ({ license }) => {
  return (
    <div className="viewer-container">
      <h2>License Details</h2>
      <p>Type: {license.licenseType}</p>
      <p>Name: {license.name}</p>
      <p>ID: {license.idNumber}</p>
      <p>Issued At: {license.issuedAt}</p>
      {license.validationMessage && (
        <p className="validation-message">
          Validation Result: {license.validationMessage}
        </p>
      )}
      <button onClick={() => downloadLicensePDF(license)}>Download PDF</button>
    </div>
  );
};

export default LicenseViewer;
