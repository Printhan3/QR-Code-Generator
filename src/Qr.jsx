import React, { useState } from 'react';

export const Qr = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://www.youtube.com/");
  const [qrSize, setQrSize] = useState("150");

  function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png"; // Corrected attribute name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="app-container">
      <h1 className="title">QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className="qr-code" alt="QR Code" />}

      <div>
        <label htmlFor="dataInput" className="input-label">Data for QR Code</label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter Data for QR Code" onChange={(e) => setQrData(e.target.value)} />
        <label htmlFor="SizeInput" className="input-label">Image size</label>
        <input type="text" value={qrSize} id="SizeInput" placeholder="Enter Image size" onChange={(e) => setQrSize(e.target.value)} />
        <button className="button generate" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="button download" onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  );
}

