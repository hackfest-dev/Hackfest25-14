import React, { useState } from "react";
import axios from "axios";

const ShareWithDoctorPage = () => {
  const [doctorEmail, setDoctorEmail] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [userAadhaarId] = useState("1234567890"); // Replace with dynamic Aadhaar login later
  const [recordOptions] = useState([
    "Annual Physical",
    "Blood Test Results",
    "Vaccination Record"
  ]);

  const handleShareRecord = async () => {
    if (!doctorEmail || !selectedRecord) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/share", {
        patientId: userAadhaarId,
        doctorId: doctorEmail,
        records: [selectedRecord] // wrap in array as `records` expects a list
      });

      alert("Record shared successfully!");
      setDoctorEmail("");
      setSelectedRecord("");
    } catch (error) {
      console.error("Share error:", error.response?.data || error.message);
      alert("Failed to share the record");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Share with Doctor</h1>
        <p className="mb-6 text-gray-300">
          Select the records you wish to share and enter the doctor's contact details.
        </p>

        <div className="mb-4">
          <label className="block mb-1">Doctor's Email</label>
          <input
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            placeholder="doctor@example.com"
            value={doctorEmail}
            onChange={(e) => setDoctorEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Select Records to Share</label>
          <select
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            value={selectedRecord}
            onChange={(e) => setSelectedRecord(e.target.value)}
          >
            <option value="">-- Select Record --</option>
            {recordOptions.map((record, idx) => (
              <option key={idx} value={record}>{record}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleShareRecord}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Share Records
        </button>
      </div>
    </div>
  );
};

export default ShareWithDoctorPage;
