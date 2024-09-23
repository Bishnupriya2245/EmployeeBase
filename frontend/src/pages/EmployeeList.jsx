import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/employees/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );

      setFilteredEmployees((prevFiltered) =>
        prevFiltered.filter((employee) => employee._id !== id)
      );

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Employee deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data?.message || "An error occurred"
      );
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = employees.filter((employee) =>
      employee.f_Name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar highlighted="Employee List" />

      <div className="flex-grow p-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="text-lg">
              Total Employees: {filteredEmployees.length}
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-teal-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Mobile</th>
                  <th className="px-4 py-2 text-left">Designation</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-left">Courses</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <img
                        src={employee.f_Image}
                        alt={employee.f_Name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2">{employee.f_Name}</td>
                    <td className="px-4 py-2">{employee.f_Email}</td>
                    <td className="px-4 py-2">{employee.f_Mobile}</td>
                    <td className="px-4 py-2">{employee.f_Designation}</td>
                    <td className="px-4 py-2">{employee.f_Gender}</td>
                    <td className="px-4 py-2">{employee.f_Course}</td>
                    <td className="px-4 py-2">
                      {new Date(employee.f_Createdate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                        onClick={() =>
                          navigate(`/update-employee/${employee._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
