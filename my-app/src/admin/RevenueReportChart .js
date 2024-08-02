import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const RevenueReportChart = () => {
  const [timeframe, setTimeframe] = useState("week");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Revenue",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    fetchReportData();
  }, [timeframe]);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/revenue-reports/${timeframe}`
      );
      const revenueData = response.data.revenueData;

      const labels = revenueData.map((data) => data.date);
      const revenues = revenueData.map((data) => parseFloat(data.revenue));
      const totalRevenue = revenues.reduce((sum, revenue) => sum + revenue, 0);
      setTotalRevenue(totalRevenue);

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Revenue",
            data: revenues,
            backgroundColor: "rgba(75, 192, 192, 0.8)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className=" h-full w-2/3 p-5 shadow-sm rounded-sm shadow-slate-400 gap-2 flex flex-col justify-center items-center border-2">
      <h1 className="text-xl font-bold mb-4">
        Total Revenue for{" "}
        {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}: $
        {totalRevenue.toFixed(2)}
      </h1>
      <form className="p-2">
        <label htmlFor="timeframe">Select Timeframe:</label>
        <select
          name="timeframe"
          id="timeframe"
          value={timeframe}
          onChange={handleTimeframeChange}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </form>
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                font: {
                  family: "serif",
                  size: 20,
                  weight: "bold",
                },
                color: "black",
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RevenueReportChart;
