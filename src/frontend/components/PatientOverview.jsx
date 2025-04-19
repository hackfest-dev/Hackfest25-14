
import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientOverview = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Assuming doctor ID is hardcoded or fetched from login in future
    const doctorId = "doctor123"; 

    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/share-records/${doctorId}`);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching shared records:", error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Shared Patient Records</h2>
      {records.length === 0 ? (
        <p className="text-gray-400">No records shared yet.</p>
      ) : (
        <ul className="space-y-4">
          {records.map((record, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg shadow">
              <p><strong>Patient Name:</strong> {record.patientName}</p>
              <p><strong>Medical History:</strong> {record.medicalHistory}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientOverview;
