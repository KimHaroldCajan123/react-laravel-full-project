import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/booking/${id}`
        );
        if (response.status === 200) {
          setBookingDetails(response.data.bookings[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!bookingDetails) {
        setLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [bookingDetails]);

  const backToDetails = () => {
    navigate("/admin/booking");
  };
  if (loading) {
    return (
      <div className="container flex items-center justify-center">
        <h1 className="text-5xl font-semibold ">loading...</h1>
      </div>
    );
  }
  if (bookingDetails == null) {
    return (
      <div className="container flex items-center flex-col gap-10 justify-center">
        <h1 className="text-5xl font-semibold ">
          No booking details available
        </h1>
        <button
          className="bg-gray-900 text-white p-5 font-semibold text-base rounded-md capitalize shadow-md transition-transform hover:scale-75 shadow-slate-500"
          onClick={() => backToDetails()}
        >
          back to bookings
        </button>
      </div>
    );
  }

  const { tattoos, guestcustomers, bookings, status, payment_methods, amount } =
    bookingDetails;

  return (
    <div className="container flex flex-col gap-5 overflow-auto custom-scrollbar">
      <div className="sticky top-0 flex flex-col ">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          Booking Details
        </header>
      </div>

      <div className=" flex p-2 justify-around gap-4">
        <div className="w-2/3">
          <h1 className="p-5 bg-gray-900 text-white font-semibold text-2xl uppercase">
            Tattoo Details
          </h1>
          <table className="table-fixed w-full mb-6 shadow-lg shadow-slate-400">
            <thead className="bg-gray-900">
              <tr>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  ID
                </th>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  Name
                </th>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  Image
                </th>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  Description
                </th>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  Price
                </th>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  Created At
                </th>
                <th className="p-3 text-lg font-semibold capitalize text-white">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-base font-semibold">
                  {tattoos.tattoo_id}
                </td>
                <td className="p-3 border text-base font-semibold capitalize">
                  {tattoos.name}
                </td>
                <td className="p-3 border text-base font-semibold capitalize">
                  <img
                    src={`http://127.0.0.1:8000/${tattoos.image}`}
                    alt={tattoos.name}
                    className="w-20 h-14 object-cover m-auto"
                  />
                </td>
                <td className="p-3 border text-base font-semibold capitalize">
                  {tattoos.description}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {tattoos.price}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {formatDate(tattoos.created_at)}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {formatDate(tattoos.updated_at)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/3 shadow-lg shadow-slate-400">
          <h1 className="uppercase text-white text-center p-5 bg-gray-900 text-2xl font-semibold">
            Payment Info
          </h1>
          <div className="flex items-center gap-3 p-3 shadow-md">
            <span className="text-lg capitalize font-semibold">Status:</span>
            <h2 className="text-md capitalize font-semibold underline">
              {status}
            </h2>
            {status === "confirmed" && (
              <FaDotCircle className="text-green-500 w-2 h-2 text-center bg-green-500 rounded-lg" />
            )}
            {status === "cancelled" && (
              <FaDotCircle className="text-red-500 w-2 h-2 text-center bg-red-500 rounded-lg" />
            )}
          </div>
          <div className="p-3 flex items-center gap-3 shadow-md">
            <span className="text-lg capitalize font-semibold">
              Payment Methods:
            </span>
            <h2 className="text-md capitalize font-semibold underline">
              {payment_methods}
            </h2>
          </div>
          <div className="p-3 flex items-center gap-3 shadow-md">
            <span className="text-lg capitalize font-semibold">Quantity:</span>
            <h2 className="text-md capitalize font-semibold underline">
              {bookings.Quantity}
            </h2>
          </div>
          <div className="p-3 flex items-center gap-3 shadow-md">
            <span className="text-lg capitalize font-semibold">
              Total Amount:
            </span>
            <h2 className="text-md capitalize font-semibold">
              {formatAmount(amount)}
            </h2>
          </div>
        </div>
      </div>
      <div className=" p-5 mb-6">
        <h1 className="p-5 bg-gray-900 text-white font-semibold text-2xl uppercase">
          Guest Details
        </h1>
        <table className="table-fixed w-full mb-6 shadow-lg shadow-slate-400">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-3 text-lg font-semibold capitalize text-white">
                Name
              </th>
              <th className="p-3 text-lg font-semibold capitalize text-white">
                Email
              </th>
              <th className="p-3 text-lg font-semibold capitalize text-white">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border text-base font-semibold">
                {guestcustomers.Name}
              </td>
              <td className="p-3 border text-base font-semibold">
                {guestcustomers.Email}
              </td>
              <td className="p-3 border text-base font-semibold">
                {guestcustomers.phone}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetails;
