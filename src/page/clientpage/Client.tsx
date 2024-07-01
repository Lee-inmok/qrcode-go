import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import axios from "axios";
import { AllBox, MiddleBox, ShotBox } from "./styled";
import { Button } from "@mui/material";

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

  const workstart = async () => {
    if (!userAttributes || !data) {
      return;
    }
    try {
      const response = await axios.post(
        `https://wmz5myrws3.execute-api.us-east-1.amazonaws.com/get-user-data?PostID=${data[0].UU_ID}&name=${userAttributes.name}&hhmmss=${data[0].hhmmss}&yymmdd=${data[0].yymmdd}&state=1`
      );
      console.log("Post request successful", response.data);
    } catch (error) {
      console.error("Error while making POST request:", error);
    }
  };
  const workoff = async () => {
    if (!userAttributes || !data) {
      return;
    }
    try {
      const response = await axios.post(
        `https://wmz5myrws3.execute-api.us-east-1.amazonaws.com/get-user-data?PostID=${data[0].UU_ID}&name=${userAttributes.name}&hhmmss=${data[0].hhmmss}&yymmdd=${data[0].yymmdd}&state=2`
      );
      console.log("Post request successful", response.data);
    } catch (error) {
      console.error("Error while making POST request:", error);
    }
  };
  const goout = async () => {
    if (!userAttributes || !data) {
      return;
    }
    try {
      const response = await axios.post(
        `https://wmz5myrws3.execute-api.us-east-1.amazonaws.com/get-user-data?PostID=${data[0].UU_ID}&name=${userAttributes.name}&hhmmss=${data[0].hhmmss}&yymmdd=${data[0].yymmdd}&state=3`
      );
      console.log("Post request successful", response.data);
    } catch (error) {
      console.error("Error while making POST request:", error);
    }
  };
  const returnwork = async () => {
    if (!userAttributes || !data) {
      return;
    }
    try {
      const response = await axios.post(
        `https://wmz5myrws3.execute-api.us-east-1.amazonaws.com/get-user-data?PostID=${data[0].UU_ID}&name=${userAttributes.name}&hhmmss=${data[0].hhmmss}&yymmdd=${data[0].yymmdd}&state=4`
      );
      console.log("Post request successful", response.data);
    } catch (error) {
      console.error("Error while making POST request:", error);
    }
  };

  return (
    <AllBox>
      <h1>QR Data</h1>
      <MiddleBox>
        <ShotBox>
          <Button variant="contained" onClick={workstart}>
            出勤
          </Button>
        </ShotBox>
        <ShotBox>
          <Button variant="contained" onClick={workoff}>
            退勤
          </Button>
        </ShotBox>
      </MiddleBox>
      <MiddleBox>
        <ShotBox>
          <Button variant="contained" onClick={goout}>
            外出
          </Button>
        </ShotBox>
        <ShotBox>
          <Button variant="contained" onClick={returnwork}>
            復帰
          </Button>
        </ShotBox>
      </MiddleBox>
    </AllBox>
  );
};

export default Client;
