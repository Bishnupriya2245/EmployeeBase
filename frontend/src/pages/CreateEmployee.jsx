import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateEmployee() {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "courses") {
      const newCourses = [...employeeInfo.courses];
      if (newCourses.includes(value)) {
        newCourses.splice(newCourses.indexOf(value), 1);
      } else {
        newCourses.push(value);
      }
      setEmployeeInfo((prev) => ({
        ...prev,
        courses: newCourses,
      }));
    } else if (name === "image") {
      setEmployeeInfo((prev) => ({
        ...prev,
        image: e.target.files[0], 
      }));
    } else {
      setEmployeeInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, designation, gender, courses, image } = employeeInfo;

    if (!name || !email || !mobile || !designation || !gender) {
      handleError("All fields are required except Courses");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("f_Name", name);
    formData.append("f_Email", email);
    formData.append("f_Mobile", mobile);
    formData.append("f_Designation", designation);
    formData.append("f_Gender", gender);
    formData.append("f_Course", courses.join(","));
    if (image) {
      formData.append("f_Image", image); 
    }

    try {
      const url = "http://localhost:8000/api/employees";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "form-data", 
          Authorization: token,
        },
      });

      if (response.status === 200) {
        handleSuccess("Employee created successfully!");
        setTimeout(() => {
          navigate("/employees");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response); 
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      handleError(errorMessage);
    }
  };


  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="fixed w-full top-0 z-10">
        <Navbar highlighted="Create Employee" />
      </div>

      <div className="flex flex-col items-center justify-center w-full pt-32">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Employee Details Form
        </h2>

        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" name="name" onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" placeholder="Enter Name" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" name="email" onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" placeholder="Enter Email" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mobile</label>
              <input type="tel" name="mobile" onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" placeholder="Enter Mobile Number" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Designation</label>
              <select name="designation" onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3">
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Gender</label>
              <div>
                <label className="inline-flex items-center mr-4">
                  <input type="radio" name="gender" value="Male" onChange={handleChange} className="form-radio" />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="gender" value="Female" onChange={handleChange} className="form-radio" />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Courses</label>
              <div>
                <label className="inline-flex items-center mr-4">
                  <input type="checkbox" name="courses" value="MCA" onChange={handleChange} className="form-checkbox" />
                  <span className="ml-2">MCA</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input type="checkbox" name="courses" value="BCA" onChange={handleChange} className="form-checkbox" />
                  <span className="ml-2">BCA</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="courses" value="Bsc" onChange={handleChange} className="form-checkbox" />
                  <span className="ml-2">Bsc</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image</label>
              <input type="file" name="image" onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" />
            </div>

            <div className="col-span-2 flex items-center justify-center">
              <button type="submit" className="bg-teal-600 text-white rounded px-4 py-2">Create Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
