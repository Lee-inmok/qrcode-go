import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { AllBox, MiddleBox, ShotBox } from "./styled";
import axios from "axios";

interface QRData {
  getqrdata: string;
  qrclient: string;
}

const Host: React.FC = () => {
  const [timer, setTimer] = useState("00:00:00");
  const [days, setDays] = useState("");
  const [qrdata, setQrdata] = useState<QRData>({
    getqrdata: "",
    // qrclient: "http://qrcode-go.s3-website-us-east-1.amazonaws.com/#/client",
    qrclient: "http://localhost:3000/#/client",
  });

  const currentTimer = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const fullYear = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    setTimer(`${hours}:${minutes}:${seconds}`);
    setDays(`${fullYear}年${month}月${day}日`);
  };

  useEffect(() => {
    const intervalId = setInterval(currentTimer, 1000);
    qrcodedataget();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer.endsWith("00")) {
      qrcodedataget();
    }
  }, [timer]);

  useEffect(() => {
    console.log(qrdata);
  }, [qrdata]);

  const qrcodedataget = async () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const fullYear = String(date.getFullYear()).slice(-2);
    const days = fullYear + month + day;
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours}${minutes}00`);
    try {
      const response = await axios.get(
        "https://h6mgailhtf.execute-api.us-east-1.amazonaws.com/qrcord-get",
        {
          headers: {
            hhmmss: timer,
            yymmdd: days,
          },
        }
      );
      setQrdata((prev) => ({
        ...prev,
        getqrdata: response.data.items,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const generateQrCodeValue = () => {
    const { qrclient, getqrdata } = qrdata;
    const getqrdataString = JSON.stringify(getqrdata);
    return `${qrclient}?getqrdata=${getqrdataString}`;
  };

  return (
    <>
      <AllBox>
        <MiddleBox>
          <QRCode value={generateQrCodeValue()} />
          <ShotBox>
            <h1>{days}</h1>
            <h1>{timer}</h1>
          </ShotBox>
        </MiddleBox>
        <br />
      </AllBox>
    </>
  );
};

export default Host;
