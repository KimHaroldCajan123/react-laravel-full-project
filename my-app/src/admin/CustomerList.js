import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const displayCustomers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/customerlist"
        );
        if (response.status === 200) {
          setCustomers(response.data.customerlist);
        }
      } catch (error) {
        console.log(error);
      }
    };
    displayCustomers();
  }, []);
  const filterCustomer = customers.filter(
    (value) =>
      (value.name &&
        value.name
          .toLowerCase()
          .includes(searchCustomer.toLocaleLowerCase())) ||
      (value.email &&
        value.email
          .toLowerCase()
          .includes(searchCustomer.toLocaleLowerCase())) ||
      (value.address &&
        value.address
          .toLowerCase()
          .includes(searchCustomer.toLocaleLowerCase())) ||
      (value.phone &&
        value.phone.toLowerCase().includes(searchCustomer.toLocaleLowerCase()))
  );

  const handleAscCustomer = (e) => {
    setSortDirection(e.target.value);
  };
  const handleSortCustomer = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortCustomerlist = [...filterCustomer].sort((a, b) => {
    const aValue = a[sortBy] ?? "";
    const bValue = b[sortBy] ?? "";

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  return (
    <div className="container relative overflow-auto flex flex-col gap-3 ">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          customer list
        </header>
      </div>
      <div className="p-4">
        <div className="flex flex-col bg-gray-900 p-3 gap-3">
          <div className="flex items-center justify-between bg-gray-900 p-2">
            <h1 className="text-white p-3 text-lg font-semibold uppercase border-b-2">
              customers
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
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
              onChange={handleSortCustomer}
              className="p-1 outline-none border-none rounded-sm text-base font-semibold capitalize"
            >
              <option value="name"> name</option>
              <option value="email">email</option>
              <option value="address">address</option>
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
              onChange={handleAscCustomer}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        </div>
        <table className="table-fixed w-full shadow-sm shadow-slate-400">
          <thead className="bg-gray-900">
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              id
            </th>
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              customer name
            </th>
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              email
            </th>
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              address
            </th>
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              phone
            </th>
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              created_at
            </th>
            <th className="p-3 border text-lg font-semibold capitalize text-white">
              updated_at
            </th>
          </thead>
          <tbody>
            {handleSortCustomerlist.map((value) => (
              <tr key={value.customer_id}>
                <td className="p-3 border  text-base font-semibold">
                  {value.customer_id}
                </td>
                <td className="p-3 border  text-base font-semibold">
                  {value.name}
                </td>
                <td className="p-3 border  text-base font-semibold">
                  {value.email}
                </td>

                <td className="p-3 border  text-base font-semibold">
                  {value.address}
                </td>
                <td className="p-3 border  text-base font-semibold">
                  {value.phone}
                </td>
                <td className="p-3 border  text-base font-semibold">
                  {formatDate(value.created_at)}
                </td>
                <td className="p-3 border  text-base font-semibold">
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

export default CustomerList;
