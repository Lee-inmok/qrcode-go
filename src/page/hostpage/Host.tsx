import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { AllBox, MiddleBox, ShotBox } from "./styled";
import { v4 as uuidv4 } from "uuid";

interface QRData {
  qrname: string;
  qrtime: string;
  qrclient: string;
}

const Host: React.FC = () => {
  const id = uuidv4();
  const [timer, setTimer] = useState("00:00:00");
  const [days, setDays] = useState("");
  const [qrdata, setQrdata] = useState<QRData>({
    qrname: "",
    qrtime: "",
    qrclient: "http://qrcode-go.s3-website-us-east-1.amazonaws.com/#/client",
  });

  const currentTimer = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const Week = String(date.getDay());
    const fullYear = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    setTimer(`${hours}:${minutes}:${seconds}`);
    setDays(`${fullYear}年${month}月${day}日`);
  };

  useEffect(() => {
    const intervalId = setInterval(currentTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours}:${minutes}:00`);
    setQrdata((prev) => ({
      ...prev,
      qrtime: timer,
      qrname: id,
    }));
  }, [days]);

  useEffect(() => {
    if (timer.endsWith("00")) {
      setQrdata((prev) => ({
        ...prev,
        qrtime: timer,
        qrname: id,
      }));
    }
  }, [timer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQrdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateQrCodeValue = () => {
    const { qrclient, qrname, qrtime } = qrdata;
    return `${qrclient}?qrname=${encodeURIComponent(
      qrname
    )}&qrtime=${encodeURIComponent(qrtime)}`;
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
        <div>
          first value:
          <input
            name="qrname"
            value={qrdata.qrname}
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </AllBox>
    </>
  );
};

export default Host;
