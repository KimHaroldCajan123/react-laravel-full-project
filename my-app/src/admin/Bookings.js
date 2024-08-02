import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaEye, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const Bookings = () => {
  const [displayBookings, setDisplayBookings] = useState([]);
  const [searchBooking, setSearchBooking] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(false);
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    getAllBookings();
  }, []);
  const getAllBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/all-booking");
      if (response.status === 200) {
        setDisplayBookings(response.data.booking);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSort = (e) => {
    setSortBy(e.target.value);
  };
  const handleBookingAsc = (e) => {
    setSortDirection(e.target.value);
  };
  const filterBooking = displayBookings.filter(
    (value) =>
      (value.customers.name &&
        value.customers.name
          .toLowerCase()
          .includes(searchBooking.toLocaleLowerCase())) ||
      (value.artists.name &&
        value.artists.name
          .toLowerCase()
          .includes(searchBooking.toLocaleLowerCase())) ||
      (value.Quantity !== undefined &&
        String(value.Quantity)
          .toLowerCase()
          .includes(searchBooking.toLocaleLowerCase()))
  );

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const BookingSort = [...filterBooking].sort((a, b) => {
    const aValue = getNestedValue(a, sortBy) || "";
    const bValue = getNestedValue(b, sortBy) || "";

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  const handleBookingDoneAction = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/action-booking/${id}`,
        { action: "done" },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        swal("Success", response.data.message, "success");
        await getAllBookings();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBookingCancelAction = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/action-booking/${id}`,
        { action: "cancel" },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        swal("Success", response.data.message, "success");
        await getAllBookings();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container flex flex-col relative gap-5">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          booking
        </header>
      </div>
      <div className="overflow-auto scrollbar custom-scrollbar shadow-lg w-full h-4/5 max-h-96 relative">
        <div className="bg-gray-900 p-5 border-b-2 flex sticky-0 top-0 flex-col gap-3">
          <div className="bg-gray-900 flex items-center justify-between">
            <h1 className="text-white p-5 text-lg font-semibold uppercase border-b-2">
              booking list
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchBooking}
              onChange={(e) => setSearchBooking(e.target.value)}
              className="p-2 mt-2 text-base font-semibold w-64 rounded-sm border-2 outline-orange-500 placeholder:capitalize"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="sortBy"
              className="text-lg text-white capitalize font-semibold"
            >
              sortBy:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleBookingSort}
              className="p-1 outline-none capitalize font-semibold"
            >
              <option value="customers.name">Customer Name</option>
              <option value="artists.name">Artist Name</option>
              <option value="date">date</option>
              <option value="time">time</option>
              <option value="Quantity">Quantity</option>
            </select>
            <label
              htmlFor="sortDirection"
              className="text-lg text-white font-semibold rounded-sm"
            >
              Direction:
            </label>
            <select
              id="sortDirection"
              value={sortDirection}
              onChange={handleBookingAsc}
              className="p-1 outline-none capitalize font-semibold rounded-sm"
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        </div>
        <table className=" w-full">
          <thead className="bg-gray-900">
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              id
            </th>
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              customer
            </th>
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              artist
            </th>
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              start date
            </th>
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              start time
            </th>
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              quantity
            </th>
            <th className="p-3 text-lg border font-semibold capitalize text-white">
              booking created
            </th>

            <th className="p-3 text-lg borderfont-semibold capitalize text-white">
              more details
            </th>
            <th className="p-3 text-lg borderfont-semibold capitalize text-white">
              mark as
            </th>
          </thead>
          {loading ? (
            <td colSpan="9" className="text-center p-3">
              <div className="flex items-center justify-center h-full">
                <h1 className="text-3xl font-bold capitalize">Loading...</h1>
              </div>
            </td>
          ) : (
            <tbody>
              {BookingSort.map((value) => (
                <tr key={value.booking_id}>
                  <td className="p-3 border text-base font-semibold">
                    {value.booking_id}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    {value.customers.name}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    {value.artists.name}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    {value.date}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    {value.time}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    {value.Quantity}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    {formatDate(value.created_at)}
                  </td>
                  <td className="p-3 border text-base font-semibold">
                    <Link to={`/admin/details/${value.booking_id}`}>
                      <FaEye className=" w-6 h-8 text-center text-blue-800 m-auto" />
                    </Link>
                  </td>
                  <td className="p-4 border text-base font-semibold flex items-center justify-center gap-4">
                    {value.action === "done" ? (
                      <FaCheck className="text-green-600 w-6 h-6" />
                    ) : value.action === "cancel" ? (
                      <FaTimesCircle className="text-red-600 w-6 h-6" />
                    ) : (
                      <>
                        <button
                          className="capitalize text-base font-semibold bg-green-600 px-3 py-2 text-white rounded-sm"
                          onClick={() =>
                            handleBookingDoneAction(value.booking_id)
                          }
                        >
                          done
                        </button>
                        <button
                          className="capitalize text-base font-semibold bg-red-600 px-3 py-2 text-white rounded-sm"
                          onClick={() =>
                            handleBookingCancelAction(value.booking_id)
                          }
                        >
                          cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Bookings;
