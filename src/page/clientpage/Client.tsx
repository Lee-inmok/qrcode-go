import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Client: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const getqrdata = query.get("getqrdata");

  useEffect(() => {
    console.log(getqrdata)
  },[getqrdata])

  return (
      <div>
        <h1>QR Data</h1>
        <p>first value: {getqrdata}</p>
      </div>
  );
};

export default Client;
