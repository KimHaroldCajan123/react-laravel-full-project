import axios from "axios";
import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchReviews, setSearchReviews] = useState("");
  const [sortBy, setSortBy] = useState("Ratings");
  const [sortDirection, setSortDirection] = useState("asc");
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    const displayAllReview = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/all-reviews"
        );
        if (response.status === 200) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.log(error);
      }
    };
    displayAllReview();
  }, []);

  const filterReviews = reviews.filter(
    (value) =>
      (value.comment &&
        value.comment
          .toLowerCase()
          .includes(searchReviews.toLocaleLowerCase())) ||
      (value.ratings &&
        String(value.ratings)
          .toLowerCase()
          .includes(searchReviews.toLocaleLowerCase())) ||
      (value.customers.name &&
        value.customers.name
          .toLowerCase()
          .includes(searchReviews.toLocaleLowerCase())) ||
      (value.bookings.Quantity &&
        String(value.bookings.Quantity)
          .toLowerCase()
          .includes(searchReviews.toLocaleLowerCase()))
  );
  const handleSortReviews = (e) => {
    setSortBy(e.target.value);
  };
  const handleAscReviews = (e) => {
    setSortDirection(e.target.value);
  };
  const handleSortReviewslist = [...filterReviews].sort((a, b) => {
    const aValue = a[sortBy] ?? "";
    const bValue = b[sortBy] ?? "";

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  return (
    <div className="container relative flex flex-col">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          reviews
        </header>
      </div>
      <div className="p-4">
        <div className="flex flex-col bg-gray-900 p-3 gap-3">
          <div className="flex items-center justify-between bg-gray-900 p-2">
            <h1 className="text-white p-3 text-lg font-semibold uppercase border-b-2">
              reviews
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchReviews}
              onChange={(e) => setSearchReviews(e.target.value)}
              className="p-2 mt-2 text-base font-semibold w-64 rounded-sm border-2 outline-orange-500 placeholder:capitalize"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="sortBy"
              className="text-lg capitalize text-white font-semibold"
            >
              sortBy:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortReviews}
              className="p-1 outline-none border-none rounded-sm text-base font-semibold capitalize"
            >
              <option value="comment">comments</option>
              <option value="ratings">ratings</option>
              <option value="customers.name">customer name</option>
              <option value="bookings.date">date</option>
              <option value="bookings.time">time</option>
              <option value="bookings.Quantity">Quantity</option>

              <option value="created_at">created at</option>
              <option value="updated_at">updated at</option>
            </select>
            <label
              htmlFor="direction"
              className="text-lg capitalize text-white font-semibold"
            >
              direction:
            </label>
            <select
              id="direction"
              className="p-1 outline-none border-none rounded-sm text-base font-semibold capitalize"
              value={sortDirection}
              onChange={handleAscReviews}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        </div>
        <table className="table-fixed w-full shadow-sm shadow-slate-400">
          <thead className="bg-gray-900 ">
            <th className="text-white border capitalize text-lg font-semibold p-3">
              id
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              comments
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              ratings
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              customer name
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              booking date
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              booking time
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              booking quantity
            </th>
            <th className="text-white  border  capitalize text-lg font-semibold p-3">
              created_at
            </th>
            <th className="text-white  border capitalize text-lg font-semibold p-3">
              updated_at
            </th>
          </thead>
          <tbody>
            {handleSortReviewslist.map((value) => (
              <tr key={value.reviews_id}>
                <td className="border text-base p-3 font-semibold">
                  {value.reviews_id}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {value.comment}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {value.ratings}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {value.customers.name}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {value.bookings.date}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {value.bookings.time}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {value.bookings.Quantity}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {formatDate(value.created_at)}
                </td>
                <td className="border text-base p-3 font-semibold">
                  {formatDate(value.updated_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
