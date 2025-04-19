import React, { useState } from 'react';
import axios from 'axios';

export default function ShareWithDoctorPage({ patientId, patientName }) {
  const [doctorId, setDoctorId] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/share-record', {
        patientName,
        patientId,
        doctorId,
        medicalHistory
      });
      alert('Record shared successfully');
      setDoctorId('');
      setMedicalHistory('');
    } catch (err) {
      alert('Error sharing record');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">Share Record with Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Doctor ID</label>
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Doctor's ID"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Medical History</label>
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="Enter relevant medical history"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Share
        </button>
      </form>
    </div>
  );
}

