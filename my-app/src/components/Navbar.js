import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" flex items-center justify-between md:container md:mx-auto px-5 py-4 shadow-lg">
      <h1 className=" text-3xl font-medium capitalize text-white">
        tattoo booking
      </h1>
      <div className="">
        <ul className=" flex gap-2 text-white capitalize font-medium">
          <li>
            <Link to="/login" className="bg-orange-600 py-3 px-6 rounded ">
              login
            </Link>
          </li>
          <li>
            <Link to="/register" className={" bg-orange-600 py-3 px-6 rounded"}>
              sign-in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
