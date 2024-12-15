import jsPDF from "jspdf";

export const downloadLicensePDF = (license) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("AIB - License Details", 10, 10);

  doc.setFontSize(12);
  doc.text(`License Type: ${license.licenseType}`, 10, 30);
  doc.text(`Name: ${license.name}`, 10, 40);
  doc.text(`ID Number: ${license.idNumber}`, 10, 50);
  doc.text(`Issued At: ${license.issuedAt}`, 10, 60);

  doc.save(`${license.name}_license.pdf`);
};
