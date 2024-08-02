import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
const Artists = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [hourly_rate, setHourly_rate] = useState("");
  const [availability, setAvailability] = useState("");
  const [biography, setBiography] = useState("");
  const [experience, setExperience] = useState("");
  const [contact_info, setContact_info] = useState("");
  const [type, setType] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const [error, setError] = useState({});
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const clearInput = () => {
    setType("");
    setAvailability("");
    setBiography("");
    setContact_info("");
    setName("");
    setHourly_rate("");
    setExperience("");
    setImage("");
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const createArtist = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("hourly_rate", hourly_rate);
      formData.append("availability", availability);
      formData.append("biography", biography);
      formData.append("experience", experience);
      formData.append("contact_info", contact_info);
      formData.append("type", type);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-artist",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (response.data.success === true) {
        swal("success", response.data.message, "success");
        clearInput();
        setError("");
        await getArtist();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  const getArtist = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-artist");
      setArtist(response.data.artist);
    } catch (error) {
      console.log(error);
    }
  };

  const filterArtist = artist.filter(
    (value) =>
      (value.name &&
        value.name.toLowerCase().includes(searchArtist.toLocaleLowerCase())) ||
      (value.hourly_rate &&
        value.hourly_rate
          .toLocaleLowerCase()
          .includes(searchArtist.toLocaleLowerCase()))
  );
  const handleSortArtist = (e) => {
    setSortBy(e.target.value);
  };

  const handleAscArtist = (e) => {
    setSortDirection(e.target.value);
  };

  const handleSortArtistlist = [...filterArtist].sort((a, b) => {
    const aValue = a[sortBy] ?? "";
    const bValue = b[sortBy] ?? "";

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  const handleDelete = async (artistID) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-artist/${artistID}`
      );
      if (response.status === 200) {
        swal("success", response.data.message, "success");
        await getArtist();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container flex flex-col h-screen w-full overflow-x-scroll overflow-y-scroll scroll-smooth custom-scrollbar pb-5">
      <div className="sticky top-0">
        <header className="text-white bg-orange-600 p-5 uppercase text-xl font-bold rounded-sm">
          add artist
        </header>
      </div>
      <div className="p-2 flex items-start justify-center gap-10">
        <form
          className="flex flex-col w-96 rounded-sm shadow-lg border-2 gap-4 p-2 bg-gray-200"
          onSubmit={createArtist}
        >
          <h1 className=" shadow-md shadow-slate-500 uppercase text-xl font-bold text-center border-b-4 bg-gray-900 text-white p-5">
            new artist
          </h1>
          <div className="input-field1 flex items-start justify-center flex-col gap-1">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              className="p-2 border-2 w-full border-gray-500 text-base font-semibold rounded-sm outline-orange-500 placeholder:capitalize"
            />
            {error.name && (
              <span className="text-red-500 text-base font-semibold">
                {error.name[0]}
              </span>
            )}
          </div>
          <div className="input-field2 flex items-start justify-center flex-col gap-1">
            <input
              type="file"
              name="image"
              onChange={handleImage}
              placeholder="image"
              className="p-2 text-base font-semibold capitalize"
            />
            {error.image && (
              <span className="text-red-500 text-meduim font-semibold">
                {error.image[0]}
              </span>
            )}
          </div>
          <div className="input-field3 flex items-start justify-center flex-col gap-1">
            <input
              type="text"
              name="hourly_rate"
              value={hourly_rate}
              onChange={(e) => setHourly_rate(e.target.value)}
              placeholder="hourly_rate"
              className="p-2 text-base font-semibold  border-2 border-gray-500 rounded-sm outline-orange-500 w-full placeholder:capitalize"
            />
            {error.hourly_rate && (
              <span className="text-red-500 text-base font-semibold">
                {error.hourly_rate[0]}
              </span>
            )}
          </div>
          <div className="input-field4 flex items-start justify-center flex-col gap-1">
            <input
              type="text"
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="availability"
              className="p-2 text-base font-semibold  border-2 border-gray-500 rounded-sm outline-orange-500 w-full placeholder:capitalize"
            />
            {error.availability && (
              <span className="text-red-500 text-meduim font-semibold">
                {error.availability[0]}
              </span>
            )}
          </div>
          <div className="input-field5 flex items-start justify-center flex-col gap-1">
            <textarea
              cols="50"
              rows="5"
              placeholder="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              className="p-2 text-base font-semibold  border-2 border-gray-500 rounded-sm outline-orange-500 w-full placeholder:capitalize"
            ></textarea>
            {error.biography && (
              <span className="text-red-500 text-base font-semibold">
                {error.biography[0]}
              </span>
            )}
          </div>
          <div className="input-field6 flex items-start justify-center flex-col gap-1">
            <input
              type="text"
              name="experence"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="experence"
              className="p-2 text-base font-semibold  border-2 border-gray-500 rounded-sm outline-orange-500 w-full placeholder:capitalize"
            />
            {error.experience && (
              <span className="text-red-500 text-meduim font-semibold">
                {error.experience[0]}
              </span>
            )}
          </div>
          <div className="input-field7 flex items-start justify-center flex-col gap-1">
            <input
              type="text"
              name="contact_info"
              value={contact_info}
              onChange={(e) => setContact_info(e.target.value)}
              placeholder="contact_info"
              className="p-2 text-base font-semibold  border-2 border-gray-500 rounded-sm outline-orange-500 w-full placeholder:capitalize"
            />
            {error.contact_info && (
              <span className="text-red-500 text-meduim font-semibold">
                {error.contact_info[0]}
              </span>
            )}
          </div>
          <div className="input-field8 flex items-start justify-center flex-col gap-1">
            <select
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="p-2 w-full border-2 border-gray-500 rounded-sm text-base font-semibold outline-orange-500"
            >
              <option disabled selected>
                Type
              </option>
              <option
                value="senior"
                className="p-5 text-base font-semibold capitalize"
              >
                senior
              </option>
              <option
                value="junior"
                className="p-5 text-base font-semibold capitalize"
              >
                junior
              </option>
            </select>
            {error.type && (
              <span className="text-red-500 text-meduim font-semibold">
                {error.type[0]}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="capitalize text-lg font-semibold bg-gray-900 h-12 text-white rounded hover:bg-gray-700"
          >
            submit
          </button>
        </form>
        <div className="w-full h-full overflow-hidden">
          <div className="bg-gray-900 p-5 border-b-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl uppercase font-bold text-white">
                Artist Record
              </h1>
              <input
                type="text"
                placeholder="Search..."
                value={searchArtist}
                onChange={(e) => setSearchArtist(e.target.value)}
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
                onChange={handleSortArtist}
                className="p-1 outline-none border-none rounded-sm text-base font-semibold capitalize"
              >
                <option value="name">name</option>
                <option value="hourly_rate">hourly rate</option>
                <option value="experience">experience</option>
                <option value="contact_info">contact info</option>
                <option value="type">type</option>
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
                onChange={handleAscArtist}
              >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
            </div>
          </div>
          <div className="overflow-auto scrollbar custom-scrollbar shadow-lg">
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <h1 className="text-3xl font-bold capitalize">loading...</h1>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      id
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Name
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Images
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Hourly Rate
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Availability
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Biography
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Experience
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Contact Info
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Type
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      created_at
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      updated_at
                    </th>
                    <th className="p-3 text-lg font-semibold capitalize text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {handleSortArtistlist.map((item, id) => (
                    <tr key={id}>
                      <td className="p-3 border text-base font-semibold">
                        {item.artists_id}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.name}
                      </td>
                      <td className="p-3 border">
                        <img
                          src={`http://127.0.0.1:8000/${item.image}`}
                          alt="Artist Profile"
                          className="w-14 h-14 object-cover m-auto"
                        />
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.hourly_rate}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.availability}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.biography}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.experience}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.contact_info}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {item.type}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        {formatDate(item.updated_at)}
                      </td>
                      <td className="p-3 border text-base font-semibold">
                        <div className="flex items-center justify-center gap-3">
                          <Link to={`/admin/view-artist/${item.artists_id}`}>
                            <FaEdit className="text-orange-500 font-bold text-2xl cursor-pointer" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.artists_id)}
                            className=" p-1"
                          >
                            <FaTimes className="text-red-500 font-bold text-2xl cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
