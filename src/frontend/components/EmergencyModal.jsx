// components/EmergencyModal.js
import React, { useState } from 'react';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const EmergencyModal = ({ isOpen, onClose }) => {
  const [emergencyType, setEmergencyType] = useState("");

  const submitEmergencyRequest = () => {
    if (!emergencyType) {
      Toastify({
        text: "Please select the type of emergency.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#f87171",
      }).showToast();
      return;
    }

    const userName = "Nipthas";

    if (!navigator.geolocation) {
      Toastify({ text: "Geolocation not supported.", backgroundColor: "#f87171" }).showToast();
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const data = {
        name: userName,
        type: emergencyType,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };

      fetch('http://localhost:5000/emergency', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(response => {
        Toastify({
          text: "🚑 Emergency request sent!",
          duration: 4000,
          gravity: "top",
          position: "right",
          backgroundColor: "#10b981",
        }).showToast();

        onClose();
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('show-map', {
            detail: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        }, 1000);
      })
      .catch(() => {
        Toastify({
          text: "Failed to send emergency request.",
          duration: 4000,
          gravity: "top",
          position: "center",
          backgroundColor: "#ef4444",
        }).showToast();
      });
    }, () => {
      Toastify({
        text: "Could not fetch location.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#facc15",
      }).showToast();
    });
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Select Emergency Type</h3>
        <select
          value={emergencyType}
          onChange={(e) => setEmergencyType(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">-- Select Emergency --</option>
          <option value="Accident">Accident</option>
          <option value="Heart Attack">Heart Attack</option>
          <option value="Stroke">Stroke</option>
          <option value="Other">Other</option>
        </select>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={submitEmergencyRequest}>Send</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EmergencyModal;
