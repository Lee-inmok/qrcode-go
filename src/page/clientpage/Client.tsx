import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Button } from "@aws-amplify/ui-react";
import axios from "axios";

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

  const workstart = async () => {
    try {
      const response = await axios.post(
        `https://jlfxm6r10g.execute-api.us-east-1.amazonaws.com/dev/worker?QRUUID=018f4bea-5271-4dbb-a1e7-1a148c921543&name=LEE INMOK&hhmmss=145300&yymmdd=240627&state=1`
      );

      console.log("Post request successful", response.data);
    } catch (error) {
      console.error("Error while making POST request:", error);
    }
  };
  const workoff = () => {
    console.log("退勤");
  };
  const goout = () => {
    console.log("外出");
  };
  const returnwork = () => {
    console.log("復帰");
  };

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
      <Button onClick={workstart}>出勤</Button>
      <Button onClick={workoff}>退勤</Button>
      <Button onClick={goout}>外出</Button>
      <Button onClick={returnwork}>復帰</Button>
    </div>
  );
};

export default Client;
