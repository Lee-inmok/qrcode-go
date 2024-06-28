import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { fetchUserAttributes } from "aws-amplify/auth";

import "react-datepicker/dist/react-datepicker.css";

interface WorkerData {
  R_UU_ID: string;
  UU_ID: string;
  hhmmss: string;
  state: string;
  submittime: string;
  worker_name: string;
  yymmdd: string;
}

interface userdata {
  birthdate: string | undefined;
  email: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  sub: string | undefined;
}

const Userworkcheck: React.FC = () => {
  const [userAttributes, setUserAttributes] = useState<userdata | null>(null);
  const [data, setData] = useState<WorkerData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const getWorkerData = async () => {
      if (userAttributes?.name) {
        try {
          const response = await axios.get(
            "https://jlfxm6r10g.execute-api.us-east-1.amazonaws.com/dev/worker",
            {
              headers: {
                worker_name: userAttributes.name,
              },
            }
          );
          setData(response.data.body.item);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getWorkerData();
  }, [userAttributes]);

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

  const formatDateToYYMMDD = (date: Date | null): string => {
    if (!date) return "";
    const yy = date.getFullYear().toString().slice(-2);
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yy}${mm}${dd}`;
  };

  const filteredData = data.filter(
    (item) => item.yymmdd === formatDateToYYMMDD(startDate)
  );

  return (
    <>
      <div>
        <DatePicker
          dateFormat="yyMMdd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        {filteredData.map((data) => (
          <div>
            <div key={data.UU_ID}>{data.worker_name}</div>
            <div>{data.yymmdd}</div>
            <div>{data.hhmmss}</div>
            <div>{data.state}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Userworkcheck;
