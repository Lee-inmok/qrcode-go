import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";

interface userdata {
  birthdate: string | undefined;
  email: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  sub: string | undefined;
}

const Client: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const getqrdata = query.get("getqrdata");
  const data = getqrdata ? JSON.parse(getqrdata) : null;
  const [userAttributes, setUserAttributes] = useState<userdata>();

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
        const userData: userdata = {
          birthdate: attributes.birthdate,
          email: attributes.email,
          name: attributes.name,
          nickname: attributes.nickname,
          sub: attributes.sub,
        };
        setUserAttributes(userData);
      } catch (error) {
        console.log("Error fetching user attributes:", error);
      }
    };
    fetchAttributes();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(userAttributes);
  }, [userAttributes]);

  return (
    <div>
      <h1>QR Data</h1>
      {data.map(
        (getdata: { UU_ID: string; hhmmss: string; yymmdd: string }) => (
          <div>
            {getdata.UU_ID}
            <br></br>
            {getdata.hhmmss}
            <br></br>
            {getdata.yymmdd}
          </div>
        )
      )}
      {userAttributes ? (
        <div>
          <p>Birthdate: {userAttributes.birthdate}</p>
          <p>Email: {userAttributes.email}</p>
          <p>Name: {userAttributes.name}</p>
          <p>Nickname: {userAttributes.nickname}</p>
          <p>Sub: {userAttributes.sub}</p>
        </div>
      ) : (
        <p>Loading user attributes...</p>
      )}
    </div>
  );
};

export default Client;
