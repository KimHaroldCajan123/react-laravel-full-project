import axios from "axios";
import React, { useEffect, useState } from "react";

const GuestCustomer = () => {
  const [guestlist, setGuestList] = useState([]);
  const [searchGuest, setSearchGuest] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [sortDirection, setSortDirection] = useState("asc");
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const displayAllGuest = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/guestlist");
        console.log(response);
        if (response.status === 200) {
          setGuestList(response.data.guestlist);
        }
      } catch (error) {
        console.log(error);
      }
    };
    displayAllGuest();
  }, []);

  const filterGuest = guestlist.filter(
    (value) =>
      (value.Name &&
        value.Name.toLowerCase().includes(searchGuest.toLocaleLowerCase())) ||
      (value.Email &&
        value.Email.toLowerCase().includes(searchGuest.toLocaleLowerCase())) ||
      (value.phone &&
        value.phone.toLowerCase().includes(searchGuest.toLocaleLowerCase()))
  );

  const handleAscGuest = (e) => {
    setSortDirection(e.target.value);
  };
  const handleSortGuest = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortGuestlist = [...filterGuest].sort((a, b) => {
    const aValue = a[sortBy] ?? "";
    const bValue = b[sortBy] ?? "";

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  return (
    <div className="container relative flex flex-col gap-4">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          guests
        </header>
      </div>
      <div className="p-4">
        <div className="flex flex-col bg-gray-900 p-3 gap-3">
          <div className="flex items-center justify-between bg-gray-900 p-2">
            <h1 className="text-white p-3 text-lg font-semibold uppercase border-b-2">
              guests
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchGuest}
              onChange={(e) => setSearchGuest(e.target.value)}
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
              onChange={handleSortGuest}
              className="p-1 outline-none border-none rounded-sm text-base font-semibold capitalize"
            >
              <option value="Name">name</option>
              <option value="Email">email</option>
              <option value="phone">phone</option>
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
              onChange={handleAscGuest}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        </div>
        <table className="table-fixed w-full shadow-sm shadow-slate-400">
          <thead className="bg-gray-900">
            <th className="p-3 border font-semibold capitalize text-white">
              id
            </th>
            <th className="p-3 border font-semibold capitalize text-white">
              guest name
            </th>
            <th className="p-3 border font-semibold capitalize text-white">
              Email
            </th>
            <th className="p-3 border font-semibold capitalize text-white">
              phone
            </th>
            <th className="p-3 border font-semibold capitalize text-white">
              created_at
            </th>
            <th className="p-3 border font-semibold capitalize text-white">
              updated_at
            </th>
          </thead>
          <tbody>
            {handleSortGuestlist.map((item) => (
              <tr key={item.guestcustomer_id}>
                <td className="p-3 border text-base font-semibold">
                  {item.guestcustomer_id}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {item.Name}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {item.Email}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {item.phone}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {formatDate(item.created_at)}
                </td>
                <td className="p-3 border text-base font-semibold">
                  {formatDate(item.updated_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestCustomer;
