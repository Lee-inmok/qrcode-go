import React from "react";
import { useLocation } from "react-router-dom";

const Client: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const qrname = query.get("qrname");
  const qrtime = query.get("qrtime");

  return (
      <div>
        <h1>QR Data</h1>
        <p>first value: {qrname}</p>
        <p>second value: {qrtime}</p>
      </div>
  );
};

export default Client;
