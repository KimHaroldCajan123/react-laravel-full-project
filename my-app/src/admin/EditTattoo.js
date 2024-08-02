import React from "react";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditTattoo = () => {
  const [getCategoryList, setGetCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleTattooList();
  }, [id]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const HandleCategoryList = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/show-category"
        );
        if (response.status === 200) {
          setGetCategoryList(response.data.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    HandleCategoryList();
  }, []);

  const handleTattooList = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/edit-tattoo/${id}`
      );
      if (response.status === 200) {
        setName(response.data.tattoo.name);
        setDescription(response.data.tattoo.description);
        setImage(response.data.tattoo.image);
        setPrice(response.data.tattoo.price);
        setCategory_id(response.data.tattoo.category_id);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        swal("Error", error.response.data.error, "error");
      }
    }
  };

  const handleUpdateTattooSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category_id", category_id);

      const updateTattoo = await axios.post(
        `http://127.0.0.1:8000/api/update-tattoo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (updateTattoo.status === 200) {
        swal("success", updateTattoo.data.message, "success");
        navigate("/admin/design");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-gray-900 w-1/2">
        <form
          onSubmit={handleUpdateTattooSubmit}
          className="container gap-5 w-full bg-gray-200 shadow-md shadow-gray-500 h-auto  flex flex-col items-center justify-between"
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                className="p-2 text-base font-semibold border-2 border-gray-500 rounded-sm w-60 outline-orange-500 placeholder:capitalize"
              />
              {errors.name && (
                <span className="text-base font-semibold text-red-500">
                  {errors.name[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 ">
                <input
                  type="file"
                  placeholder="image"
                  name="image"
                  onChange={handleImage}
                  className=" p-2 text-base font-semibold w-52"
                />
                <img
                  src={`http://127.0.0.1:8000/${image}`}
                  alt="tattoo"
                  className=" w-14 h-11 border- border-gray-500 object-cover rounded-sm"
                />
                {errors.image && (
                  <span className="text-base font-semibold text-red-500">
                    {errors.image[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              cols="30"
              rows="10"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              className="p-2 border-2 border-gray-500 rounded-sm outline-orange-500 text-base font-semibold placeholder:capitalize"
            ></textarea>

            {errors.description && (
              <span className="text-base font-semibold text-red-500">
                {errors.description[0]}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between w-full p-2">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                className="border-2 border-gray-500 rounded-sm text-base font-semibold placeholder:capitalize p-2 w-60"
              />
              {errors.price && (
                <span className="text-base font-semibold text-red-500">
                  {errors.price[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col w-52 gap-1 ">
              <select
                name="category_id"
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
                className="font-semibold text-base border-2 p-2 border-gray-500 rounded-sm"
              >
                <option value="" disabled selected>
                  category
                </option>
                {getCategoryList.map((categoryItem) => (
                  <option
                    key={categoryItem.category_id}
                    value={categoryItem.category_id}
                    className="text-base font-semibold capitalize"
                  >
                    {categoryItem.categoryname}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <span className="text-base font-semibold text-red-500">
                  {errors.category_id[0]}
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
    </div>
  );
};

export default EditTattoo;
