import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar({ highlighted }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("loggedInUser");

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    await Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have been logged out successfully.",
    });

    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-teal-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-8">
          <div className="flex space-x-8">
            <button className="text-2xl" onClick={() => navigate("/home")}>
              Home
            </button>
            <button className="text-2xl" onClick={() => navigate("/employees")}>
              Employee List
            </button>
          </div>

          <div className="flex space-x-8 items-center">
            <span className="text-2xl">{username}</span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-yellow-300 py-2">
        <div className="container mx-auto">
          <h2 className="text-xl font-extrabold inline-block px-4">
            {highlighted}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
