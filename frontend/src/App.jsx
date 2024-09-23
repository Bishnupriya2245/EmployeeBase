import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import UpdateEmployee from "./pages/UpdateEmployee";



function App() {
  return(
    <div className="App">
    <Routes>
     <Route path='/' element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<CreateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
      
    </Routes>
    </div>
)
}

export default App;
