// components/LiveMap.js
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


const LiveMap = () => {
  const mapRef = useRef(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setCoords({ lat: e.detail.lat, lng: e.detail.lng });
    };

    window.addEventListener("show-map", handler);
    return () => window.removeEventListener("show-map", handler);
  }, []);

  useEffect(() => {
    if (!coords) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map("map").setView([coords.lat, coords.lng], 14);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const userMarker = L.marker([coords.lat, coords.lng])
      .addTo(map)
      .bindPopup("📍 You are here")
      .openPopup();

    const ambulances = [
      { id: 1, name: "Ambulance A", lat: coords.lat + 0.005, lng: coords.lng + 0.003 },
      { id: 2, name: "Ambulance B", lat: coords.lat - 0.002, lng: coords.lng + 0.004 },
      { id: 3, name: "Ambulance C", lat: coords.lat + 0.001, lng: coords.lng - 0.005 }
    ];

    function haversine(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    let nearest = ambulances[0];
    let minDist = haversine(coords.lat, coords.lng, nearest.lat, nearest.lng);

    ambulances.forEach(amb => {
      const dist = haversine(coords.lat, coords.lng, amb.lat, amb.lng);
      if (dist < minDist) {
        nearest = amb;
        minDist = dist;
      }
    });

    const normalIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2960/2960701.png",
      iconSize: [28, 28],
    });

    const alertIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2960/2960727.png",
      iconSize: [32, 32],
    });

    const markers = {};
    ambulances.forEach((amb) => {
      const icon = amb.id === nearest.id ? alertIcon : normalIcon;
      markers[amb.id] = L.marker([amb.lat, amb.lng], { icon })
        .addTo(map)
        .bindPopup(`${amb.name}${amb.id === nearest.id ? " 🚨 (On the Way)" : ""}`);
    });

    const group = new L.featureGroup([
      userMarker,
      ...ambulances.map(a => L.marker([a.lat, a.lng]))
    ]);
    map.fitBounds(group.getBounds().pad(0.3));

    Toastify({
      text: `${nearest.name} has been dispatched!`,
      duration: 4000,
      gravity: "top",
      position: "right",
      backgroundColor: "#14b8a6",
    }).showToast();

    const interval = setInterval(() => {
      ambulances.forEach((amb) => {
        amb.lat += (Math.random() - 0.5) * 0.001;
        amb.lng += (Math.random() - 0.5) * 0.001;
        markers[amb.id].setLatLng([amb.lat, amb.lng]);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [coords]);

  return coords ? (
    <div className="w-full h-96 max-w-4xl mt-6" id="map-container">
      <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">Live Ambulance Map</h3>
      <div id="map" className="w-full h-full rounded shadow border"></div>
    </div>
  ) : null;
};

export default LiveMap;
