import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const ArtistRevenue = () => {
  const [artistsRevenue, setArtistsRevenue] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("day");
  const [artists, setArtists] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistRevenue = async () => {
      try {
        if (!selectedArtist) {
          // If no artist is selected, set revenue data to empty
          setArtistsRevenue([]);
          setTotalRevenue(0);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/artist-revenue/${selectedArtist}?timeframe=${selectedFilter}`
        );
        setArtistsRevenue(response.data.artistRevenue);
        const total = response.data.artistRevenue.reduce(
          (acc, curr) => acc + parseFloat(curr.revenue),
          0
        );
        setTotalRevenue(total);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchArtistRevenue();
  }, [selectedArtist, selectedFilter]);

  useEffect(() => {
    const fetchAllArtists = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get-artist"
        );
        if (response.status === 200) {
          setArtists(response.data.artist);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchAllArtists();
  }, []);

  const handleArtistSelect = (artistId) => {
    setSelectedArtist(artistId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full w-2/3 flex flex-col shadow-md shadow-slate-400 gap-5 p-2">
      <h1 className="text-xl font-bold capitalize text-center">
        Revenue per artist total: ${parseFloat(totalRevenue).toFixed(2)}
      </h1>
      <div className="flex items-center gap-5">
        <div>
          <label htmlFor="artist" className="text-md font-semibold p-2">
            Select Artist:
          </label>
          <select
            id="artist"
            value={selectedArtist}
            className="text-base font-semibold rounded-sm shadow-sm"
            onChange={(e) => handleArtistSelect(e.target.value)}
          >
            <option value="">Select an artist</option>
            {artists.map((artist) => (
              <option key={artist.artists_id} value={artist.artists_id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter" className="text-md font-semibold p-2">
            Filter by:
          </label>
          <select
            id="filter"
            value={selectedFilter}
            className="text-base font-semibold rounded-sm shadow-sm"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <Bar
        data={{
          labels: artistsRevenue.map((artist) => artist.name),
          datasets: [
            {
              label: " Artist Revenue",
              data: artistsRevenue.map((artist) => parseFloat(artist.revenue)),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Revenue",
              },
            },
            x: {
              title: {
                display: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ArtistRevenue;
