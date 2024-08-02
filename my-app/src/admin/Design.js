import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaEdit } from "react-icons/fa";

const Design = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [tattooItem, setTattooItem] = useState([]);

  const [formError, setFormError] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTattoo, setSearchTattoo] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const clearTattooField = () => {
    setCategory_id("");
    setName("");
    setDescription("");
    setImage("");
    setPrice("");
    setFormError("");
  };

  useEffect(() => {
    HandleCategoryDisplay();
    fetchTattoo();
  }, []);

  const HandleCategoryDisplay = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/show-category"
      );
      setCategoryItem(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const tattooHandleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTattooSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("category_id", category_id);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/store-tattoo",
        formData,
        {
          header: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        swal("success", response.data.message, "success");
        clearTattooField();
        await fetchTattoo();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setFormError(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTattoo = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/view-tattoo");
      if (response) {
        setTattooItem(response.data.tattoo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTattoDelete = async (deleteTattooId) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-tattoo/${deleteTattooId}`
      );
      if (response.status === 200) {
        swal("Success", response.data.delete, "success");
        await fetchTattoo();
      }
    } catch (error) {
      swal("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  const filterTattoo = tattooItem.filter(
    (value) =>
      (value.name &&
        value.name.toLowerCase().includes(searchTattoo.toLocaleLowerCase())) ||
      (value.description &&
        value.description
          .toLowerCase()
          .includes(searchTattoo.toLocaleLowerCase())) ||
      (value.price &&
        value.price.toLowerCase().includes(searchTattoo.toLocaleLowerCase())) ||
      (value.category.categoryname &&
        value.category.categoryname
          .toLowerCase()
          .includes(searchTattoo.toLocaleLowerCase()))
  );
  const handleChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleChangeSortDirection = (e) => {
    setSortDirection(e.target.value);
  };

  const sortedTattooItem = [...filterTattoo].sort((a, b) => {
    const aValue =
      sortBy === "categoryname" ? a.category.categoryname : a[sortBy];
    const bValue =
      sortBy === "categoryname" ? b.category.categoryname : b[sortBy];

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  return (
    <div className="container h-screen flex flex-col overflow-y-scroll scroll-smooth custom-scrollbar gap-2 pb-20">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          artist
        </header>
      </div>
      <div className="flex flex-col gap-5">
        <div className="container">
          <form
            onSubmit={handleTattooSubmit}
            className="container gap-5 w-2/5 bg-gray-200 shadow-md shadow-gray-500 h-auto  flex flex-col items-center justify-between"
          >
            <div className="w-full bg-gray-900 p-5 shadow-md shadow-gray-500">
              <h1 className="text-xl font-semibold uppercase text-center text-white">
                create tattoo
              </h1>
            </div>
            <div className="field1 flex justify-between items-center w-full p-2">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 text-base font-semibold border-2 border-gray-500 rounded-sm w-60 outline-orange-500 placeholder:capitalize"
                />
                {formError.name && (
                  <span className="text-base font-semibold text-red-500">
                    {formError.name[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  placeholder="image"
                  name="image"
                  onChange={tattooHandleImage}
                  className=" p-2 text-base font-semibold w-72"
                />
                {formError.image && (
                  <span className="text-base font-semibold text-red-500">
                    {formError.image[0]}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <textarea
                cols="30"
                rows="10"
                placeholder="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border-2 border-gray-500 rounded-sm outline-orange-500 text-base font-semibold placeholder:capitalize"
              ></textarea>
              {formError.description && (
                <span className="text-base font-semibold text-red-500">
                  {formError.description[0]}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-2 border-gray-500 rounded-sm text-base font-semibold placeholder:capitalize p-2 w-60"
                />
                {formError.price && (
                  <span className="text-base font-semibold text-red-500">
                    {formError.price[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-52 gap-1 ">
                <label
                  htmlFor="category_id"
                  className="text-base font-semibold capitalize"
                >
                  category:
                </label>
                <select
                  name="category_id"
                  value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                  className="font-semibold text-base border-2 p-2 border-gray-500 rounded-sm"
                >
                  <option value="" disabled selected>
                    category
                  </option>
                  {categoryItem.map((items) => (
                    <option
                      key={items.category_id}
                      value={items.category_id}
                      className="text-base font-semibold capitalize"
                    >
                      {items.categoryname}
                    </option>
                  ))}
                </select>
                {formError.category_id && (
                  <span className="text-base font-semibold text-red-500">
                    {formError.category_id[0]}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-gray-900 mb-5 px-10 py-3 border-none text-lg text-white font-semibold capitalize transition-transform shadow-md shadow-slate-500 hover:bg-gray-500 active:translate-y-2"
            >
              submit
            </button>
          </form>
        </div>
        <div>
          <div className="bg-gray-900 flex flex-col gap-5 p-2">
            <div className="flex items-center justify-between">
              <h1 className="text-white p-5 text-lg font-semibold uppercase border-b-2">
                tattoo list
              </h1>
              <input
                type="text"
                placeholder="Search..."
                value={searchTattoo}
                onChange={(e) => setSearchTattoo(e.target.value)}
                className="p-2 mt-2 text-base font-semibold w-72 rounded-sm border-2 outline-orange-500 placeholder:capitalize"
              />
            </div>
            <div className="flex items-center space-x-4 ">
              <label
                htmlFor="sortBy"
                className="text-lg text-white font-semibold"
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleChangeSortBy}
                className="p-1 outline-none rounded-sm text-medium font-semibold"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="description">Description</option>
                <option value="categoryname">Category Name</option>
                <option value="created_at">Created At</option>
              </select>
              <label
                htmlFor="sortDirection"
                className="text-white text-lg font-semibold"
              >
                Direction:
              </label>
              <select
                id="sortDirection"
                value={sortDirection}
                className="p-1 outline-none rounded-sm text-medium font-semibold"
                onChange={handleChangeSortDirection}
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
          <table className="w-full shadow-lg shadow-gray-300">
            <thead className="bg-gray-900">
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                id
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                name
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                description
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                image
              </th>
              <th className="p-3 text-lg font-semibold  border  capitalize text-white">
                price
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                category name
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                created_at
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                updated_at
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                action
              </th>
            </thead>
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-3xl font-bold capitalize">loading...</h1>
              </div>
            ) : (
              <tbody>
                {sortedTattooItem.map((items) => (
                  <tr key={items.tattoo_id}>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      {items.tattoo_id}
                    </td>

                    <td className="p-3 border  text-base font-semibold capitalize">
                      {items.name}
                    </td>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      {items.description}
                    </td>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      <img
                        src={`http://127.0.0.1:8000/${items.image}`}
                        alt="Artist Profile"
                        className="w-14 h-14 object-cover m-auto"
                      />
                    </td>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      {items.price}
                    </td>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      {items.category.categoryname}
                    </td>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      {formatDate(items.created_at)}
                    </td>
                    <td className="p-3 border  text-base font-semibold capitalize">
                      {formatDate(items.updated_at)}
                    </td>
                    <td className="p-3 border  text-base font-semibold">
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/admin/edit-tattoo/${items.tattoo_id}`}>
                          <FaEdit className="text-orange-500 font-bold text-2xl cursor-pointer" />
                        </Link>
                        <button
                          className="p-1"
                          onClick={() => handleTattoDelete(items.tattoo_id)}
                        >
                          <FaTimes className="text-red-500 font-bold text-2xl cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Design;
