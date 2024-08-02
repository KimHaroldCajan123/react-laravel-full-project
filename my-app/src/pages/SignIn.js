import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import myApi from "../api";
const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const clearUser = () => {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    };

    try {
      await myApi.get("sanctum/csrf-cookie");
      const response = await myApi.post("api/register", {
        name,
        email,
        password,
      });
      if (response.data.status === 200) {
        clearUser();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        swal("success", response.data.message, "success");

        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const getError = error.response.data.error;
        setErrors(getError);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="w-96 h-auto bg-white p-4 flex items-center justify-center gap-5 flex-col rounded shadow-lg"
        onSubmit={handleSignIn}
      >
        <div className=" w-full relative shadow-lg p-2 rounded">
          <h1 className=" text-4xl font-black capitalize text-center">
            sign in
          </h1>
        </div>
        <div className="w-full flex flex-wrap justify-between items-center p-2">
          <label htmlFor="name" className="text-base font-medium capitalize">
            name
          </label>
          <input
            className=" border-2 border-slate-600 w-60 h-10 rounded p-2 text-base font-medium outline-orange-600 placeholder:capitalize placeholder:text-gray-500"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter your name"
            autoComplete="name"
          />
          {errors.name && (
            <span className=" text-red-500 font-medium text-medium py-1 translate-x-20">
              {errors.name[0]}
            </span>
          )}
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
        <div className="w-full flex flex-wrap justify-between items-center p-2">
          <label
            htmlFor="confirm_password"
            className="text-base font-medium capitalize"
          >
            confirm
          </label>
          <input
            className=" border-2 border-slate-600 w-60 h-10 rounded p-2 text-base font-medium outline-orange-600 placeholder:capitalize placeholder:text-gray-500"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm your password"
            autoComplete="on"
          />
          {errors.confirmPassword && (
            <span className=" text-red-700 text-medium font-medium py-1 translate-x-20">
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <div className=" flex items-center justify-center flex-col gap-10 my-2">
          <button
            type="submit"
            className="text-lg font-bold capitalize bg-orange-600 text-white py-2 px-10 rounded transition-transform transform active:translate-y-1 shadow-md"
          >
            SignIn
          </button>
          <p className=" text-medium font-sm">
            Already have an account? click
            <Link
              className="px-2 text-base font-medium capitalize underline"
              to="/"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
