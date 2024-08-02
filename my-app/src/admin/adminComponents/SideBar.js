import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaPalette,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaTags,
  FaUsers,
} from "react-icons/fa";

const SideBar = () => {
  const [isArtistDropdownOpen, setIsArtistDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isDesignDropdownOpen, setIsDesignDropdownOpen] = useState(false);
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [isGuestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [isReviewsDropdownOpen, setReviewsDropdownOpen] = useState(false);

  const toggleArtistDropdown = () => {
    setIsArtistDropdownOpen(!isArtistDropdownOpen);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isDesignDropdownOpen) setIsDesignDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
    if (isBookingDropdownOpen) setIsBookingDropdownOpen(false);
    if (isGuestDropdownOpen) setGuestDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    if (isArtistDropdownOpen) setIsArtistDropdownOpen(false);
    if (isDesignDropdownOpen) setIsDesignDropdownOpen(false);
    if (isBookingDropdownOpen) setIsBookingDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
    if (isGuestDropdownOpen) setGuestDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
  };

  const toggleDesignDropdown = () => {
    setIsDesignDropdownOpen(!isDesignDropdownOpen);
    if (isArtistDropdownOpen) setIsArtistDropdownOpen(false);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isBookingDropdownOpen) setIsBookingDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
    if (isGuestDropdownOpen) setGuestDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
  };
  const toggleBookingDropdown = () => {
    setIsBookingDropdownOpen(!isBookingDropdownOpen);
    if (isArtistDropdownOpen) setIsArtistDropdownOpen(false);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isDesignDropdownOpen) setIsDesignDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
    if (isGuestDropdownOpen) setGuestDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
  };
  const toggleCustomerDropdown = () => {
    setCustomerDropdownOpen(!isCustomerDropdownOpen);
    if (isArtistDropdownOpen) setIsArtistDropdownOpen(false);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isDesignDropdownOpen) setIsDesignDropdownOpen(false);
    if (isBookingDropdownOpen) setIsBookingDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
    if (isGuestDropdownOpen) setGuestDropdownOpen(false);
  };

  const toggleGuestDropdown = () => {
    setGuestDropdownOpen(!isGuestDropdownOpen);
    if (isArtistDropdownOpen) setIsArtistDropdownOpen(false);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isDesignDropdownOpen) setIsDesignDropdownOpen(false);
    if (isBookingDropdownOpen) setIsBookingDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
  };
  const toggleReviewsDropdown = () => {
    setReviewsDropdownOpen(!isReviewsDropdownOpen);
    if (isArtistDropdownOpen) setIsArtistDropdownOpen(false);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isDesignDropdownOpen) setIsDesignDropdownOpen(false);
    if (isBookingDropdownOpen) setIsBookingDropdownOpen(false);
    if (isReviewsDropdownOpen) setReviewsDropdownOpen(false);
    if (isCustomerDropdownOpen) setCustomerDropdownOpen(false);
    if (isGuestDropdownOpen) setGuestDropdownOpen(false);
  };
  return (
    <div className="bg-orange-600 w-1/6 shadow-xl">
      <ul className="flex flex-col items-center justify-center gap-2 p-5">
        <NavLink
          to="dashboard"
          className="bg-orange-900 flex p-3 w-56 justify-center item-center gap-2 rounded hover:bg-gray-900"
          activeClassName="bg-gray-900"
          aria-current="page"
        >
          <FaHome className="text-white" size={20} />
          <span className="text-white capitalize text-20">Dashboard</span>
        </NavLink>

        {/* artist nav */}
        <div className="relative">
          <button
            onClick={toggleArtistDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaUsers className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              Artists
            </span>
            {isArtistDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isArtistDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/artist"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                Add Artist
              </NavLink>
            </div>
          )}
        </div>

        {/* category nav */}
        <div
          className="relative"
          style={{ marginTop: isArtistDropdownOpen ? "3rem" : "0" }}
        >
          <button
            onClick={toggleCategoryDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaTags className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              Category
            </span>
            {isCategoryDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isCategoryDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/category"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                Add Category
              </NavLink>
            </div>
          )}
        </div>
        {/* design nav */}

        <div
          className="relative"
          style={{ marginTop: isCategoryDropdownOpen ? "3rem" : "0" }}
        >
          <button
            onClick={toggleDesignDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaPalette className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              Design
            </span>
            {isDesignDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isDesignDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/design"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                add tattoo Design
              </NavLink>
            </div>
          )}
        </div>

        {/* booking nav */}
        <div
          className="relative"
          style={{ marginTop: isDesignDropdownOpen ? "3rem" : "0" }}
        >
          <button
            onClick={toggleBookingDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaCalendarAlt className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              booking
            </span>
            {isBookingDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isBookingDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/booking"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                booking list
              </NavLink>
            </div>
          )}
        </div>

        {/* customers nav */}
        <div
          className="relative"
          style={{ marginTop: isBookingDropdownOpen ? "3rem" : "0" }}
        >
          <button
            onClick={toggleCustomerDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaUsers className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              customers
            </span>
            {isCustomerDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isCustomerDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/customer-list"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                customer list
              </NavLink>
            </div>
          )}
        </div>

        {/* guest nav */}
        <div
          className="relative"
          style={{ marginTop: isCustomerDropdownOpen ? "3rem" : "0" }}
        >
          <button
            onClick={toggleGuestDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaUsers className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              guests
            </span>
            {isGuestDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isGuestDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/guest-list"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                guest list
              </NavLink>
            </div>
          )}
        </div>

        {/* reviews nav */}
        <div
          className="relative"
          style={{ marginTop: isGuestDropdownOpen ? "3rem" : "0" }}
        >
          <button
            onClick={toggleReviewsDropdown}
            className="bg-orange-900 flex p-3 w-56 justify-between item-center gap-2 rounded hover:bg-gray-900"
          >
            <FaStar className="text-white" size={20} />
            <span className="text-white capitalize text-base font-semibold">
              reviews
            </span>
            {isReviewsDropdownOpen ? (
              <FaChevronUp className="text-white" size={20} />
            ) : (
              <FaChevronDown className="text-white" size={20} />
            )}
          </button>
          {isReviewsDropdownOpen && (
            <div className=" flex flex-col absolute top-full left-0 z-1 w-56 bg-orange-900 rounded shadow-lg capitalize text-base font-semibold">
              <NavLink
                to="/admin/reviews"
                className="block py-3 px-4 text-white hover:bg-gray-900"
                activeClassName="bg-gray-900"
              >
                customers reviews
              </NavLink>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
