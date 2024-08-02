import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import swal from "sweetalert";
import myApi from "../../api";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await myApi.get("api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post(
        "api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        swal("success", response.data.message, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-gray-600 shadow-xl">
      <nav class=" bg-orange-600 p-5 flex items-center justify-between">
        <div>
          <h1 class="text-white  text-xl capitalize font-semibold">booking</h1>
        </div>
        <div class="flex items-center justify-center gap-10 text-meduim capitalize">
          {user && (
            <span className="text-white text-lg font-semibold ">
              {user.name}
            </span>
          )}
          <FaSignOutAlt
            onClick={logout}
            className="text-white cursor-pointer hover:text-gray-900"
            size={20}
          />
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
