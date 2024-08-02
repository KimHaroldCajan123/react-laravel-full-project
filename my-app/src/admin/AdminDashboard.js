import axios from "axios";
import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPalette,
  FaStar,
  FaTag,
  FaTags,
  FaUserFriends,
} from "react-icons/fa";
import RevenueReportChart from "./RevenueReportChart ";
import StatusReports from "./StatusReports";
import myApi from "../api";
import swal from "sweetalert";
import Ratings from "./Ratings";
import ArtistRevenue from "./ArtistRevenue";
const AdminDashboard = () => {
  const [countArtist, setCountArtist] = useState(0);

  const [countDesign, setCountDesign] = useState(0);
  const [countCategory, setCountCategory] = useState(0);
  const [countBooking, setCountBooking] = useState(0);
  const [countReview, setCountReview] = useState(0);
  const [countGuest, setCountGuest] = useState(0);
  const [countCustomer, setCountCustomer] = useState(0);

  useEffect(() => {
    const countAllArtist = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get-artist"
        );
        const artistCount = response.data.artist.length;
        setCountArtist(artistCount);
      } catch (error) {
        console.log(error);
      }
    };
    countAllArtist();
  }, []);

  useEffect(() => {
    const countAllTattoo = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/view-tattoo"
        );
        setCountDesign(response.data.tattoo.length);
      } catch (error) {
        console.log(error);
      }
    };
    countAllTattoo();
  }, []);

  useEffect(() => {
    const countAllCategory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/show-category"
        );
        setCountCategory(response.data.category.length);
      } catch (error) {
        console.log(error);
      }
    };
    countAllCategory();
  }, []);

  useEffect(() => {
    const countAllBooking = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/count-booking"
        );
        setCountBooking(response.data.count.length);
      } catch (error) {
        console.log(error);
      }
    };

    countAllBooking();
  }, []);
  useEffect(() => {
    const countAllReviews = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/count-review"
        );
        setCountReview(response.data.reviews.length);
      } catch (error) {
        console.log(error);
      }
    };
    countAllReviews();
  }, []);

  useEffect(() => {
    const countAllGuest = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/customerlist"
        );
        if (response.status === 200) {
          setCountCustomer(response.data.customerlist.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    countAllGuest();
  }, []);

  useEffect(() => {
    const countAllGuest = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/guestlist");
        if (response.status === 200) {
          setCountGuest(response.data.guestlist.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    countAllGuest();
  }, []);
  return (
    <div className="container custom-scrollbar overflow-y-auto bg-gray-200 scroll-smooth">
      <div className="flex flex-col gap-10 h-screen w-full">
        <div className="flex flex-wrap  shadow-md items-center justify-center p-2 gap-2">
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaUserFriends size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              artists
            </h1>

            <p className=" text-xl text-white font-semibold ">{countArtist}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaPalette size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              tattoo design
            </h1>
            <p className=" text-xl text-white font-semibold ">{countDesign}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaTags size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              categories
            </h1>
            <p className=" text-xl text-white font-semibold ">
              {countCategory}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaCalendarAlt size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              bookings
            </h1>
            <p className=" text-xl text-white font-semibold ">{countBooking}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaStar size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              reviews
            </h1>
            <p className=" text-xl text-white font-semibold ">{countReview}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaUserFriends size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              customers
            </h1>
            <p className=" text-xl text-white font-semibold ">
              {countCustomer}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-60 h-36 bg-gray-900 rounded shadow-md">
            <FaUserFriends size={50} className="text-white" />
            <h1 className="text-lg capitalize font-semibold text-white">
              guest customers
            </h1>
            <p className=" text-xl text-white font-semibold ">{countGuest}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 shadow-md p-4">
          <RevenueReportChart />
          <StatusReports />
        </div>
        <div className="flex items-center justify-between gap-2 h-auto p-4">
          <Ratings />
          <ArtistRevenue />
        </div>
        <div>
          <p>loremsad</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
