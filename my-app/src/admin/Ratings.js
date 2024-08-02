import axios from "axios";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Ratings = () => {
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    const getAllRatings = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/rating-reports"
        );
        if (response.status === 200) {
          const { ratings1, ratings2, ratings3, ratings4, ratings5 } =
            response.data;
          setRatings([ratings1, ratings2, ratings3, ratings4, ratings5]);
        }
      } catch (error) {
        console.error("Error fetching ratings data:", error);
      }
    };
    getAllRatings();
  }, []);

  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Ratings Distribution",
        data: ratings,
        backgroundColor: ["red", "orange", "blue", "green", "yellow"],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Ratings Reviews Chart",
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
    <div className="shadow-sm shadow-slate-400 rounded-sm border-2 w-96 ">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Ratings;
