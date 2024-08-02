import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditArtist = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [hourly_rate, setHourly_rate] = useState("");
  const [availability, setAvailability] = useState("");
  const [biography, setBiography] = useState("");
  const [experience, setExperience] = useState("");
  const [contact_info, setContact_info] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtistData();
  }, [id]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const fetchArtistData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/edit-artist/${id}`
      );
      if (response.status == 200) {
        const ArtistData = response.data.artist;
        setName(ArtistData.name);
        setImage(ArtistData.image);
        setHourly_rate(ArtistData.hourly_rate);
        setAvailability(ArtistData.availability);
        setBiography(ArtistData.biography);
        setExperience(ArtistData.experience);
        setContact_info(ArtistData.contact_info);
        setType(ArtistData.type);
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status === 404) {
        swal("error", error.response.data.message, "error");
      } else {
        console.error(error);
      }
    }
  };

  const handleformchange = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("hourly_rate", hourly_rate);
      formData.append("availability", availability);
      formData.append("biography", biography);
      formData.append("experience", experience);
      formData.append("contact_info", contact_info);
      formData.append("type", type);

      if (image) {
        formData.append("image", image);
      }

      const submitData = await axios.post(
        `http://127.0.0.1:8000/api/update-artist/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (submitData.status === 200) {
        swal("success", submitData.data.message, "success");
        navigate("/admin/artist");
      } else if (submitData.status === 404) {
        swal("error", submitData.data.message, "error");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className=" relative container flex flex-col gap-5">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          update artist
        </header>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <h1 className=" text-3xl font-bold capitalize">loading...</h1>
        </div>
      ) : (
        <form
          onSubmit={handleformchange}
          className=" m-auto form-field pb-2 shadow-md rounded shadow-black bg-gray-200 w-2/4 flex items-center justify-center flex-col gap-5 border-2"
        >
          <div className="header flex  bg-gray-900 w-full items-start justify-between p-4 border-b-2 border-black">
            <h1 className="text-white text-xl uppercase font-bold">
              Update Artist
            </h1>
          </div>

          <div className="input-field1 flex items-center justify-between w-full px-5">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                className="p-2 border-2 border-gray-500 w-72 rounded-sm outline-orange-500text-base font-semibold placeholder:capitalize"
              />
              {errors.name && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.name[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center items-center ">
              <div className="flex gap-1">
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  placeholder="image"
                  className="text-base font-semibold translate-x-14"
                />
                <img
                  src={`http://127.0.0.1:8000/${image}`}
                  alt="tattoo"
                  className=" w-14 h-11 border- border-gray-500 object-cover rounded-sm"
                />
              </div>
              {errors.image && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.image[0]}
                </span>
              )}
            </div>
          </div>
          <div className="input-field3 w-full flex items-center justify-between px-5">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={availability}
                name="availability"
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="availability"
                className="p-2 border-2 border-gray-500 w-72 rounded-sm outline-orange-500 text-base font-semibold placeholder:capitalize"
              />
              {errors.availability && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.availability[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="hourly_rate"
                value={hourly_rate}
                onChange={(e) => setHourly_rate(e.target.value)}
                placeholder="hourly_rate"
                className="p-2 border-2 border-gray-500 w-72 rounded-sm outline-orange-500 text-base font-semibold placeholder:capitalize"
              />
              {errors.hourly_rate && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.hourly_rate[0]}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              cols="50"
              rows="10"
              placeholder="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              className="p-2 border-2 border-gray-500 rounded-sm outline-orange-500 text-base font-semibold placeholder:capitalize"
            ></textarea>
            {errors.biography && (
              <span className="text-red-500 text-meduim font-semibold">
                {errors.biography[0]}
              </span>
            )}
          </div>
          <div className="input-field2 w-full flex items-center justify-between px-5">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="experience"
                className="p-2 border-2 border-gray-500 rounded-sm w-52 outline-orange-500 text-base font-semibold placeholder:capitalize"
              />
              {errors.experience && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.experience[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="contact_info"
                value={contact_info}
                onChange={(e) => setContact_info(e.target.value)}
                placeholder="contact_info"
                className="p-2 border-2 border-gray-500 rounded-sm w-52 outline-orange-500 text-base font-semibold placeholder:capitalize"
              />
              {errors.contact_info && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.contact_info[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <select
                className="p-2 w-48 border-2 border-gray-500 rounded-sm text-base font-semibold"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option disabled selected>
                  Type
                </option>
                <option value="senior">senior</option>
                <option value="junior">junior</option>
              </select>
              {errors.type && (
                <span className="text-red-500 text-meduim font-semibold">
                  {errors.type[0]}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-gray-900 text-lg font-bold rounded-sm capitalize text-white"
          >
            save changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditArtist;
