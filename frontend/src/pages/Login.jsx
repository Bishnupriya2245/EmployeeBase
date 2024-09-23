import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuccess = (msg) => {
    Swal.fire({
      title: "Success!",
      text: msg,
      icon: "success",
      confirmButtonText: "OK",
      position: "top-end",
      toast: true,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleError = (message) => {
    Swal.fire({
      title: "Validation Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      position: "top-end",
      toast: true,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const formatErrorMessage = (details) => {
    return details
      .map((detail) =>
        detail.message
          .replace(/f_userName/g, "username")
          .replace(/f_Pwd/g, "Password")
      )
      .join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginInfo;

    if (!username || !password) {
      handleError("Username and password are required");
      return;
    }

    try {
      const url = "http://localhost:8000/auth/login";
      const response = await axios.post(
        url,
        {
          f_userName: username,
          f_Pwd: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { message, token, name } = response.data;

        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error
        ? formatErrorMessage(error.response.data.error.details)
        : "An unexpected error occurred. Please try again.";

      handleError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-red-300 to-amber-200 space-y-6">
      <h2 className="font-serif text-3xl text-white">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border"
              placeholder="Enter Username"
              value={loginInfo.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border"
              placeholder="******"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
