import React from "react";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditCategory = () => {
  const { id } = useParams();
  const [categoryname, setCategoryname] = useState("");
  const navigate = useNavigate();
  const [fieldError, setErrorField] = useState({});
  useEffect(() => {
    const handleGetCategory = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/edit-category/${id}`
        );
        if (response.status === 200) {
          setCategoryname(response.data.category.categoryname);
        }
      } catch (error) {
        if (error.response.status === 404) {
          swal("Error", error.response.data.error, "error");
        }
      }
    };
    handleGetCategory();
  }, [id]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-category/${id}`,
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
        swal("Success", response.data.update, "success");
        navigate("/admin/category");
      }
    } catch (error) {
      if (error.response.status ===400) {
        setErrorField(error.response.data.error)
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-full w-full">
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
    </div>
  );
};

export default EditCategory;
