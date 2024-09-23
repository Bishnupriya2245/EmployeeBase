import React from "react";

import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <Navbar highlighted="Dashboard" />

      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-700 mb-4">
            Welcome to Dashboard
          </h1>
          <p className="text-lg text-gray-700">Enjoy your stay!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
