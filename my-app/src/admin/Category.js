import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";

const Category = () => {
  const [categoryname, setCategoryname] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [mapCategory, setMapCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("categoryname");
  const [sortDirection, setSortDirection] = useState("asc");
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-category",
        {
          categoryname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        swal("success", response.data.message, "success");
        setCategoryname("");
        await showCategoryList();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setFieldError(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showCategoryList();
  }, []);

  const showCategoryList = async () => {
    try {
      const getcategory = await axios.get(
        "http://127.0.0.1:8000/api/show-category"
      );
      setMapCategory(getcategory.data.category);
    } catch (error) {
      swal("error", "Category List Not Found", "error");
    }
  };

  const filterCategory = mapCategory.filter(
    (value) =>
      value.categoryname &&
      value.categoryname
        .toLowerCase()
        .includes(searchCategory.toLocaleLowerCase())
  );

  const handleSortCategory = (e) => {
    setSortBy(e.target.value);
  };
  const handleAscCategory = (e) => {
    setSortDirection(e.target.value);
  };

  const handleSortCategorylist = [...filterCategory].sort((a, b) => {
    const aValue = a[sortBy] ?? "";
    const bValue = b[sortBy] ?? "";

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleDelete = async (deleteId) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-category/${deleteId}`
      );
      if (response.status === 200) {
        swal("Success", response.data.delete, "success");
        await showCategoryList();
      }
    } catch (error) {
      swal("error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-full h-full flex flex-col gap-10 overflow-auto">
      <div className="header-container sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          Category
        </header>
      </div>
      <div className="container p-5 flex items-start justify-between">
        <form
          onSubmit={handleCategorySubmit}
          className="form-container w-72 h-72 bg-gray-200 rounded-sm shadow-lg shadow-slate-300 flex flex-col justify-between gap-5"
        >
          <div className="bg-gray-900 p-3 shadow-md shadow-slate-700">
            <h1 className="text-xl font-semibold uppercase text-white text-center">
              add Category
            </h1>
          </div>
          <div className="input-container p-2">
            <input
              type="text"
              name="categoryname"
              placeholder="category name"
              value={categoryname}
              onChange={(e) => setCategoryname(e.target.value)}
              className="p-3 text-base shadow-lg shadow-gray-300 font-semibold w-full border-2 border-gray-500 rounded-sm outline-orange-500 placeholder:capitalize"
            />
            {fieldError.categoryname && (
              <span className="text-red-600  text-medium font-semibold">
                {fieldError.categoryname[0]}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="py-3 m-auto border-none bg-gray-900 w-1/2 text-white text-lg font-semibold capitalize rounded-sm hover:bg-gray-700 transition-transform active:translate-y-2"
          >
            submit
          </button>
        </form>
        <div className="flex flex-col overflow-auto scrollbar custom-scrollbar shadow-lg ">
          <div className="flex flex-col bg-gray-900 p-3 gap-3">
            <div className="flex items-center justify-between bg-gray-900 p-2">
              <h1 className="text-white p-3 text-lg font-semibold uppercase border-b-2">
                reviews
              </h1>
              <input
                type="text"
                placeholder="Search..."
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
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
                onChange={handleSortCategory}
                className="p-1 outline-none border-none rounded-sm text-base font-semibold capitalize"
              >
                <option value="categoryname">category name</option>
                <option value="created_at">created at</option>
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
                onChange={handleAscCategory}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>
          </div>
          <table className="w-full shadow-lg shadow-gray-900">
            <thead className="bg-gray-900">
              <th className="p-3 text-lg font-semibold border capitalize text-white">
                id
              </th>
              <th className="p-3 text-lg font-semibold border capitalize text-white">
                category name
              </th>
              <th className="p-3 text-lg font-semibold border capitalize text-white">
                created_at
              </th>
              <th className="p-3 text-lg font-semibold border capitalize text-white">
                updated_at
              </th>
              <th className="p-3 text-lg font-semibold border  capitalize text-white">
                Action
              </th>
            </thead>
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-1xl font-bold capitalize text-center">
                  loading...
                </h1>
              </div>
            ) : (
              <tbody className="max-h-1/2 overflow-y-auto scroll-smooth custom-scrollbar">
                {handleSortCategorylist.map((category, id) => (
                  <tr key={id}>
                    <td className="p-3 border text-base font-semibold">
                      {category.category_id}
                    </td>
                    <td className="p-3 border text-base font-semibold capitalize">
                      {category.categoryname}
                    </td>
                    <td className="p-3 border text-base font-semibold">
                      {formatDate(category.created_at)}
                    </td>
                    <td className="p-3 border text-base font-semibold">
                      {formatDate(category.updated_at)}
                    </td>
                    <td className="p-3 border text-base font-semibold">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to={`/admin/edit-category/${category.category_id}`}
                        >
                          <FaEdit className="text-orange-500 font-bold text-2xl cursor-pointer" />
                        </Link>
                        <button
                          onClick={() => handleDelete(category.category_id)}
                          className=" p-1"
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

export default Category;
