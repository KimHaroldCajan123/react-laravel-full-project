import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const StatusReports = () => {
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/report-status"
      );
      if (response.status === 200) {
        setCancelledCount(response.data.cancelled);
        setConfirmedCount(response.data.confirmed);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const data = {
    labels: ["Cancelled", "Confirmed"],
    datasets: [
      {
        label: "Booking Status",
        data: [cancelledCount, confirmedCount],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Booking Status Chart",
        color: "black",
        font: {
          family: "serif",
          size: 20,
          weight: "bold",
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className=" shadow-sm shadow-slate-400 flex items-center rounded-sm border-2 w-96">
      <Pie data={data} options={options} />
    </div>
  );
};

export default StatusReports;
