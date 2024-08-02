import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const clearUser = () => {
      setEmail("");
      setPassword("");
    };

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email,
          password,
        },
        {
          headers: {    
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (response.status === 200) {
        clearUser();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        swal("Success", response.data.message, "success");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (error.response.status === 400) {
        const getError = error.response.data.errors;
        setErrors(getError);
      } else if (error.response.status === 401) {
        swal("Error", error.response.data.invalid, "error");
      }
    }
  };
  return (
    <div className="h-screen flex items-center justify-center gap-60">
      <div className="flex flex-col items-center rounded gap-2 w-1/2 shadow-lg text-white p-5">
        <h2 className=" text-4xl font-bold capitalize text-center">
          Discover Your Perfect Tattoo Experience with Tattoo Booking.
        </h2>
        <p className=" font-light">
          Explore a curated selection of top-tier tattoo artists, each ready to
          bring your vision to life.
        </p>
      </div>
      <form
        className="w-96 h-auto bg-white p-4 flex items-center justify-center gap-5 flex-col rounded shadow-lg relative"
        onSubmit={handleLogin}
      >
        <div className=" w-full relative shadow-lg p-2 rounded">
          <h1 className=" text-4xl font-black capitalize text-center">login</h1>
        </div>
        <div className="w-full flex flex-wrap justify-between items-center p-2">
          <label htmlFor="email" className="text-base font-medium capitalize">
            email
          </label>
          <input
            className=" border-2 border-slate-600 w-60 h-10 rounded p-2 text-base font-medium outline-orange-600 placeholder:capitalize placeholder:text-gray-500"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-red-500 py-1 text-medium font-medium translate-x-20">
              {errors.email[0]}
            </span>
          )}
        </div>
        <div className="w-full flex flex-wrap justify-between items-center p-2">
          <label
            htmlFor="password"
            className="text-base font-medium capitalize"
          >
            password
          </label>
          <input
            className=" border-2 border-slate-600 w-60 h-10 rounded p-2 text-base font-medium outline-orange-600 placeholder:capitalize placeholder:text-gray-500"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            autoComplete="password"
          />
          {errors.password && (
            <span className="text-red-500 py-1 text-medium font-medium translate-x-20">
              {errors.password[0]}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center w-full">
          <Link
            to="/reset-password"
            className="font-medium text-{14px} capitalize underline text-gray-700"
          >
            forgot password
          </Link>
        </div>
        <div className=" flex items-center justify-center flex-col gap-10 my-2">
          <button
            type="submit"
            className="text-lg font-bold capitalize bg-orange-600 text-white py-2 px-10 rounded transition-transform transform active:translate-y-1 shadow-md"
          >
            login
          </button>
          <div className="flex items-center justify-center">
            <p className=" text-medium font-sm">Dont have an account? click</p>
            <Link
              to="/register"
              className="px-2 text-base font-medium capitalize underline"
            >
              Sign-in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
