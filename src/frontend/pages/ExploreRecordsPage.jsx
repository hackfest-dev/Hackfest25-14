// src/ExploreRecordsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

const ExploreRecordsPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="min-h-screen bg-teal-400 text-white p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <span className="bg-gray-800 text-xs uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block">
          Featured
        </span>
        <h1 className="text-4xl font-bold mb-4">Centralized Medical Records</h1>
        <p className="text-gray-300 mb-6">
          Your complete medical history at your fingertips. Securely store and access all your health information in one place.
        </p>

        <ul className="mb-6 space-y-2">
          <li className="flex items-center space-x-2">
            <span>📄</span>
            <span>Medical history and diagnoses</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>📉</span>
            <span>Lab results and vital signs</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>🕑</span>
            <span>Appointment history</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>📞</span>
            <span>Doctor contact information</span>
          </li>
        </ul>

        <div className="space-x-4 mb-10">
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
            Access Your Records
          </button>

          {/* ✅ Share with Doctor navigates to /share-doctor */}
          <button
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate("/share-doctor")}
          >
            Share With Doctor
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex space-x-6 border-b border-gray-700 mb-4 pb-2">
            <button className="border-b-2 border-white pb-1">Records</button>
            <button className="text-gray-400 hover:text-white">History</button>
            <button className="text-gray-400 hover:text-white">Sharing</button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Recent Medical Records</h2>
          <ul className="space-y-4">
  <li className="bg-gray-800 p-4 rounded hover:bg-gray-700">
    <Link to="/annual-physical">
      <h3 className="font-bold text-lg text-white hover:underline">Annual Physical</h3>
      <p className="text-sm text-gray-400">Dr. Smith - 03/15/2025</p>
    </Link>
  </li>

  <li className="bg-gray-800 p-4 rounded hover:bg-gray-700">
    <Link to="/blood-test-results">
      <h3 className="font-bold text-lg text-white hover:underline">Blood Test Results</h3>
      <p className="text-sm text-gray-400">City Lab - 02/28/2025</p>
    </Link>
  </li>

  <li className="bg-gray-800 p-4 rounded hover:bg-gray-700">
    <Link to="/vaccination-record">
      <h3 className="font-bold text-lg text-white hover:underline">Vaccination Record</h3>
      <p className="text-sm text-gray-400">Health Clinic - 01/10/2025</p>
    </Link>
  </li>
</ul>

        </div>
      </div>
    </div>
  );
};

export default ExploreRecordsPage;
