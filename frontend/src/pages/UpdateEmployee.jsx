import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

function UpdateEmployee() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null); 

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/employees/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Image } = response.data;
        setEmployeeInfo({
          name: f_Name,
          email: f_Email,
          mobile: f_Mobile,
          designation: f_Designation,
          gender: f_Gender,
          courses: f_Course.split(","),
          image: f_Image,
        });

        if (f_Image) {
          setImagePreview(f_Image);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

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
      const file = e.target.files[0];
      setEmployeeInfo((prev) => ({
        ...prev,
        image: file,
      }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null); 
      }
    } else {
      setEmployeeInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, designation, gender, courses, image } = employeeInfo;

    if (!name || !email || !mobile || !designation || !gender) {
      Swal.fire({
        title: "Validation Error!",
        text: "All fields are required except Courses",
        icon: "error",
        confirmButtonText: "OK",
      });
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
      const url = `http://localhost:8000/api/employees/${id}`; 
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Employee updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setTimeout(() => {
          navigate("/employees");
        }, 1000);
      }
    } catch (error) {
      console.error(error.response);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="fixed w-full top-0 z-10">
        <Navbar highlighted="Update Employee" />
      </div>

      <div className="flex flex-col items-center justify-center w-full pt-32">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Update Employee Details
        </h2>

        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" name="name" value={employeeInfo.name} onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" placeholder="Enter Name" required />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" name="email" value={employeeInfo.email} onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" placeholder="Enter Email" required />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mobile</label>
              <input type="tel" name="mobile" value={employeeInfo.mobile} onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" placeholder="Enter Mobile Number" required />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Designation</label>
              <select name="designation" value={employeeInfo.designation} onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" required>
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
                  <input type="radio" name="gender" value="Male" checked={employeeInfo.gender === "Male"} onChange={handleChange} className="form-radio" />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="gender" value="Female" checked={employeeInfo.gender === "Female"} onChange={handleChange} className="form-radio" />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Courses</label>
              <div>
                {["MCA", "BCA", "Bsc"].map((course) => (
                  <label key={course} className="inline-flex items-center mr-4">
                    <input type="checkbox" name="courses" value={course} checked={employeeInfo.courses.includes(course)} onChange={handleChange} className="form-checkbox" />
                    <span className="ml-2">{course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image</label>
              {imagePreview && <img src={imagePreview} alt="Employee" className="h-20 w-20 object-cover mb-2" />}
              <input type="file" name="image" onChange={handleChange} className="border border-gray-300 rounded w-full py-2 px-3" />
            </div>

            <div className="col-span-2 flex items-center justify-center">
              <button type="submit" className="bg-teal-600 text-white rounded px-4 py-2">Update Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
